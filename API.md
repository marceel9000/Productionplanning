<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# You are a senior backend architect tasked with creating a clear, comprehensive API Design based on the provided Software Requirements Specification (SRS). Ensure that each endpoint is clearly defined, mapped to the relevant SRS requirements, and includes detailed authorization and data formats.

<srs_document>
Paste the text from the attached SRS document here
</srs_document>

## API Design

### 1. API Endpoints

For each endpoint, specify clearly:

- ID: API-XX
- Title: Endpoint Title
- Method: HTTP Method (GET, POST, PUT, DELETE)
- Path: /api/endpoint/path
- Description: Briefly describe the purpose and functionality
- RequiredRoles:
    - Explicitly list roles that can access this endpoint (e.g., Admin, RegisteredUser, Guest)
- Parameters:
    - Name: Parameter name
    - Type: Data type (string, integer, UUID, etc.)
    - Required: True/False
    - Description: Brief parameter description
- RequestBody (if applicable):
    - Schema:
        - Field:
            - Name
            - Type
            - Required
            - Description
- Responses:
    - Response:
        - StatusCode: HTTP status code (e.g., 200, 404)
        - Description: Brief description of the response
Example format:
- ID: API-01
- Title: Create New User
- Method: POST
- Path: /api/users/create
- Description: Create a new user in the system
- RequiredRoles:
    - Admin
- Parameters: None
- RequestBody:
    - Schema:
        - Field:
            - Name: email
            - Type: string
            - Required: True
            - Description: User email address
        - Field:
            - Name: password
            - Type: string
            - Required: True
            - Description: User password
- Responses:
    - Response:
        - StatusCode: 201
        - Description: User successfully created
    - Response:
        - StatusCode: 400
        - Description: Validation error

