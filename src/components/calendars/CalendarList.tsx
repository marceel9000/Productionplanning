import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, Trash2, Calendar as CalendarIcon, Clock, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CalendarListProps {
  onEdit: (calendar: any) => void;
}

export const CalendarList = ({ onEdit }: CalendarListProps) => {
  const [calendars, setCalendars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('calendars')
        .select('*')
        .order('id');
      
      if (error) throw error;
      setCalendars(data || []);
    } catch (err: any) {
      console.error('Error fetching calendars:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Kalender löschen möchten?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      const { error } = await supabase
        .from('calendars')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCalendars(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Erfolg",
        description: "Kalender wurde gelöscht",
      });
    } catch (err: any) {
      console.error('Error deleting calendar:', err);
      toast({
        title: "Fehler",
        description: err.message || "Fehler beim Löschen des Kalenders",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  const calculateWeeklyHours = (shifts: any[]) => {
    if (!Array.isArray(shifts)) return 0;
    
    return shifts.reduce((total, shift) => {
      if (!shift.start || !shift.end || !shift.days) return total;
      
      const [startHour, startMin] = shift.start.split(':').map(Number);
      const [endHour, endMin] = shift.end.split(':').map(Number);
      
      const startMinutes = startHour * 60 + startMin;
      let endMinutes = endHour * 60 + endMin;
      
      if (endMinutes <= startMinutes) {
        endMinutes += 24 * 60;
      }
      
      const duration = (endMinutes - startMinutes) / 60;
      return total + (duration * (shift.days?.length || 0));
    }, 0);
  };

  const formatShiftSummary = (shifts: any[]) => {
    if (!Array.isArray(shifts)) return "Keine Schichten";
    
    const shiftCount = shifts.length;
    const totalHours = calculateWeeklyHours(shifts);
    
    return `${shiftCount} Schicht${shiftCount !== 1 ? 'en' : ''} • ${totalHours}h/Woche`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Lade Kalender...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Fehler beim Laden der Kalender: {error}</AlertDescription>
      </Alert>
    );
  }

  if (calendars.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <CalendarIcon className="mx-auto h-12 w-12 mb-4" />
        <h3 className="text-lg font-medium mb-2">Keine Kalender konfiguriert</h3>
        <p>Legen Sie Ihren ersten Schichtkalender an, um zu beginnen.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {calendars.map((calendar) => (
        <Card key={calendar.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Kalender {calendar.id.slice(0, 8)}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(calendar)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(calendar.id)}
                  disabled={deleteLoading === calendar.id}
                >
                  {deleteLoading === calendar.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {formatShiftSummary(calendar.shifts)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Zeitzone:</span>
                <Badge variant="outline">{calendar.timezone}</Badge>
              </div>
              
              {Array.isArray(calendar.shifts) && calendar.shifts.map((shift, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{shift.name || `Schicht ${index + 1}`}</span>
                  <span className="text-muted-foreground">
                    {shift.start} - {shift.end}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};