<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# You are a senior database architect tasked with designing a comprehensive and accurate database schema based on the provided Software Requirements Specification (SRS). Your schema should precisely represent all entities, attributes, and relationships outlined in the SRS and ensure direct traceability.

<srs_document>
Pasted text to be inserted here
</srs_document>

## Database Schema

### 1. Data Design \& Schema

#### 1.1 Entities

For each entity, specify:

- Entity Name
- Attributes: clearly defined data types, constraints (primary keys, foreign keys, unique constraints, not-null)
- Relationships: clearly specify entity relations (one-to-one, one-to-many, many-to-many)


#### 1.2 SQL Schema (Migration Script)

Provide valid migration SQL commands (compatible with PostgreSQL) to create tables, define constraints, and establish relationships clearly.
Example format:

```sql
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'RegisteredUser', 'Guest')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


### 2. Minimal Test Data

Insert a small representative dataset into each table to verify schema integrity:

```sql
INSERT INTO users (email, password_hash, role) VALUES
('admin@example.com', 'hashed_password', 'Admin'),
('user@example.com', 'hashed_password', 'RegisteredUser'),
('guest@example.com', 'hashed_password', 'Guest');
```


### 3. Schema Review

- Explicitly reference SRS requirements (e.g., SRS-001, SRS-002) to ensure complete traceability.
- Confirm all entities, relationships, and attributes are consistently represented.
- Verify schema completeness and accuracy against the SRS.


### 4. Formatting Guidelines

- Maintain consistent numbering and clear Markdown formatting.
- Avoid bold markdown formatting (**).
- Ensure the schema is clearly structured and easy to interpret.

Below is a complete, production‑ready relational schema for the MVP with explicit entity definitions, constraints, relationships, migration SQL, seed data, and traceability to the SRS and PRD inputs.[^1]

### 1. Data Design \& Schema

#### 1.1 Entities

- users
    - Attributes: id uuid pk default gen_random_uuid(), email text unique not null, role text not null, created_at timestamptz default now() not null.[^2][^1]
    - Relationships: none; application-level roles map to permissions and RLS policies.[^1]
    - Traceability: FR‑033/FR‑034 (AuthN/AuthZ), FR‑035 (Audit).[^1]
- roles
    - Attributes: name text pk, permissions jsonb not null.[^1]
    - Relationships: optional reference from users.role (denormalized), or used by policy logic.[^1]
    - Traceability: FR‑034.[^1]
- calendars
    - Attributes: id uuid pk default gen_random_uuid(), shifts jsonb not null, timezone text not null.[^2][^1]
    - Relationships: one‑to‑many with machines via calendar_id.[^1]
    - Traceability: FR‑001/FR‑006/FR‑009.[^1]
- machines
    - Attributes: id uuid pk default gen_random_uuid(), name text unique not null, type machine_type not null, calendar_id uuid fk, capacity_unit text not null, active boolean default true not null, maintenance_windows tstzrange[] default '{}'.[^3][^1]
    - Relationships: many operations; belongs to calendars.[^1]
    - Traceability: FR‑001/FR‑043/FR‑025.[^1]
- setup_groups
    - Attributes: id uuid pk default gen_random_uuid(), name text not null, attributes jsonb not null, change_matrix jsonb not null.[^2][^1]
    - Relationships: many operations reference setup_groups.[^1]
    - Traceability: FR‑002/FR‑011/FR‑034.[^1]
- orders
    - Attributes: id uuid pk default gen_random_uuid(), erp_no text unique not null, customer text not null, due_date date not null, quantity integer not null check (quantity > 0), article text not null, process_chain text[] not null, priority integer default 0 not null, status order_status not null default 'planned'.[^3][^1]
    - Relationships: one‑to‑many operations; used by scenarios, KPIs.[^1]
    - Traceability: FR‑003/FR‑020/FR‑018/FR‑019.[^1]
- operations
    - Attributes: id uuid pk default gen_random_uuid(), order_id uuid fk not null, machine_id uuid fk, start timestamptz, "end" timestamptz, duration_min integer check (duration_min > 0), setup_group_id uuid fk, deps uuid[] default '{}', state operation_state not null default 'planned', ai_score numeric, ai_explain jsonb.[^3][^1]
    - Relationships: many‑to‑one order; many‑to‑one machine; optional setup group; may be versioned via plan_operations.[^1]
    - Traceability: FR‑005/FR‑006/FR‑007/FR‑008/FR‑010/FR‑011/FR‑012/FR‑016/FR‑023.[^1]
- materials
    - Attributes: id uuid pk default gen_random_uuid(), article text not null, lot text, eta timestamptz, qty numeric not null check (qty >= 0).[^2][^1]
    - Relationships: linked to operations via material_status.[^1]
    - Traceability: FR‑009/FR‑033.[^1]
- material_status
    - Attributes: id uuid pk default gen_random_uuid(), operation_id uuid fk not null, status material_ready not null, note text.[^3][^1]
    - Relationships: many‑to‑one operations.[^1]
    - Traceability: FR‑009/FR‑033.[^1]
- scenarios
    - Attributes: id uuid pk default gen_random_uuid(), name text not null, snapshot_at timestamptz not null default now(), kpis jsonb not null.[^2][^1]
    - Relationships: can snapshot operations/plans externally; compared before release.[^1]
    - Traceability: FR‑014/FR‑035/UC‑003/UC‑005.[^1]
- plans
    - Attributes: id uuid pk default gen_random_uuid(), name text not null, version integer not null, status plan_status not null, comment text.[^3][^1]
    - Relationships: one‑to‑many plan_operations; links to dispatches.[^1]
    - Traceability: FR‑015/FR‑047/FR‑032.[^1]
- plan_operations
    - Attributes: plan_id uuid fk not null, operation_id uuid fk not null, seq_index integer not null, locked boolean default false not null, primary key (plan_id, operation_id).[^1]
    - Relationships: join between plans and operations with sequence and locking.[^1]
    - Traceability: FR‑015/FR‑032.[^1]
- dispatches
    - Attributes: id uuid pk default gen_random_uuid(), machine_id uuid fk not null, shift_date date not null, items jsonb not null.[^2][^1]
    - Relationships: many‑to‑one machines.[^1]
    - Traceability: FR‑015/UC‑006.[^1]
- events
    - Attributes: id uuid pk default gen_random_uuid(), type event_type not null, payload jsonb not null, created_at timestamptz default now() not null.[^3][^1]
    - Relationships: can trigger re‑optimization flows.[^1]
    - Traceability: FR‑012/FR‑025/UC‑005.[^1]
- alerts
    - Attributes: id uuid pk default gen_random_uuid(), category alert_category not null, severity alert_severity not null, entity_ref jsonb not null, acknowledged_by uuid, created_at timestamptz default now() not null.[^3][^1]
    - Relationships: optional fk acknowledged_by → users.id.[^1]
    - Traceability: FR‑017/FR‑020/FR‑019.[^1]
- kpi_metrics
    - Attributes: id uuid pk default gen_random_uuid(), name text not null, value numeric not null, period daterange not null, breakdown jsonb.[^2][^1]
    - Relationships: none direct; aggregated views can join orders/operations.[^1]
    - Traceability: FR‑018/FR‑042.[^1]
- audit_logs
    - Attributes: id uuid pk default gen_random_uuid(), actor uuid not null, action text not null, entity text not null, before jsonb, after jsonb, ts timestamptz default now() not null.[^2][^1]
    - Relationships: actor → users.id (logical), recorded for compliance.[^1]
    - Traceability: FR‑021/FR‑035/FR‑047/FR‑032.[^1]
- Enumerated types
    - machine_type enum: 'gravure','offset','diecut','gluing'.[^3][^1]
    - operation_state enum: 'planned','scheduled','released','in_progress','paused','completed','cancelled'.[^3][^1]
    - order_status enum: 'planned','released','completed','cancelled'.[^3][^1]
    - plan_status enum: 'draft','released','rolled_back','superseded'.[^3][^1]
    - material_ready enum: 'ready','pending','critical'.[^3][^1]
    - event_type enum: 'breakdown','rush','material_delay'.[^3][^1]
    - alert_category enum: 'due','material','capacity','breakdown'.[^3][^1]
    - alert_severity enum: 'info','warning','critical'.[^3][^1]

Note: UUID generation via gen_random_uuid() is available in core PostgreSQL and is used for surrogate keys; no extension is required in supported versions.[^2][^1]

#### 1.2 SQL Schema (Migration Script)

The following migration script creates enums, tables, constraints, foreign keys, indexes, and enables RLS on all tables to align with SRS FR‑034.[^1]

```sql
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