```
### 2. API Schema Review
- Confirm all SRS requirements (e.g., SRS-001, SRS-002) are explicitly mapped to API endpoints.
- Check endpoint design for completeness, consistency, and traceability.
- Verify clear definitions of roles and their respective permissions per endpoint.
### 3. Technical Considerations
- If queries return no data, this is considered a valid response (no error required).
- Ensure all endpoints and data structures strictly follow the specifications defined in the SRS.
### 4. Formatting Guidelines
- Maintain consistent numbering and Markdown formatting.
- Avoid bold markdown formatting (**).
- Ensure clarity and readability in API endpoint definitions.

Below is a complete API design for the MVP that aligns with the SRS and Supabase/PostgREST usage, including clear roles, data formats, and SRS traceability per endpoint.[^1][^2]

## 1. API Endpoints

- ID: API-01  
  Title: List Machines  
  Method: GET  
  Path: /api/machines  
  Description: Returns a paginated list of machines with calendar linkage for finite capacity planning.[^2][^1]
  SRSRefs: FR-001, FR-006, FR-043.[^1]
  RequiredRoles:
  - admin, planner, av, shift_lead, plant_manager, sales (read-only).[^3][^1]
  Parameters:
  - name: page, Type: integer, Required: False, Description: Page number for pagination.[^1]
  - name: pageSize, Type: integer, Required: False, Description: Items per page (default 50).[^1]
  - name: type, Type: string, Required: False, Description: Filter by machine_type enum.[^1]
  RequestBody: None.[^1]
  Responses:
  - StatusCode: 200, Description: JSON array of machines including calendar_id and maintenance_windows.[^2][^1]
  - StatusCode: 401, Description: Unauthorized without valid session.[^3]

- ID: API-02  
  Title: Create Machine  
  Method: POST  
  Path: /api/machines  
  Description: Creates a new machine with type, capacity unit, and calendar binding.[^2][^1]
  SRSRefs: FR-001.[^1]
  RequiredRoles:
  - admin.[^3][^1]
  RequestBody:
  - Field: name, Type: string, Required: True, Description: Unique machine name.[^1]
  - Field: type, Type: string, Required: True, Description: One of gravure, offset, diecut, gluing.[^1]
  - Field: calendar_id, Type: UUID, Required: False, Description: Reference to calendars.id.[^1]
  - Field: capacity_unit, Type: string, Required: True, Description: Unit label for capacity.[^1]
  Responses:
  - StatusCode: 201, Description: Created machine row with id.[^2][^1]
  - StatusCode: 409, Description: Duplicate name violates unique constraint.[^1]

- ID: API-03  
  Title: Update Machine  
  Method: PATCH  
  Path: /api/machines/{id}  
  Description: Updates machine attributes including maintenance windows and active flag.[^2][^1]
  SRSRefs: FR-001, FR-043.[^1]
  RequiredRoles:
  - admin.[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Machine id.[^1]
  RequestBody:
  - Field: active, Type: boolean, Required: False, Description: Toggle machine availability.[^1]
  - Field: maintenance_windows, Type: array<tstzrange>, Required: False, Description: Planned maintenance time ranges.[^1]
  Responses:
  - StatusCode: 200, Description: Updated machine row.[^1]
  - StatusCode: 404, Description: Machine not found.[^1]

- ID: API-04  
  Title: List Setup Groups  
  Method: GET  
  Path: /api/setup-groups  
  Description: Returns setup groups with attributes and change matrices used for sequence-dependent setup times.[^2][^1]
  SRSRefs: FR-002, FR-011, FR-034.[^1]
  RequiredRoles:
  - admin, planner, av (read-only for non-admin).[^3][^1]
  Parameters:
  - name: q, Type: string, Required: False, Description: Free-text filter by name.[^1]
  RequestBody: None.[^1]
  Responses:
  - StatusCode: 200, Description: JSON array of setup_groups.[^2][^1]

- ID: API-05  
  Title: Create Setup Group  
  Method: POST  
  Path: /api/setup-groups  
  Description: Creates a setup group with attributes and change matrix for setup time modeling.[^2][^1]
  SRSRefs: FR-002, FR-034.[^1]
  RequiredRoles:
  - admin.[^3][^1]
  RequestBody:
  - Field: name, Type: string, Required: True, Description: Setup group name.[^1]
  - Field: attributes, Type: json, Required: True, Description: Arbitrary attributes, e.g., color set or substrate.[^1]
  - Field: change_matrix, Type: json, Required: True, Description: Setup transition times between groups.[^1]
  Responses:
  - StatusCode: 201, Description: Created setup group.[^1]

- ID: API-06  
  Title: Update Setup Group  
  Method: PATCH  
  Path: /api/setup-groups/{id}  
  Description: Updates a setup group’s attributes and change matrix.[^2][^1]
  SRSRefs: FR-002, FR-034.[^1]
  RequiredRoles:
  - admin.[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Setup group id.[^1]
  RequestBody:
  - Field: attributes, Type: json, Required: False, Description: Updated key-value attributes.[^1]
  - Field: change_matrix, Type: json, Required: False, Description: Updated setup matrix.[^1]
  Responses:
  - StatusCode: 200, Description: Updated setup group.[^1]

- ID: API-07  
  Title: ERP Order Import  
  Method: POST  
  Path: /api/import/orders  
  Description: Imports orders as “digitale Mappe” with validation, deduplication, and partial success reporting.[^2][^1]
  SRSRefs: FR-003, FR-020, FR-026.[^1]
  RequiredRoles:
  - admin, av.[^3][^1]
  RequestBody:
  - Field: source, Type: string, Required: False, Description: Optional source descriptor.[^1]
  - Field: items, Type: array<object>, Required: True, Description: Batch of order payloads with ERP fields.[^1]
  Responses:
  - StatusCode: 207, Description: Multi-status with per-row result and error report.[^1]
  - StatusCode: 201, Description: All orders created without errors.[^1]
  - StatusCode: 400, Description: Invalid shape or missing required fields.[^1]

- ID: API-08  
  Title: List Orders  
  Method: GET  
  Path: /api/orders  
  Description: Lists orders with filters for due_date, status, priority, and ERP number.[^2][^1]
  SRSRefs: FR-003, FR-018, FR-019.[^1]
  RequiredRoles:
  - admin, planner, av, sales, plant_manager (read-only).[^3][^1]
  Parameters:
  - name: dueFrom, Type: date, Required: False, Description: Inclusive lower bound for due_date.[^1]
  - name: dueTo, Type: date, Required: False, Description: Inclusive upper bound for due_date.[^1]
  - name: status, Type: string, Required: False, Description: Filter by order_status.[^1]
  - name: erp_no, Type: string, Required: False, Description: Exact ERP order number.[^1]
  Responses:
  - StatusCode: 200, Description: JSON array of orders with core fields.[^2][^1]

- ID: API-09  
  Title: Update Order  
  Method: PATCH  
  Path: /api/orders/{id}  
  Description: Updates order metadata such as priority or status with version-safe checks.[^2][^1]
  SRSRefs: FR-003, FR-026.[^1]
  RequiredRoles:
  - admin, av (limited fields), planner (limited fields).[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Order id.[^1]
  RequestBody:
  - Field: priority, Type: integer, Required: False, Description: Priority for sequencing.[^1]
  - Field: status, Type: string, Required: False, Description: New order_status.[^1]
  Responses:
  - StatusCode: 200, Description: Updated order.[^1]
  - StatusCode: 409, Description: Conflict due to concurrent change.[^1]

- ID: API-10  
  Title: List Operations  
  Method: GET  
  Path: /api/operations  
  Description: Lists operations with joins on orders, machines, and setup groups for plan context.[^2][^1]
  SRSRefs: FR-005, FR-006, FR-007, FR-008.[^1]
  RequiredRoles:
  - admin, planner, av, shift_lead, plant_manager (read-only except planner).[^3][^1]
  Parameters:
  - name: order_id, Type: UUID, Required: False, Description: Filter by order.[^1]
  - name: machine_id, Type: UUID, Required: False, Description: Filter by machine.[^1]
  - name: state, Type: string, Required: False, Description: Filter by operation_state.[^1]
  Responses:
  - StatusCode: 200, Description: JSON array of operations with selected relations.[^2][^1]

- ID: API-11  
  Title: Update Operation (Plan Move)  
  Method: PATCH  
  Path: /api/operations/{id}  
  Description: Updates an operation’s start, end, machine assignment, deps, and state as part of drag-and-drop planning.[^2][^1]
  SRSRefs: FR-005, FR-006, FR-007, FR-008, FR-023.[^1]
  RequiredRoles:
  - planner.[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Operation id.[^1]
  RequestBody:
  - Field: start, Type: timestamptz, Required: False, Description: New planned start.[^1]
  - Field: end, Type: timestamptz, Required: False, Description: New planned end.[^1]
  - Field: machine_id, Type: UUID, Required: False, Description: Target machine.[^1]
  - Field: deps, Type: array<UUID>, Required: False, Description: Predecessor operation ids.[^1]
  - Field: state, Type: string, Required: False, Description: Updated operation_state.[^1]
  Responses:
  - StatusCode: 200, Description: Updated operation with validations enforced by RLS and constraints.[^3][^1]

- ID: API-12  
  Title: List Material Status  
  Method: GET  
  Path: /api/material-status  
  Description: Returns material readiness per operation with status flags.[^2][^1]
  SRSRefs: FR-009, FR-033.[^1]
  RequiredRoles:
  - admin, planner, av, plant_manager (read-only).[^3][^1]
  Parameters: None.[^1]
  Responses:
  - StatusCode: 200, Description: JSON array of material_status records.[^2][^1]

- ID: API-13  
  Title: Update Material Status  
  Method: PATCH  
  Path: /api/material-status/{id}  
  Description: Updates material readiness status and note for an operation.[^2][^1]
  SRSRefs: FR-009, FR-033.[^1]
  RequiredRoles:
  - av, planner, admin.[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Material status id.[^1]
  RequestBody:
  - Field: status, Type: string, Required: True, Description: One of ready, pending, critical.[^1]
  - Field: note, Type: string, Required: False, Description: Additional context.[^1]
  Responses:
  - StatusCode: 200, Description: Updated material_status.[^1]

- ID: API-14  
  Title: Create Scenario Snapshot  
  Method: POST  
  Path: /api/scenarios  
  Description: Creates a what-if scenario snapshot with optional precomputed KPIs.[^2][^1]
  SRSRefs: FR-014, FR-035.[^1]
  RequiredRoles:
  - planner.[^3][^1]
  RequestBody:
  - Field: name, Type: string, Required: True, Description: Scenario label.[^1]
  - Field: kpis, Type: json, Required: False, Description: Optional KPI metrics for the scenario.[^1]
  Responses:
  - StatusCode: 201, Description: Created scenario with id.[^1]

- ID: API-15  
  Title: Get Scenario  
  Method: GET  
  Path: /api/scenarios/{id}  
  Description: Retrieves scenario details including KPIs for comparison.[^2][^1]
  SRSRefs: FR-014, FR-035.[^1]
  RequiredRoles:
  - planner, plant_manager (read-only).[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Scenario id.[^1]
  Responses:
  - StatusCode: 200, Description: Scenario document.[^1]

- ID: API-16  
  Title: Release Plan  
  Method: POST  
  Path: /api/plans/release  
  Description: Releases the current plan to dispatch lists, locks plan content, and increments version.[^4][^1]
  SRSRefs: FR-015, FR-047.[^1]
  RequiredRoles:
  - planner, admin.[^3][^1]
  RequestBody:
  - Field: plan_id, Type: UUID, Required: True, Description: Plan to release.[^1]
  - Field: comment, Type: string, Required: False, Description: Release note.[^1]
  Responses:
  - StatusCode: 200, Description: Released plan with version and dispatch references.[^1]

- ID: API-17  
  Title: Rollback Plan  
  Method: POST  
  Path: /api/plans/rollback  
  Description: Rolls back a released plan version with audit logging.[^4][^1]
  SRSRefs: FR-015, FR-047, FR-021.[^1]
  RequiredRoles:
  - admin.[^3][^1]
  RequestBody:
  - Field: plan_id, Type: UUID, Required: True, Description: Target plan id.[^1]
  - Field: comment, Type: string, Required: True, Description: Reason for rollback.[^1]
  Responses:
  - StatusCode: 200, Description: Rolled-back plan state recorded and audited.[^1]

- ID: API-18  
  Title: Get Dispatches  
  Method: GET  
  Path: /api/dispatches  
  Description: Returns dispatch lists per machine and shift date for shopfloor execution.[^2][^1]
  SRSRefs: FR-015, UC-006.[^1]
  RequiredRoles:
  - shift_lead, planner, admin.[^3][^1]
  Parameters:
  - name: machine_id, Type: UUID, Required: True, Description: Machine id.[^1]
  - name: shift_date, Type: date, Required: True, Description: Shift date.[^1]
  Responses:
  - StatusCode: 200, Description: Dispatch items JSON for the shift.[^2][^1]

- ID: API-19  
  Title: Create Event  
  Method: POST  
  Path: /api/events  
  Description: Records breakdown, rush, or material_delay events to trigger re-optimization flows.[^2][^1]
  SRSRefs: FR-012, FR-025, UC-005.[^1]
  RequiredRoles:
  - shift_lead, planner, admin.[^3][^1]
  RequestBody:
  - Field: type, Type: string, Required: True, Description: One of breakdown, rush, material_delay.[^1]
  - Field: payload, Type: json, Required: True, Description: Event context, e.g., order or machine id.[^1]
  Responses:
  - StatusCode: 201, Description: Event created.[^1]

- ID: API-20  
  Title: List Alerts  
  Method: GET  
  Path: /api/alerts  
  Description: Lists alerts for due, material, capacity, and breakdown categories with severity.[^2][^1]
  SRSRefs: FR-017, FR-020.[^1]
  RequiredRoles:
  - admin, planner, av, shift_lead, sales, plant_manager (read-only).[^3][^1]
  Parameters:
  - name: category, Type: string, Required: False, Description: Filter by alert_category.[^1]
  - name: severity, Type: string, Required: False, Description: Filter by alert_severity.[^1]
  Responses:
  - StatusCode: 200, Description: JSON array of alerts.[^2][^1]

- ID: API-21  
  Title: Acknowledge Alert  
  Method: PATCH  
  Path: /api/alerts/{id}/acknowledge  
  Description: Marks an alert as acknowledged by the current user.[^2][^1]
  SRSRefs: FR-017.[^1]
  RequiredRoles:
  - planner, shift_lead, admin.[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Alert id.[^1]
  RequestBody: None.[^1]
  Responses:
  - StatusCode: 200, Description: Alert updated with acknowledged_by.[^1]

- ID: API-22  
  Title: AI Suggest Sequence  
  Method: POST  
  Path: /api/ai/suggest-sequence  
  Description: Returns a suggested operation sequence with scores and explainability fields.[^4][^1]
  SRSRefs: FR-010, FR-011, FR-027.[^1]
  RequiredRoles:
  - planner.[^3][^1]
  RequestBody:
  - Field: machine_id, Type: UUID, Required: True, Description: Target machine for sequencing.[^1]
  - Field: operation_ids, Type: array<UUID>, Required: True, Description: Candidate operations.[^1]
  - Field: objective, Type: string, Required: False, Description: tardiness_min or setup_min.[^1]
  Responses:
  - StatusCode: 200, Description: Ranked list with ai_score and ai_explain per operation.[^1]

- ID: API-23  
  Title: Re-optimize Plan  
  Method: POST  
  Path: /api/plans/reoptimize  
  Description: Triggers event-driven partial or full re-optimization with delta diff preview.[^4][^1]
  SRSRefs: FR-012, FR-024, FR-025.[^1]
  RequiredRoles:
  - planner, admin.[^3][^1]
  RequestBody:
  - Field: scope, Type: string, Required: True, Description: full or machine scope.[^1]
  - Field: machine_id, Type: UUID, Required: False, Description: Required if scope is machine.[^1]
  - Field: event_id, Type: UUID, Required: False, Description: Optional triggering event reference.[^1]
  Responses:
  - StatusCode: 200, Description: Proposed changes with before/after slots and impact KPIs.[^1]

- ID: API-24  
  Title: KPI Dashboard  
  Method: GET  
  Path: /api/kpis  
  Description: Returns OTD, tardy minutes, utilization, and plan stability metrics with drill-down.[^2][^1]
  SRSRefs: FR-018, FR-042.[^1]
  RequiredRoles:
  - plant_manager, admin.[^3][^1]
  Parameters:
  - name: periodFrom, Type: date, Required: False, Description: Start of period.[^1]
  - name: periodTo, Type: date, Required: False, Description: End of period.[^1]
  Responses:
  - StatusCode: 200, Description: KPI metrics and breakdowns.[^1]

- ID: API-25  
  Title: Export KPIs CSV  
  Method: GET  
  Path: /api/kpis/export.csv  
  Description: Exports KPI data as CSV for external analysis.[^2][^1]
  SRSRefs: FR-018, FR-038.[^1]
  RequiredRoles:
  - plant_manager, admin.[^3][^1]
  Parameters:
  - name: periodFrom, Type: date, Required: False, Description: Start of period.[^1]
  - name: periodTo, Type: date, Required: False, Description: End of period.[^1]
  Responses:
  - StatusCode: 200, Description: CSV content stream.[^1]

- ID: API-26  
  Title: List Audit Logs  
  Method: GET  
  Path: /api/audit-logs  
  Description: Lists audit entries for sensitive changes with before/after snapshots.[^2][^1]
  SRSRefs: FR-021, FR-035.[^1]
  RequiredRoles:
  - admin.[^3][^1]
  Parameters:
  - name: entity, Type: string, Required: False, Description: Filter by entity name.[^1]
  - name: actor, Type: UUID, Required: False, Description: Filter by user id.[^1]
  - name: from, Type: timestamptz, Required: False, Description: Time lower bound.[^1]
  - name: to, Type: timestamptz, Required: False, Description: Time upper bound.[^1]
  Responses:
  - StatusCode: 200, Description: JSON array of logs.[^2][^1]

- ID: API-27  
  Title: Order Status for Sales  
  Method: GET  
  Path: /api/orders/{id}/status  
  Description: Returns planned due date, risk flag, and blocking reasons for the sales view.[^2][^1]
  SRSRefs: FR-019, FR-036.[^1]
  RequiredRoles:
  - sales, planner, admin.[^3][^1]
  Parameters:
  - name: id, Type: UUID, Required: True, Description: Order id.[^1]
  Responses:
  - StatusCode: 200, Description: Status document with risk color and reason.[^1]

- ID: API-28  
  Title: Unified Search  
  Method: GET  
  Path: /api/search  
  Description: Unified filter endpoint across orders, operations, and machines with pagination.[^2][^1]
  SRSRefs: FR-030, FR-048.[^1]
  RequiredRoles:
  - all authenticated roles with RLS-constrained visibility.[^3][^1]
  Parameters:
  - name: entity, Type: string, Required: True, Description: One of orders, operations, machines.[^1]
  - name: q, Type: string, Required: False, Description: Free-text term.[^1]
  - name: page, Type: integer, Required: False, Description: Page number.[^1]
  - name: pageSize, Type: integer, Required: False, Description: Page size.[^1]
  Responses:
  - StatusCode: 200, Description: Paged results for selected entity.[^2][^1]

Notes on implementation: All /api/* routes are Next.js API routes or Server Actions that proxy to Supabase PostgREST endpoints or Security-Definer RPCs, enforcing role checks and hiding service keys.[^4][^1]

## 2. API Schema Review

- Coverage and mapping: Endpoints above collectively map to SRS FR-001 through FR-035, including CRUD for master data, planning operations, material readiness, scenarios, plan release, dispatch, events, alerts, KPIs, and audit logs.[^1]
- Security and roles: Each endpoint lists RequiredRoles and relies on Supabase Auth JWT plus RLS policies to enforce row-level access consistently.[^3][^1]
- Data formats: Request and response schemas align with the database schema in the SRS, using UUIDs, enums, jsonb, and timestamptz where specified.[^2][^1]
- Empty results: All GET endpoints return 200 with empty arrays if no data matches, consistent with PostgREST semantics.[^2][^1]

## 3. Technical Considerations

- Transport and gateway: For client reads and simple writes, the app can call Supabase REST directly with RLS, while privileged mutations are executed via Next.js server routes to protect service keys.[^4][^2][^1]
- RLS enforcement: Ensure RLS is enabled on all exposed tables and that policies check auth.uid() and role claims to satisfy authorization rules.[^5][^3][^1]
- Server actions: Use Next.js Server Actions for release and re-optimization flows to guarantee server-side execution and cache revalidations.[^6][^7][^1]
- RPC for compute: Implement re-optimization as a Postgres function exposed via /rest/v1/rpc/<name>, wrapped by /api/plans/reoptimize for role checks and input validation.[^8][^2][^1]
- Idempotency and concurrency: Use UPSERT semantics for ERP import and optimistic concurrency in PATCH updates where conflicts may occur.[^2][^1]

## 4. Formatting Guidelines

- All endpoints are numbered with stable IDs, include clear roles, parameters, request and response schemas, and map to SRS requirement IDs for traceability.[^1]
- Paths follow /api/* for server-controlled operations and proxy to Supabase /rest/v1/* internally where appropriate.[^2][^1]
- Authorization relies on Supabase Auth with JWT and database RLS to guarantee end-to-end enforcement consistent with the SRS.[^3][^1]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^9]</span>

<div style="text-align: center">⁂</div>

[^1]: paste.txt
[^2]: https://supabase.com/docs/guides/api
[^3]: https://supabase.com/docs/guides/database/postgres/row-level-security
[^4]: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
[^5]: https://supabase.com/features/row-level-security
[^6]: https://blog.logrocket.com/diving-server-actions-next-js-14/
[^7]: https://dev.to/shahmir049/how-to-use-nextjs-14-with-supabase-1ecc
[^8]: https://postgrest.org
[^9]: https://supabase.com/features/auto-generated-rest-api
[^10]: https://docs.postgrest.org/en/v12/index.html
[^11]: https://devhunt.org/blog/supabase-rest-api-quickstart
[^12]: https://supabase.com/docs/guides/api/creating-routes
[^13]: https://dev.to/asheeshh/mastering-supabase-rls-row-level-security-as-a-beginner-5175
[^14]: https://github.com/PostgREST/postgrest
[^15]: https://zone-www-dot-9obe9a1tk-supabase.vercel.app/docs/guides/api
[^16]: https://docs-ewup05pxh-supabase.vercel.app/docs/guides/auth/row-level-security
[^17]: https://www.youtube.com/watch?v=A6-56miVA_0
[^18]: https://www.reddit.com/r/Supabase/comments/13s5g53/is_there_complete_documentation_of_the_auth_rest/
[^19]: https://supabase.com/docs/guides/storage/security/access-control
[^20]: https://makerkit.dev/docs/next-supabase/data-fetching/server-actions
[^21]: https://docs-ajzc160j5-supabase.vercel.app/docs/learn/auth-deep-dive/auth-row-level-security```

