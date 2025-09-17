import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface Machine {
  id: string;
  name: string;
  type: string;
  active: boolean;
  capacity_unit: string;
  calendar_id: string | null;
}

export const MachineBar: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const { data, error } = await supabase
        .from('machines')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setMachines(data || []);
    } catch (error) {
      console.error('Error fetching machines:', error);
      toast({
        title: "Fehler beim Laden der Maschinen",
        description: "Die Maschinendaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMachineTypeColor = (type: string) => {
    switch (type) {
      case 'print': return 'bg-blue-100 text-blue-800';
      case 'cut': return 'bg-green-100 text-green-800';
      case 'fold': return 'bg-purple-100 text-purple-800';
      case 'glue': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMachineStatusIcon = (active: boolean) => {
    if (active) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-xs text-muted-foreground">Lade...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Maschinen
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {machines.filter(m => m.active).length}/{machines.length} aktiv
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto">
        {machines.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Keine Maschinen</p>
          </div>
        ) : (
          machines.map((machine) => (
            <div key={machine.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm truncate">
                  {machine.name}
                </h4>
                {getMachineStatusIcon(machine.active)}
              </div>
              
              <div className="space-y-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getMachineTypeColor(machine.type)}`}
                >
                  {machine.type}
                </Badge>
                
                <p className="text-xs text-muted-foreground">
                  Kapazität: {machine.capacity_unit}
                </p>
                
                {machine.calendar_id && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Kalender zugewiesen
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">
                  Auslastung heute:
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 100)}%
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};