-- OPTIONAL: RLS enablement per SRS FR-034 (policies to be defined in app migrations)
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
```

Note: gen_random_uuid() is available in core PostgreSQL (9.4+ with pgcrypto, 13+ core function), so this migration assumes a modern Postgres where no extension is needed.[^4][^2][^1]

### 2. Minimal Test Data

The following inserts verify key relationships, enum usage, and constraints for critical flows such as import, sequencing, dispatching, and alerting.[^1]

```sql
-- ROLES
INSERT INTO roles (name, permissions) VALUES
('admin', '{"manage_users": true, "manage_policies": true}'),
('planner', '{"plan": true, "release": true}'),
('av', '{"edit_order_params": true}'),
('shift_lead', '{"dispatch_read": true, "report_progress": true}'),
('sales', '{"status_read": true}'),
('plant_manager', '{"kpi_read": true}');

-- USERS
INSERT INTO users (email, role) VALUES
('admin@example.com','admin'),
('planner@example.com','planner'),
('av@example.com','av'),
('shift@example.com','shift_lead'),
('sales@example.com','sales'),
('manager@example.com','plant_manager');

-- CALENDAR AND MACHINES
INSERT INTO calendars (shifts, timezone) VALUES
('{"mon_fri":[{"start":"06:00","end":"14:00"},{"start":"14:00","end":"22:00"}]}','Europe/Berlin');

