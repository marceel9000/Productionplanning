import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export const Header = () => {
  const { profile, signOut, hasAnyRole } = useAuth();

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "destructive",
      planner: "default", 
      av: "secondary",
      shift_lead: "outline",
      sales: "outline",
      plant_manager: "default"
    };
    return colors[role] || "outline";
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Administrator",
      planner: "Produktionsplaner", 
      av: "Arbeitsvorbereitung",
      shift_lead: "Schichtleiter",
      sales: "Vertrieb",
      plant_manager: "Werksleitung"
    };
    return labels[role] || role;
  };

  return (
    <header className="border-b bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-foreground">
            Smart Production Control
          </h1>
          <Badge variant="outline" className="text-xs">
            MVP v1.0
          </Badge>
        </div>
        
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/" className="text-sm font-medium">
              Dashboard
            </Link>
          </Button>
          {hasAnyRole(['admin', 'planner']) && (
            <Button variant="ghost" asChild>
              <Link to="/machines" className="text-sm font-medium">
                Maschinen
              </Link>
            </Button>
          )}
          {hasAnyRole(['admin']) && (
            <Button variant="ghost" asChild>
              <Link to="/calendars" className="text-sm font-medium">
                Kalender
              </Link>
            </Button>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {profile && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {profile.email}
              </span>
              <Badge variant={getRoleColor(profile.role) as any}>
                {getRoleLabel(profile.role)}
              </Badge>
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mein Konto</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                Einstellungen
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={signOut}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Abmelden
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};