-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check user permissions
CREATE OR REPLACE FUNCTION public.user_has_permission(permission_name text)
RETURNS BOOLEAN AS $$
  SELECT (
    SELECT (permissions->permission_name)::boolean
    FROM public.roles r
    JOIN public.users u ON u.role = r.name
    WHERE u.id = auth.uid()
  ) IS TRUE;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS POLICIES FOR ALL TABLES

-- Materials policies
CREATE POLICY "All authenticated can read materials" ON materials
FOR SELECT TO authenticated USING (true);

CREATE POLICY "AV and admin can manage materials" ON materials
FOR ALL TO authenticated 
USING (public.get_current_user_role() IN ('admin', 'av', 'planner'));

-- Material Status policies  
CREATE POLICY "All authenticated can read material_status" ON material_status
FOR SELECT TO authenticated USING (true);

CREATE POLICY "AV and planner can manage material_status" ON material_status
FOR ALL TO authenticated
USING (public.get_current_user_role() IN ('admin', 'av', 'planner'));

-- Scenarios policies
CREATE POLICY "Planners can manage scenarios" ON scenarios
FOR ALL TO authenticated
USING (public.get_current_user_role() IN ('admin', 'planner'));

CREATE POLICY "All can read scenarios" ON scenarios  
FOR SELECT TO authenticated USING (true);

-- Plans policies
CREATE POLICY "Planners can manage plans" ON plans
FOR ALL TO authenticated
USING (public.get_current_user_role() IN ('admin', 'planner'));

CREATE POLICY "All can read plans" ON plans
FOR SELECT TO authenticated USING (true);

-- Plan Operations policies
CREATE POLICY "Planners can manage plan_operations" ON plan_operations
FOR ALL TO authenticated  
USING (public.get_current_user_role() IN ('admin', 'planner'));

CREATE POLICY "All can read plan_operations" ON plan_operations
FOR SELECT TO authenticated USING (true);

-- Dispatches policies
CREATE POLICY "Shift leads can read dispatches" ON dispatches
FOR SELECT TO authenticated 
USING (public.get_current_user_role() IN ('admin', 'planner', 'shift_lead'));

CREATE POLICY "Admin and planner can manage dispatches" ON dispatches
FOR ALL TO authenticated
USING (public.get_current_user_role() IN ('admin', 'planner'));

-- Events policies
CREATE POLICY "All authenticated can read events" ON events
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Shift leads can create events" ON events
FOR INSERT TO authenticated
WITH CHECK (public.get_current_user_role() IN ('admin', 'planner', 'shift_lead'));

CREATE POLICY "Admin can manage events" ON events
FOR ALL TO authenticated
USING (public.get_current_user_role() = 'admin');

-- Alerts policies
CREATE POLICY "All authenticated can read alerts" ON alerts
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Planners can manage alerts" ON alerts
FOR ALL TO authenticated
USING (public.get_current_user_role() IN ('admin', 'planner'));

CREATE POLICY "Users can acknowledge alerts" ON alerts
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (acknowledged_by = auth.uid());

-- KPI Metrics policies
CREATE POLICY "All authenticated can read kpis" ON kpi_metrics
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin and plant manager can manage kpis" ON kpi_metrics
FOR ALL TO authenticated  
USING (public.get_current_user_role() IN ('admin', 'plant_manager'));

-- Audit Logs policies (read-only for most users)
CREATE POLICY "Admin can read audit_logs" ON audit_logs
FOR SELECT TO authenticated
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "System can insert audit_logs" ON audit_logs
FOR INSERT TO authenticated
WITH CHECK (true);

-- Admin-only policies for master data management
CREATE POLICY "Admin can manage machines" ON machines
FOR ALL TO authenticated
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admin can manage setup_groups" ON setup_groups
FOR ALL TO authenticated  
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admin can manage calendars" ON calendars
FOR ALL TO authenticated
USING (public.get_current_user_role() = 'admin');

-- Order management policies
CREATE POLICY "AV can manage orders" ON orders
FOR ALL TO authenticated
USING (public.get_current_user_role() IN ('admin', 'av', 'planner'));

-- Operation management policies  
CREATE POLICY "Planner can manage operations" ON operations
FOR ALL TO authenticated
USING (public.get_current_user_role() IN ('admin', 'planner'));

-- Users table policies
CREATE POLICY "Admin can manage users" ON users
FOR ALL TO authenticated
USING (public.get_current_user_role() = 'admin');

-- Create trigger function for automatic user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'sales'); -- Default role
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();