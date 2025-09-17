-- Insert placeholder machines for packaging printing
INSERT INTO public.machines (name, type, active, capacity_unit) VALUES
  ('Tiefdruckmaschine 1600', 'print', true, 'Bogen/h'),
  ('Tiefdruckmaschine 1610', 'print', true, 'Bogen/h'),
  ('Offsetmaschine 1620', 'print', true, 'Bogen/h'),
  ('Offsetmaschine 1630', 'print', true, 'Bogen/h'),
  ('Stanzmaschine 1', 'cut', true, 'Stück/h'),
  ('Stanzmaschine 2', 'cut', true, 'Stück/h'),
  ('Klebemaschine 1', 'glue', true, 'Stück/h'),
  ('Klebemaschine 2', 'glue', true, 'Stück/h');

-- Insert placeholder orders
INSERT INTO public.orders (erp_no, article, customer, due_date, priority, quantity, status, process_chain) VALUES
  ('ERB-2024-001', 'Verpackung Müsli Premium 500g', 'Cereals GmbH', '2024-09-20', 8, 5000, 'planned', ARRAY['print', 'cut', 'glue']),
  ('ERB-2024-002', 'Karton Schokolade Deluxe', 'Sweet Dreams AG', '2024-09-18', 9, 3000, 'in_progress', ARRAY['print', 'cut']),
  ('ERB-2024-003', 'Faltschachtel Kekse Classic', 'Biscuit Bros Ltd', '2024-09-22', 5, 8000, 'planned', ARRAY['print', 'cut', 'glue']),
  ('ERB-2024-004', 'Display Süßwaren Aktion', 'Candy Corner', '2024-09-19', 7, 2000, 'planned', ARRAY['print', 'cut']),
  ('ERB-2024-005', 'Versandkarton E-Commerce', 'Online Markt 24', '2024-09-25', 4, 12000, 'planned', ARRAY['print', 'cut', 'glue']);

-- Insert operations for the orders (linking to machines)
WITH machine_ids AS (
  SELECT name, id FROM public.machines WHERE name IN (
    'Tiefdruckmaschine 1600', 'Offsetmaschine 1620', 'Stanzmaschine 1', 'Klebemaschine 1',
    'Tiefdruckmaschine 1610', 'Offsetmaschine 1630', 'Stanzmaschine 2', 'Klebemaschine 2'
  )
),
order_ids AS (
  SELECT erp_no, id FROM public.orders WHERE erp_no IN (
    'ERB-2024-001', 'ERB-2024-002', 'ERB-2024-003', 'ERB-2024-004', 'ERB-2024-005'
  )
)
INSERT INTO public.operations (order_id, machine_id, duration_min, start, end, state, ai_score) VALUES
  -- ERB-2024-001 operations (Müsli Premium)
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-001'), 
   (SELECT id FROM machine_ids WHERE name = 'Tiefdruckmaschine 1600'), 
   180, '2024-09-17 08:00:00+00', '2024-09-17 11:00:00+00', 'completed', 8.5),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-001'), 
   (SELECT id FROM machine_ids WHERE name = 'Stanzmaschine 1'), 
   120, '2024-09-17 13:00:00+00', '2024-09-17 15:00:00+00', 'completed', 7.8),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-001'), 
   (SELECT id FROM machine_ids WHERE name = 'Klebemaschine 1'), 
   90, '2024-09-18 09:00:00+00', '2024-09-18 10:30:00+00', 'in_progress', 8.2),
   
  -- ERB-2024-002 operations (Schokolade Deluxe)
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-002'), 
   (SELECT id FROM machine_ids WHERE name = 'Offsetmaschine 1620'), 
   150, '2024-09-17 14:00:00+00', '2024-09-17 16:30:00+00', 'completed', 9.1),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-002'), 
   (SELECT id FROM machine_ids WHERE name = 'Stanzmaschine 2'), 
   90, '2024-09-18 10:00:00+00', '2024-09-18 11:30:00+00', 'in_progress', 8.7),
   
  -- ERB-2024-003 operations (Kekse Classic)
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-003'), 
   (SELECT id FROM machine_ids WHERE name = 'Offsetmaschine 1630'), 
   240, '2024-09-19 08:00:00+00', '2024-09-19 12:00:00+00', 'planned', 6.9),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-003'), 
   (SELECT id FROM machine_ids WHERE name = 'Stanzmaschine 1'), 
   180, '2024-09-19 13:00:00+00', '2024-09-19 16:00:00+00', 'planned', 7.2),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-003'), 
   (SELECT id FROM machine_ids WHERE name = 'Klebemaschine 2'), 
   150, '2024-09-20 09:00:00+00', '2024-09-20 11:30:00+00', 'planned', 6.8),
   
  -- ERB-2024-004 operations (Display Süßwaren)
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-004'), 
   (SELECT id FROM machine_ids WHERE name = 'Tiefdruckmaschine 1610'), 
   120, '2024-09-18 14:00:00+00', '2024-09-18 16:00:00+00', 'planned', 7.5),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-004'), 
   (SELECT id FROM machine_ids WHERE name = 'Stanzmaschine 2'), 
   75, '2024-09-19 10:00:00+00', '2024-09-19 11:15:00+00', 'planned', 7.8),
   
  -- ERB-2024-005 operations (E-Commerce Karton)
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-005'), 
   (SELECT id FROM machine_ids WHERE name = 'Offsetmaschine 1620'), 
   300, '2024-09-20 08:00:00+00', '2024-09-20 13:00:00+00', 'planned', 5.4),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-005'), 
   (SELECT id FROM machine_ids WHERE name = 'Stanzmaschine 1'), 
   240, '2024-09-20 14:00:00+00', '2024-09-20 18:00:00+00', 'planned', 5.8),
  ((SELECT id FROM order_ids WHERE erp_no = 'ERB-2024-005'), 
   (SELECT id FROM machine_ids WHERE name = 'Klebemaschine 1'), 
   180, '2024-09-21 09:00:00+00', '2024-09-21 12:00:00+00', 'planned', 5.6);