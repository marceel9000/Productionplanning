import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, Calendar as CalendarIcon, Users } from "lucide-react";
import { CalendarForm } from "@/components/calendars/CalendarForm";
import { CalendarList } from "@/components/calendars/CalendarList";
import { useToast } from "@/hooks/use-toast";

const Calendars = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCalendar, setEditingCalendar] = useState<any>(null);
  const { toast } = useToast();

  const handleCreate = () => {
    setEditingCalendar(null);
    setShowForm(true);
  };

  const handleEdit = (calendar: any) => {
    setEditingCalendar(calendar);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCalendar(null);
    toast({
      title: "Erfolg",
      description: editingCalendar ? "Schichtkalender aktualisiert" : "Schichtkalender erstellt",
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCalendar(null);
  };

  return (
    <ProtectedRoute requiredRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Schichtkalender</h2>
              <p className="text-muted-foreground">
                Konfiguration der Schichtmodelle und Arbeitszeiten
              </p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Neuer Kalender
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktive Kalender</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Verschiedene Schichtmodelle
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gesamte Wochenzeit</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">168h</div>
                <p className="text-xs text-muted-foreground">
                  Verfügbare Produktionszeit
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Zugewiesene Maschinen</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Maschinen mit Kalendern
                </p>
              </CardContent>
            </Card>
          </div>

          {showForm ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingCalendar ? "Kalender bearbeiten" : "Neuen Kalender anlegen"}
                </CardTitle>
                <CardDescription>
                  {editingCalendar 
                    ? "Bearbeiten Sie die Schichtzeiten und Konfiguration."
                    : "Legen Sie einen neuen Schichtkalender an."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarForm
                  calendar={editingCalendar}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Kalenderliste</CardTitle>
                <CardDescription>
                  Übersicht aller konfigurierten Schichtkalender
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarList onEdit={handleEdit} />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Calendars;