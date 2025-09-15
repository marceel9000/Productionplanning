-- ENUM TYPES
CREATE TYPE machine_type AS ENUM ('gravure','offset','diecut','gluing');
CREATE TYPE operation_state AS ENUM ('planned','scheduled','released','in_progress','paused','completed','cancelled');
CREATE TYPE order_status AS ENUM ('planned','released','completed','cancelled');
CREATE TYPE plan_status AS ENUM ('draft','released','rolled_back','superseded');
CREATE TYPE material_ready AS ENUM ('ready','pending','critical');
CREATE TYPE event_type AS ENUM ('breakdown','rush','material_delay');
CREATE TYPE alert_category AS ENUM ('due','material','capacity','breakdown');
CREATE TYPE alert_severity AS ENUM ('info','warning','critical');

-- CORE TABLES
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE roles (
  name text PRIMARY KEY,
  permissions jsonb NOT NULL
);

CREATE TABLE calendars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shifts jsonb NOT NULL,
  timezone text NOT NULL
);

CREATE TABLE machines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  type machine_type NOT NULL,
  calendar_id uuid REFERENCES calendars(id) ON DELETE SET NULL,
  capacity_unit text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  maintenance_windows tstzrange[] NOT NULL DEFAULT '{}'
);

CREATE TABLE setup_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  attributes jsonb NOT NULL,
  change_matrix jsonb NOT NULL
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  erp_no text UNIQUE NOT NULL,
  customer text NOT NULL,
  due_date date NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  article text NOT NULL,
  process_chain text[] NOT NULL,
  priority integer NOT NULL DEFAULT 0,
  status order_status NOT NULL DEFAULT 'planned'
);

CREATE TABLE operations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  machine_id uuid REFERENCES machines(id) ON DELETE SET NULL,
  start timestamptz,
  "end" timestamptz,
  duration_min integer CHECK (duration_min > 0),
  setup_group_id uuid REFERENCES setup_groups(id) ON DELETE SET NULL,
  deps uuid[] NOT NULL DEFAULT '{}',
  state operation_state NOT NULL DEFAULT 'planned',
  ai_score numeric,
  ai_explain jsonb
);

CREATE TABLE materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article text NOT NULL,
  lot text,
  eta timestamptz,
  qty numeric NOT NULL CHECK (qty >= 0)
);

CREATE TABLE material_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id uuid NOT NULL REFERENCES operations(id) ON DELETE CASCADE,
  status material_ready NOT NULL,
  note text
);

CREATE TABLE scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  snapshot_at timestamptz NOT NULL DEFAULT now(),
  kpis jsonb NOT NULL
);

CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  version integer NOT NULL,
  status plan_status NOT NULL,
  comment text
);

CREATE TABLE plan_operations (
  plan_id uuid NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  operation_id uuid NOT NULL REFERENCES operations(id) ON DELETE CASCADE,
  seq_index integer NOT NULL,
  locked boolean NOT NULL DEFAULT false,
  PRIMARY KEY (plan_id, operation_id)
);

CREATE TABLE dispatches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id uuid NOT NULL REFERENCES machines(id) ON DELETE CASCADE,
  shift_date date NOT NULL,
  items jsonb NOT NULL
);

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type event_type NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category alert_category NOT NULL,
  severity alert_severity NOT NULL,
  entity_ref jsonb NOT NULL,
  acknowledged_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE kpi_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric NOT NULL,
  period daterange NOT NULL,
  breakdown jsonb
);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor uuid NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity text NOT NULL,
  before jsonb,
  after jsonb,
  ts timestamptz NOT NULL DEFAULT now()
);

-- INDEXES (performance and filtering)
CREATE INDEX idx_operations_machine_time ON operations (machine_id, start);
CREATE INDEX idx_operations_order ON operations (order_id);
CREATE INDEX idx_plan_ops_seq ON plan_operations (plan_id, seq_index);
CREATE INDEX idx_dispatches_machine_date ON dispatches (machine_id, shift_date);
CREATE INDEX idx_alerts_created ON alerts (created_at);
CREATE INDEX idx_events_created ON events (created_at);
CREATE INDEX idx_orders_due ON orders (due_date, status);
CREATE INDEX idx_material_eta ON materials (eta);

-- ENABLE RLS ON ALL TABLES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE setup_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispatches ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- SEED DATA - ROLES
INSERT INTO roles (name, permissions) VALUES
('admin', '{"manage_users": true, "manage_policies": true, "manage_stammdaten": true, "plan": true, "release": true}'),
('planner', '{"plan": true, "release": true, "view_kpis": true}'),
('av', '{"edit_order_params": true, "import_orders": true}'),
('shift_lead', '{"dispatch_read": true, "report_progress": true, "create_events": true}'),
('sales', '{"status_read": true, "view_alerts": true}'),
('plant_manager', '{"kpi_read": true, "view_all": true}');

-- SEED DATA - CALENDAR AND MACHINES  
INSERT INTO calendars (shifts, timezone) VALUES
('{"mon_fri":[{"start":"06:00","end":"14:00"},{"start":"14:00","end":"22:00"}],"sat":[{"start":"06:00","end":"14:00"}]}','Europe/Berlin');

INSERT INTO machines (name, type, calendar_id, capacity_unit)
SELECT 'Tiefdruck-1','gravure', id,'m2_per_hour' FROM calendars LIMIT 1;

INSERT INTO machines (name, type, calendar_id, capacity_unit)  
SELECT 'Offset-1','offset', id,'sheets_per_hour' FROM calendars LIMIT 1;

INSERT INTO machines (name, type, calendar_id, capacity_unit)
SELECT 'Stanze-1','diecut', id,'sheets_per_hour' FROM calendars LIMIT 1;

INSERT INTO machines (name, type, calendar_id, capacity_unit)
SELECT 'Klebe-1','gluing', id,'units_per_hour' FROM calendars LIMIT 1;

-- SEED DATA - SETUP GROUPS
INSERT INTO setup_groups (name, attributes, change_matrix) VALUES
('Farbe-CMYK', '{"colors":["C","M","Y","K"],"substrate":"standard"}', '{"same":5,"minor":15,"major":45}'),
('Farbe-Spot', '{"colors":["spot_1","spot_2"],"substrate":"standard"}', '{"same":8,"minor":20,"major":60}'),
('Substrat-Folie', '{"substrate":"foil","thickness":"50um"}', '{"same":10,"minor":25,"major":90}');

-- SEED DATA - SAMPLE ORDER AND OPERATIONS
INSERT INTO orders (erp_no, customer, due_date, quantity, article, process_chain, priority, status) VALUES
('ERP-1001','ACME GmbH','2025-10-15',100000,'ZigPack Premium', ARRAY['print','diecut','glue'], 5, 'planned'),
('ERP-1002','Beta Corp','2025-10-10',50000,'FlexLabel', ARRAY['print','diecut'], 8, 'planned');

-- Basic RLS Policies (will be expanded in next steps)
CREATE POLICY "Users can view own record" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Authenticated users can view roles" ON roles
FOR SELECT TO authenticated USING (true);

-- Allow all authenticated users to read master data for now (will refine by role later)
CREATE POLICY "Authenticated read machines" ON machines
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read setup_groups" ON setup_groups  
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read calendars" ON calendars
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read orders" ON orders
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read operations" ON operations
FOR SELECT TO authenticated USING (true);