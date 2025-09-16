-- Create demo users with proper auth setup
-- Note: These users need to be created through Supabase Auth, not directly inserted

-- First, let's create a function to help with demo user setup
CREATE OR REPLACE FUNCTION create_demo_user(user_email TEXT, user_id UUID, user_role TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert into users table (the auth trigger will handle this normally)
  INSERT INTO public.users (id, email, role, created_at)
  VALUES (user_id, user_email, user_role, NOW())
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role = EXCLUDED.role;
END;
$$;

-- Create demo users (these will need to be registered through the UI first)
-- The UUIDs below are just placeholders - real users will get different UUIDs when they sign up

-- We'll create the users table entries directly for demo purposes
-- These correspond to the credentials shown in the UI: admin@demo.com and planner@demo.com with password demo123

-- Note: Users still need to register through the signup form first
-- This just sets up the role mappings for when they do register