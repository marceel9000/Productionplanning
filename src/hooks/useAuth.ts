import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    loading: true,
  });

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          // Fetch user profile when user is authenticated
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            setAuthState({
              user: session.user,
              session,
              profile,
              loading: false,
            });
          }, 0);
        } else {
          setAuthState({
            user: null,
            session: null,
            profile: null,
            loading: false,
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id).then((profile) => {
          setAuthState({
            user: session.user,
            session,
            profile,
            loading: false,
          });
        });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const hasRole = (role: string): boolean => {
    return authState.profile?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.includes(authState.profile?.role || '');
  };

  return {
    ...authState,
    signOut,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!authState.user && !!authState.profile,
  };
};