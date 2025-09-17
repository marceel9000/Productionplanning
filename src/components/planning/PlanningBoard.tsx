import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Clock, AlertTriangle, CheckCircle, Workflow } from "lucide-react";

interface Operation {
  id: string;
  order_id: string;
  machine_id: string;
  duration_min: number;
  start: string | null;
  end: string | null;
  state: string;
  ai_score: number | null;
  orders: {
    erp_no: string;
    article: string;
    customer: string;
    due_date: string;
    priority: number;
  };
  machines: {
    name: string;
    type: string;
  } | null;
}

interface PlanningBoardProps {
  selectedDate: Date;
}

export const PlanningBoard: React.FC<PlanningBoardProps> = ({ selectedDate }) => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOperations();
  }, [selectedDate]);

  const fetchOperations = async () => {
    try {
      const { data, error } = await supabase
        .from('operations')
        .select(`
          *,
          orders (erp_no, article, customer, due_date, priority),
          machines (name, type)
        `)
        .order('start', { ascending: true });

      if (error) throw error;
      setOperations(data || []);
    } catch (error) {
      console.error('Error fetching operations:', error);
      toast({
        title: "Fehler beim Laden der Operationen",
        description: "Die Planungsdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'planned': return 'bg-gray-400';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (state: string) => {
    switch (state) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">Lade Planungsdaten...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Gantt-Planungstafel</span>
          <Badge variant="secondary">{operations.length} Operationen</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
        {operations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Workflow className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Keine Operationen für den gewählten Zeitraum</p>
          </div>
        ) : (
          operations.map((operation) => (
            <div key={operation.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(operation.state)}`} />
                  <div>
                    <h4 className="font-medium">
                      {operation.orders.erp_no} - {operation.orders.article}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {operation.orders.customer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(operation.state)}
                  <Badge variant={operation.state === 'delayed' ? 'destructive' : 'secondary'}>
                    {operation.state}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Maschine:</span>
                  <p className="font-medium">
                    {operation.machines?.name || 'Nicht zugewiesen'}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dauer:</span>
                  <p className="font-medium">{operation.duration_min || '-'} min</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Start:</span>
                  <p className="font-medium">{formatDateTime(operation.start)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Ende:</span>
                  <p className="font-medium">{formatDateTime(operation.end)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    Priorität: {operation.orders.priority}
                  </Badge>
                  <Badge variant="outline">
                    Fällig: {new Date(operation.orders.due_date).toLocaleDateString('de-DE')}
                  </Badge>
                  {operation.ai_score && (
                    <Badge variant="secondary">
                      KI-Score: {operation.ai_score.toFixed(1)}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Bearbeiten
                  </Button>
                  <Button size="sm" variant="outline">
                    Verschieben
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};