import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "./AuthForm";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, profile, hasAnyRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Lade Anwendung...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-destructive text-4xl">🚫</div>
          <h2 className="text-2xl font-bold">Zugriff verweigert</h2>
          <p className="text-muted-foreground">
            Sie haben nicht die erforderlichen Berechtigungen für diese Seite.
          </p>
          <p className="text-sm text-muted-foreground">
            Ihre aktuelle Rolle: <strong>{profile?.role}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Erforderliche Rollen: <strong>{requiredRoles.join(', ')}</strong>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};