import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Factory, Settings, TrendingUp, Users, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">
              Überblick über Ihre Produktionsplanung im Verpackungsdruck
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktive Aufträge</CardTitle>
                <Factory className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  In Planung
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maschinen</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Alle verfügbar
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">OTD Quote</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">
                  Noch keine Daten
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Benutzer</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  Rollen konfiguriert
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Features Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Implementierungsstatus
                </CardTitle>
                <CardDescription>
                  MVP Features nach Roadmap
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature 1: AuthN/AuthZ</span>
                  <Badge>Abgeschlossen</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature 2: Stammdaten</span>
                  <Badge variant="outline">Geplant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature 3: Setup-Gruppen</span>
                  <Badge variant="outline">Geplant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature 4: ERP-Import</span>
                  <Badge variant="outline">Geplant</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Status  
                </CardTitle>
                <CardDescription>
                  Aktuelle Systemzustände
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Datenbank</span>
                  <Badge>Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">RLS Policies</span>
                  <Badge>Aktiv</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Benutzerrollen</span>
                  <Badge>Konfiguriert</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Seed-Daten</span>
                  <Badge>Geladen</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Nächste Schritte</CardTitle>
              <CardDescription>
                Geplante Features für die nächsten Entwicklungsschritte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• <strong>Feature 2:</strong> Stammdaten Maschinen und Schichtkalender - Vollständige CRUD-Funktionalität</p>
                <p>• <strong>Feature 3:</strong> Setup-Gruppen und Rüstzeitmodell - Sequenzabhängige Rüstzeiten</p>
                <p>• <strong>Feature 4:</strong> ERP-Import Digitale Mappe - Validierter Auftragsimport</p>
                <p>• <strong>Feature 5:</strong> Gantt-Board Basis - Visuelles Planungswerkzeug</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
