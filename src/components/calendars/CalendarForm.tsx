import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Plus, Trash2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Shift {
  name: string;
  start: string;
  end: string;
  days: string[];
}

interface CalendarFormProps {
  calendar?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CalendarForm = ({ calendar, onSuccess, onCancel }: CalendarFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [timezone, setTimezone] = useState(calendar?.timezone || "Europe/Berlin");
  const [shifts, setShifts] = useState<Shift[]>(calendar?.shifts || [
    { name: "Frühdienst", start: "06:00", end: "14:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] }
  ]);

  const dayOptions = [
    { value: "Mon", label: "Montag" },
    { value: "Tue", label: "Dienstag" },
    { value: "Wed", label: "Mittwoch" },
    { value: "Thu", label: "Donnerstag" },
    { value: "Fri", label: "Freitag" },
    { value: "Sat", label: "Samstag" },
    { value: "Sun", label: "Sonntag" }
  ];

  const addShift = () => {
    setShifts(prev => [...prev, { name: "", start: "08:00", end: "16:00", days: [] }]);
  };

  const removeShift = (index: number) => {
    setShifts(prev => prev.filter((_, i) => i !== index));
  };

  const updateShift = (index: number, field: keyof Shift, value: any) => {
    setShifts(prev => prev.map((shift, i) => 
      i === index ? { ...shift, [field]: value } : shift
    ));
  };

  const toggleDay = (shiftIndex: number, day: string) => {
    setShifts(prev => prev.map((shift, i) => {
      if (i !== shiftIndex) return shift;
      
      const days = shift.days.includes(day)
        ? shift.days.filter(d => d !== day)
        : [...shift.days, day];
      
      return { ...shift, days };
    }));
  };

  const calculateHours = (shift: Shift) => {
    if (!shift.start || !shift.end || shift.days.length === 0) return 0;
    
    const [startHour, startMin] = shift.start.split(':').map(Number);
    const [endHour, endMin] = shift.end.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    let endMinutes = endHour * 60 + endMin;
    
    // Handle overnight shifts
    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }
    
    const duration = (endMinutes - startMinutes) / 60;
    return duration * shift.days.length;
  };

  const getTotalWeeklyHours = () => {
    return shifts.reduce((total, shift) => total + calculateHours(shift), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validShifts = shifts.filter(shift => 
      shift.name.trim() && shift.start && shift.end && shift.days.length > 0
    );

    if (validShifts.length === 0) {
      setError("Mindestens eine gültige Schicht ist erforderlich");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const calendarData = {
        timezone,
        shifts: validShifts as any
      };

      let result;
      if (calendar) {
        result = await supabase
          .from('calendars')
          .update(calendarData)
          .eq('id', calendar.id);
      } else {
        result = await supabase
          .from('calendars')
          .insert([calendarData]);
      }

      if (result.error) throw result.error;
      onSuccess();
    } catch (err: any) {
      console.error('Error saving calendar:', err);
      setError(err.message || "Fehler beim Speichern des Kalenders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="timezone">Zeitzone</Label>
        <Select value={timezone} onValueChange={setTimezone} disabled={loading}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Europe/Berlin">Europa/Berlin (MEZ)</SelectItem>
            <SelectItem value="Europe/London">Europa/London (GMT)</SelectItem>
            <SelectItem value="America/New_York">Amerika/New York (EST)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Schichten</h3>
          <Button type="button" variant="outline" onClick={addShift} className="gap-2">
            <Plus className="h-4 w-4" />
            Schicht hinzufügen
          </Button>
        </div>

        {shifts.map((shift, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>Schicht {index + 1}</span>
                {shifts.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeShift(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {calculateHours(shift)}h pro Woche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Schichtname</Label>
                  <Input
                    value={shift.name}
                    onChange={(e) => updateShift(index, 'name', e.target.value)}
                    placeholder="z.B. Frühdienst"
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Start</Label>
                  <Input
                    type="time"
                    value={shift.start}
                    onChange={(e) => updateShift(index, 'start', e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Ende</Label>
                  <Input
                    type="time"
                    value={shift.end}
                    onChange={(e) => updateShift(index, 'end', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Arbeitstage</Label>
                <div className="flex flex-wrap gap-2">
                  {dayOptions.map(day => (
                    <Button
                      key={day.value}
                      type="button"
                      variant={shift.days.includes(day.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDay(index, day.value)}
                      disabled={loading}
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">Gesamte Wochenarbeitszeit:</span>
            <span className="text-2xl font-bold">{getTotalWeeklyHours()}h</span>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Abbrechen
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {calendar ? "Aktualisieren" : "Erstellen"}
        </Button>
      </div>
    </form>
  );
};