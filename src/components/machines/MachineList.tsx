import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, Trash2, Settings, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MachineListProps {
  onEdit: (machine: any) => void;
}

export const MachineList = ({ onEdit }: MachineListProps) => {
  const [machines, setMachines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('machines')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setMachines(data || []);
    } catch (err: any) {
      console.error('Error fetching machines:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diese Maschine löschen möchten?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      const { error } = await supabase
        .from('machines')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMachines(prev => prev.filter(m => m.id !== id));
      toast({
        title: "Erfolg",
        description: "Maschine wurde gelöscht",
      });
    } catch (err: any) {
      console.error('Error deleting machine:', err);
      toast({
        title: "Fehler",
        description: err.message || "Fehler beim Löschen der Maschine",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  const getMachineTypeLabel = (type: string) => {
    const types = {
      digital: 'Digital-Druck',
      flexo: 'Flexodruck',
      offset: 'Offset-Druck',
      finishing: 'Weiterverarbeitung'
    };
    return types[type as keyof typeof types] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Lade Maschinen...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Fehler beim Laden der Maschinen: {error}</AlertDescription>
      </Alert>
    );
  }

  if (machines.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <Settings className="mx-auto h-12 w-12 mb-4" />
        <h3 className="text-lg font-medium mb-2">Keine Maschinen konfiguriert</h3>
        <p>Legen Sie Ihre erste Produktionsmaschine an, um zu beginnen.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead>Kapazität</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Kalender</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell className="font-medium">{machine.name}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getMachineTypeLabel(machine.type)}
                </Badge>
              </TableCell>
              <TableCell>{machine.capacity_unit}</TableCell>
              <TableCell>
                <Badge variant={machine.active ? "default" : "secondary"}>
                  {machine.active ? "Aktiv" : "Inaktiv"}
                </Badge>
              </TableCell>
              <TableCell>
                {machine.calendar_id ? (
                  <Badge variant="outline">Zugewiesen</Badge>
                ) : (
                  <span className="text-muted-foreground">Kein Kalender</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(machine)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(machine.id)}
                    disabled={deleteLoading === machine.id}
                  >
                    {deleteLoading === machine.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};