import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Calendar, AlertCircle } from "lucide-react";
import { MachineForm } from "@/components/machines/MachineForm";
import { MachineList } from "@/components/machines/MachineList";
import { useToast } from "@/hooks/use-toast";

const Machines = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMachine, setEditingMachine] = useState<any>(null);
  const { toast } = useToast();

  const handleCreate = () => {
    setEditingMachine(null);
    setShowForm(true);
  };

  const handleEdit = (machine: any) => {
    setEditingMachine(machine);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingMachine(null);
    toast({
      title: "Erfolg",
      description: editingMachine ? "Maschine aktualisiert" : "Maschine erstellt",
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingMachine(null);
  };

  return (
    <ProtectedRoute requiredRoles={["admin", "planner"]}>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Maschinen</h2>
              <p className="text-muted-foreground">
                Verwaltung der Produktionsmaschinen und deren Konfiguration
              </p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Neue Maschine
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktive Maschinen</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Verfügbar für Produktion
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wartung geplant</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  In den nächsten 7 Tagen
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auslastung</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  Durchschnitt letzte 30 Tage
                </p>
              </CardContent>
            </Card>
          </div>

          {showForm ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingMachine ? "Maschine bearbeiten" : "Neue Maschine anlegen"}
                </CardTitle>
                <CardDescription>
                  {editingMachine 
                    ? "Bearbeiten Sie die Maschinendaten und Konfiguration."
                    : "Legen Sie eine neue Produktionsmaschine an."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MachineForm
                  machine={editingMachine}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Maschinenliste</CardTitle>
                <CardDescription>
                  Übersicht aller konfigurierten Produktionsmaschinen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MachineList onEdit={handleEdit} />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Machines;