INSERT INTO machines (name, type, calendar_id, capacity_unit)
SELECT 'Tiefdruck-1','gravure', id,'m2_per_hour' FROM calendars LIMIT 1;

INSERT INTO machines (name, type, calendar_id, capacity_unit)
SELECT 'Stanze-1','diecut', id,'sheets_per_hour' FROM calendars LIMIT 1;

-- SETUP GROUPS
INSERT INTO setup_groups (name, attributes, change_matrix) VALUES
('Farbe-CMYK', '{"colors":["C","M","Y","K"]}', '{"same":5,"minor":15,"major":45}');

-- ORDERS AND OPERATIONS
INSERT INTO orders (erp_no, customer, due_date, quantity, article, process_chain, priority, status) VALUES
('ERP-1001','ACME GmbH','2025-09-30',100000,'ZigPack', ARRAY['print','diecut','glue'], 5, 'planned');

INSERT INTO operations (order_id, machine_id, duration_min, setup_group_id, state)
SELECT o.id, m.id, 180, sg.id, 'planned'
FROM orders o, machines m, setup_groups sg
WHERE o.erp_no='ERP-1001' AND m.name='Tiefdruck-1' AND sg.name='Farbe-CMYK'
LIMIT 1;

INSERT INTO operations (order_id, duration_min, state)
SELECT id, 90, 'planned' FROM orders WHERE erp_no='ERP-1001' LIMIT 1;

-- MATERIALS AND STATUS
INSERT INTO materials (article, lot, eta, qty) VALUES
('ZigSubstrate','LOT-001', now() + interval '2 days', 120000);

INSERT INTO material_status (operation_id, status, note)
SELECT id, 'pending','Awaiting substrate delivery' FROM operations ORDER BY id LIMIT 1;

-- PLAN, PLAN_OPERATIONS, DISPATCH
INSERT INTO plans (name, version, status, comment) VALUES
('Plan-2025-W39', 1, 'draft', 'Initial weekly plan');

INSERT INTO plan_operations (plan_id, operation_id, seq_index, locked)
SELECT p.id, o.id, 1, false FROM plans p, operations o WHERE p.name='Plan-2025-W39' LIMIT 1;

INSERT INTO dispatches (machine_id, shift_date, items)
SELECT m.id, CURRENT_DATE, '{"ops":[{"op_id":"ref later"}]}'::jsonb FROM machines m WHERE m.name='Tiefdruck-1' LIMIT 1;

-- EVENTS AND ALERTS
INSERT INTO events (type, payload) VALUES
('rush','{"order":"ERP-1001","reason":"Customer escalation"}');

