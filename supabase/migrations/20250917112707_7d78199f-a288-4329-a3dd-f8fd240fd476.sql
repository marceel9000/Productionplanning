-- Fix function search path security warning
CREATE OR REPLACE FUNCTION create_demo_user(user_email TEXT, user_id UUID, user_role TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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