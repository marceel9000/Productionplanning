import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleAuth = async (isLogin: boolean) => {
    if (!email || !password) {
      setError("Bitte Email und Passwort eingeben");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
      }

      if (result.error) {
        throw result.error;
      }

      if (isLogin && result.data.user) {
        toast({
          title: "Erfolgreich angemeldet",
          description: "Willkommen im Smart Production Control Center",
        });
        onSuccess?.();
      } else if (!isLogin && result.data.user) {
        toast({
          title: "Registrierung erfolgreich",
          description: "Sie können sich nun anmelden",
        });
        setEmail("");
        setPassword("");
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      let errorMessage = "Ein Fehler ist aufgetreten";
      
      if (err.message?.includes("Invalid login credentials")) {
        errorMessage = "Ungültige Anmeldedaten";
      } else if (err.message?.includes("User already registered")) {
        errorMessage = "Email bereits registriert";
      } else if (err.message?.includes("Password should be")) {
        errorMessage = "Passwort muss mindestens 6 Zeichen haben";
      } else if (err.message?.includes("Invalid email")) {
        errorMessage = "Ungültige Email-Adresse";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Smart Production Control</CardTitle>
          <CardDescription>
            Produktionsplanung für Verpackungsdruck
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Anmelden</TabsTrigger>
              <TabsTrigger value="signup">Registrieren</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Passwort</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth(true)}
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button
                onClick={() => handleAuth(true)}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Anmelden
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Passwort</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 6 Zeichen"
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth(false)}
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button
                onClick={() => handleAuth(false)}
                disabled={loading}
                className="w-full"
                variant="secondary"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Registrieren
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo-Zugänge:</p>
            <p>admin@demo.com / planner@demo.com</p>
            <p>Passwort: demo123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};