INSERT INTO alerts (category, severity, entity_ref, acknowledged_by)
SELECT 'due','warning','{"order":"ERP-1001"}', NULL;
```

This dataset provides a minimal but representative graph to test CRUD, scheduling entities, and key relations end‑to‑end.[^1]

### 3. Schema Review

- Coverage of SRS FR‑001 to FR‑032: All core features including machine/calendar CRUD, setup groups, ERP import, AV enrichment, operations with dependencies, finite capacity metadata, sequencing, material readiness, scenarios, plan versioning, dispatch, events/alerts, KPIs, and audit logs are represented as normalized tables with appropriate constraints.[^1]
- Coverage of AuthN/AuthZ and RLS (FR‑033 to FR‑035): users/roles tables exist and all tables have RLS enabled to implement row‑level policies in accordance with Supabase/PostgreSQL best practices.[^1]
- Enumerations: All enum fields specified in the SRS are expressed as PostgreSQL ENUM types to enforce valid states and categories at the database level.[^3][^1]
- Keys and integrity: All primary/foreign key relationships mirror the SRS relationships; cascading deletes are applied where safe (e.g., operations under orders), and SET NULL is used where business continuity requires preservation (e.g., machine reassignment).[^1]
- Performance and UX alignment: Indexes on common query paths (time‑series operations per machine, plan sequencing, dispatch lookup, due dates) support the SRS performance goals.[^1]
- Traceability examples: machines ↔ FR‑001; setup_groups/change_matrix ↔ FR‑002/FR‑034; orders.erp_no unique and validations ↔ FR‑003/FR‑020; operations.ai_score/ai_explain ↔ FR‑010/FR‑011; material_status ↔ FR‑009/FR‑033; plans/plan_operations/versioning ↔ FR‑015/FR‑047; events/alerts ↔ FR‑012/FR‑017; audit_logs ↔ FR‑021/FR‑035.[^1]
- UUID identity strategy: All entities use UUID PKs with gen_random_uuid() for strong global identifiers, simplifying client‑generated IDs and replication.[^2][^1]


### 4. Notes on PostgreSQL Features

- UUID generation: gen_random_uuid() is provided natively and is used for all PK defaults in this schema to avoid integer PK contention and ease distributed operations.[^2][^1]
- ENUMs: PostgreSQL ENUMs are used to constrain status/state fields to known values as suggested by the SRS; consider ALTER TYPE ... ADD VALUE for lifecycle evolution.[^3][^1]
- RLS enablement: RLS is enabled on all tables; concrete policy definitions will be authored per application roles and PRD access rules in subsequent migrations.[^1]

If desired, a follow‑up migration can add RLS policies, triggers for audit_logs, and generated columns for common KPIs to further align with the SRS acceptance criteria.[^1]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^5][^6][^7][^8][^9]</span>

<div style="text-align: center">⁂</div>

[^1]: paste.txt

[^2]: https://www.postgresql.org/docs/current/functions-uuid.html

[^3]: https://www.postgresql.org/docs/current/datatype-enum.html

[^4]: https://www.postgresql.org/docs/current/pgcrypto.html

[^5]: https://github.com/prisma/docs/issues/2209

[^6]: https://stackoverflow.com/questions/73543745/getting-function-gen-random-uuid-already-exists-with-same-argument-types-while

[^7]: https://www.postgresql.org/message-id/17349-24d61e214429e8c1@postgresql.org

[^8]: https://brandur.org/fragments/secure-bytes-without-pgcrypto

[^9]: https://docs.vultr.com/how-to-use-enumerated-data-types-with-postgresql

[^10]: https://neon.com/postgresql/postgresql-tutorial/postgresql-enum

[^11]: https://www.reddit.com/r/django/comments/188ua2x/how_can_i_use_postgres_gen_random_uuid_for_a/

[^12]: https://www.postgresql.org/docs/current/sql-createtype.html

[^13]: https://neon.com/docs/extensions/pgcrypto

[^14]: https://www.codeproject.com/articles/Need-a-UUID-Generator-for-Postgres-Here-are-Two-Wa

[^15]: https://stackoverflow.com/questions/10923213/postgres-enum-data-type-or-check-constraint

[^16]: https://supabase.com/docs/guides/database/postgres/enums

[^17]: https://www.forestadmin.com/blog/postgres-enums-dissected/

[^18]: https://www.youtube.com/watch?v=vV1IEQ1rhTY

[^19]: https://wiki.postgresql.org/wiki/Enum

