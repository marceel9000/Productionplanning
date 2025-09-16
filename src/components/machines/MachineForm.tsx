import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MachineFormProps {
  machine?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const MachineForm = ({ machine, onSuccess, onCancel }: MachineFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendars, setCalendars] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: machine?.name || "",
    type: machine?.type || "digital",
    capacity_unit: machine?.capacity_unit || "m²/h",
    active: machine?.active ?? true,
    calendar_id: machine?.calendar_id || "",
  });

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const { data, error } = await supabase
        .from('calendars')
        .select('id, shifts')
        .order('id');
      
      if (error) throw error;
      setCalendars(data || []);
    } catch (err) {
      console.error('Error fetching calendars:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError("Maschinenname ist erforderlich");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const machineData = {
        ...formData,
        calendar_id: formData.calendar_id || null,
        maintenance_windows: machine?.maintenance_windows || []
      };

      let result;
      if (machine) {
        result = await supabase
          .from('machines')
          .update(machineData)
          .eq('id', machine.id);
      } else {
        result = await supabase
          .from('machines')
          .insert([machineData]);
      }

      if (result.error) throw result.error;
      onSuccess();
    } catch (err: any) {
      console.error('Error saving machine:', err);
      setError(err.message || "Fehler beim Speichern der Maschine");
    } finally {
      setLoading(false);
    }
  };

  const getCalendarName = (calendar: any) => {
    if (!calendar.shifts || !Array.isArray(calendar.shifts)) return `Kalender ${calendar.id.slice(0, 8)}`;
    
    const shiftCount = calendar.shifts.length;
    const dayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    
    return `${shiftCount}-Schicht Kalender`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Maschinenname *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="z.B. Digital-Druckmaschine 01"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Maschinentyp</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Maschinentyp auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="digital">Digital-Druckmaschine</SelectItem>
              <SelectItem value="flexo">Flexodruck</SelectItem>
              <SelectItem value="offset">Offset-Druckmaschine</SelectItem>
              <SelectItem value="finishing">Weiterverarbeitung</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity_unit">Kapazitätseinheit</Label>
          <Select
            value={formData.capacity_unit}
            onValueChange={(value) => setFormData(prev => ({ ...prev, capacity_unit: value }))}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Einheit auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m²/h">m²/h</SelectItem>
              <SelectItem value="lfm/h">lfm/h</SelectItem>
              <SelectItem value="stk/h">Stück/h</SelectItem>
              <SelectItem value="kg/h">kg/h</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendar">Schichtkalender</Label>
          <Select
            value={formData.calendar_id}
            onValueChange={(value) => setFormData(prev => ({ ...prev, calendar_id: value }))}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Kalender auswählen (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Kein Kalender</SelectItem>
              {calendars.map(calendar => (
                <SelectItem key={calendar.id} value={calendar.id}>
                  {getCalendarName(calendar)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
          disabled={loading}
        />
        <Label htmlFor="active">Maschine ist aktiv</Label>
      </div>

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
          {machine ? "Aktualisieren" : "Erstellen"}
        </Button>
      </div>
    </form>
  );
};