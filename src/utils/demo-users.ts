// Demo user creation utility - run this once to create demo accounts
import { supabase } from "@/integrations/supabase/client";

export const createDemoUsers = async () => {
  const demoUsers = [
    { email: 'admin@demo.com', password: 'demo123', role: 'admin' },
    { email: 'planner@demo.com', password: 'demo123', role: 'planner' },
    { email: 'av@demo.com', password: 'demo123', role: 'av' },
    { email: 'shift@demo.com', password: 'demo123', role: 'shift_lead' },
    { email: 'sales@demo.com', password: 'demo123', role: 'sales' },
    { email: 'manager@demo.com', password: 'demo123', role: 'plant_manager' },
  ];

  console.log('Creating demo users...');
  
  for (const user of demoUsers) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error(`Error creating user ${user.email}:`, error.message);
      } else {
        console.log(`Created user: ${user.email}`);
        
        // Update the user role in the database
        if (data.user) {
          const { error: updateError } = await supabase
            .from('users')
            .update({ role: user.role })
            .eq('id', data.user.id);
            
          if (updateError) {
            console.error(`Error updating role for ${user.email}:`, updateError);
          } else {
            console.log(`Updated role for ${user.email} to ${user.role}`);
          }
        }
      }
    } catch (err) {
      console.error(`Error processing user ${user.email}:`, err);
    }
  }
  
  console.log('Demo user creation completed');
};

// Run this function once to create demo users
// createDemoUsers();