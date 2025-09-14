<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# You are a senior product manager tasked with creating an optimized development roadmap suitable for execution by a single developer.

<roadmap_outline>

- Look for Requirements and Dependencies
    - Review all relevant documents to gather requirements and constraints:
        - project-plan/
            - PRD.md
            - SRS.md
            - API.md
            - Schema.md


# Phase 1: Requirements \& Architecture Setup

- Establish overall goals and constraints based on PRD.md and SRS.md.
- Clarify architecture for the project (full infrastructure setup not required).


# Phase 2: Iterative Feature Development

For each feature listed below, follow these structured steps:

1. Technical Spike
    - Develop a feasibility prototype to validate technical assumptions and mitigate risks.
2. Data Model Design
    - Clearly define new database tables or modifications in Schema.md.
    - Insert initial data entries to prevent errors from empty tables.
3. API and Backend
    - Implement or update necessary API endpoints as described in API.md.
    - Ensure compliance with backend requirements listed in SRS.md.
4. Frontend Implementation
    - Develop or update frontend components based on PRD.md requirements.
5. Refine User Experience
    - Conduct usability reviews and refine interfaces for consistency and clarity.

## Features

### Feature [XXX]

- Reference: [REQ-ID from SRS.md, PRD-ID from PRD.md, related API.md or Schema.md references]
- Description: [Briefly describe the feature, its purpose, and intended outcome.]


### Feature [YYY]

- Reference: [REQ-ID from SRS.md, PRD-ID from PRD.md, related API.md or Schema.md references]
- Description: [Briefly describe the feature, its purpose, and intended outcome.]


### Feature [ZZZ]

- Reference: [REQ-ID from SRS.md, PRD-ID from PRD.md, related API.md or Schema.md references]
- Description: [Briefly describe the feature, its purpose, and intended outcome.]
- Continue adding features as necessary, repeating the structured development steps for each.
</roadmap_outline>
Review Checklist:
- Ensure minimal yet sufficient detail to demonstrate clear traceability.
- Confirm all roadmap items address documented requirements.
- Check for consistency and completeness in roadmap structure.
- Verify traceability through explicit referencing of PRD.md, SRS.md, API.md, and Schema.md entries.
Formatting Guidelines:
- Maintain consistent Markdown formatting and numbering.
- Do not use bold styling (no asterisks or bold markdown syntax).
- Do not use markdown fences or additional disclaimers.

Nachfolgend steht eine optimierte, umsetzbare Roadmap für einen Einzelentwickler mit klarer Traceability auf PRD.md, SRS.md, API.md und Schema.md sowie auf Supabase/Next.js Vorgehen für eine iterative MVP-Umsetzung.[^1][^2]

## Look for Requirements and Dependencies

- Dokumentenstudium: Ziele, Muss‑Features, Rollen, KPIs und Nicht‑Ziele aus PRD.md und SRS.md extrahieren; daraus Ableitung der minimalen MVP‑Funktionalität und technischen Constraints.[^2]
- Traceability anlegen: Requirement‑Matrix mit Verknüpfung PRD US‑IDs ↔ SRS FR‑IDs ↔ API‑IDs ↔ Schema‑Tabellen/Typen; in project-plan/ gepflegt.[^2]
- Architekturleitplanken: Next.js Frontend mit Server Actions für privilegierte Flows, Supabase PostgREST für CRUD, striktes RLS, keine externen Abhängigkeiten außerhalb des Stacks.[^3][^2]
- Entwicklungsmodus: Iterativ‑inkrementell in kleinen, lieferfähigen Paketen; jedes Inkrement beinhaltet Schema, API, UI und Tests passend zum MVP‑Scope.[^4][^2]


## Phase 1: Requirements \& Architecture Setup

- Projektziele und Scope fixieren: MVP‑Fokus auf Planboard, endliche Kapazität, Sequenzregeln, ERP‑Import, Material‑Ready, Freigabe/Dispatch und KI‑Assistenz light.[^2]
- Sicherheitsrahmen definieren: Rollen, Auth, RLS‑Policy‑Patterns, Admin‑Operationen über Server Actions/RPC, Audit‑Pflichten und DSGVO‑Grundsätze.[^1][^2]
- Basis‑Schema ausarbeiten: Enums, Kernentitäten und Schlüsselbeziehungen gemäß SRS; Migrationspfad mit RLS aktiviert und Indizes für häufige Abfragen.[^1][^2]
- Infrastruktur light: Supabase‑Projekt, lokale Next.js Dev‑Umgebung, Umgebungsvariablen, seeding‑Skripte und Basis‑Monitoring für Fehler/Performance.[^3][^2]


## Phase 2: Iterative Feature Development

Jedes Feature wird in den Schritten Technical Spike → Data Model Design → API/Backend → Frontend → UX‑Refine umgesetzt.[^4][^2]

### Feature 1: AuthN/AuthZ und RLS Basis

- Reference: PRD US‑001, US‑002; SRS FR‑033, FR‑034, FR‑035; API n/a (Supabase Auth), Schema users, roles, RLS Policies.[^1][^2]
- Description: Sichere Anmeldung, rollenbasierte Autorisierung und flächendeckende RLS‑Durchsetzung als Fundament; Admin‑Aktionen nur serverseitig.[^3][^2]


### Feature 2: Stammdaten Maschinen und Schichtkalender

- Reference: PRD US‑003, US‑043; SRS FR‑001, FR‑006; API‑01, API‑02, API‑03; Schema machines, calendars, machine_type.[^2][^1]
- Description: CRUD für Maschinen und Kalender mit Kapazitätseinheiten und Wartungsfenstern als Basis für endliche Kapazität und Planung.[^2]


### Feature 3: Setup‑Gruppen und Rüstzeitmodell

- Reference: PRD US‑004, US‑011, US‑034; SRS FR‑002, FR‑008, FR‑013; API‑04, API‑05, API‑06; Schema setup_groups, change_matrix.[^1][^2]
- Description: Definition von Setup‑Attributen und Sequenz‑Rüstzeitmatrix zur Bündelung und realistischen Dauerberechnung.[^2]


### Feature 4: ERP‑Import Digitale Mappe

- Reference: PRD US‑005, US‑023, US‑026; SRS FR‑003, FR‑020, FR‑026; API‑07, API‑08, API‑09; Schema orders.[^1][^2]
- Description: Validierter Import mit Deduplizierung, Pflichtfeldprüfung und Teilimport‑Reports, um die Planungsbasis zu füllen.[^2]


### Feature 5: Operationen und Gantt‑Board Basis

- Reference: PRD US‑007; SRS FR‑005; API‑10, API‑11; Schema operations, Indizes machine_id/start.[^1][^2]
- Description: Anzeige und Drag‑and‑drop von Operations mit Tooltips und Basisattributen als Grundfunktion des Leitstands.[^2]


### Feature 6: Endliche Kapazität und Terminierung

- Reference: PRD US‑008, US‑009; SRS FR‑006, FR‑022; API‑10, API‑11; Schema calendars, operations.[^2]
- Description: Vor‑/Rückwärtsterminierung, Auslastungswarnungen und Tardy‑Hinweise zur realistischen Planerstellung.[^2]


### Feature 7: Sequenzregeln und Abhängigkeiten

- Reference: PRD US‑010; SRS FR‑007, FR‑023; API‑11; Schema operations.deps.[^2]
- Description: Erzwingung Druck → Stanzen → Kleben mit Abhängigkeitsvisualisierung und begründetem Override.[^2]


### Feature 8: Material‑Ready und einfache Prognose

- Reference: PRD US‑012, US‑033; SRS FR‑009; API‑12, API‑13; Schema material_status, materials.[^2]
- Description: Materialstatus je Operation inkl. ETA‑Abgleich und Flags zur Vermeidung unrealistischer Pläne.[^2]


### Feature 9: KI‑Vorschläge Light und Explainability

- Reference: PRD US‑013, US‑014, US‑031, US‑041; SRS FR‑010, FR‑011, FR‑027, FR‑029; API‑22; Schema operations.ai_score, ai_explain.[^2]
- Description: Heuristischer Prioritäts‑Score mit erklärten Empfehlungen und Human‑in‑the‑Loop‑Annahme/Verwerfen.[^2]


### Feature 10: Druckspezifische Heuristiken

- Reference: PRD US‑016, US‑034; SRS FR‑013; API‑22; Schema setup_groups.change_matrix.[^2]
- Description: Clusterung nach Farbe/Substrat/Bahnbreite zur Makulatur‑ und Rüstzeitreduktion in Vorschlägen.[^2]


### Feature 11: Ereignisse und Re‑Optimierung

- Reference: PRD US‑015, US‑028, US‑029; SRS FR‑012, FR‑024, FR‑025; API‑19, API‑23; Schema events.[^2]
- Description: Ereignisbasierte Re‑Optimierung mit Delta‑Diff Vorschau für Störungen, Eilaufträge und Materialverzug.[^2]


### Feature 12: Szenarien und Vergleich

- Reference: PRD US‑017, US‑035; SRS FR‑014; API‑14, API‑15; Schema scenarios.[^2]
- Description: What‑if‑Simulationen mit KPI‑Vergleich und Markierung des besten Szenarios vor Freigabe.[^2]


### Feature 13: Planfreigabe, Dispatch und Rollback

- Reference: PRD US‑018, US‑047; SRS FR‑015, FR‑021; API‑16, API‑17, API‑18; Schema plans, plan_operations, dispatches, audit_logs.[^1][^2]
- Description: Versionierte Freigabe, Erzeugung von Maschinen‑Dispatches und revisionssicheres Rollback.[^2]


### Feature 14: Alerts und Ampellogik Vertrieb

- Reference: PRD US‑020, US‑036; SRS FR‑017, FR‑019; API‑20, API‑21, API‑27; Schema alerts.[^2]
- Description: Termin/Material/Kapazitäts‑Alerts und Sales‑Status mit Risikoampel und Begründung.[^2]


### Feature 15: KPI‑Dashboard und CSV‑Export

- Reference: PRD US‑021, US‑038, US‑042; SRS FR‑018; API‑24, API‑25; Schema kpi_metrics.[^2]
- Description: OTD, Tardy‑Minuten, Auslastung, Planstabilität mit Drill‑down und Export‑Funktion.[^2]


### Feature 16: Audit‑Logs und Zeitreisen

- Reference: PRD US‑024, US‑050; SRS FR‑021, FR‑032; API‑26; Schema audit_logs, plan_snapshots/plan_operations.[^2]
- Description: Lückenlose Protokolle und historische Planstände als Read‑only Vergleich.[^2]


### Feature 17: Suche/Filter und Lokalisierung

- Reference: PRD US‑048, US‑039; SRS FR‑030; API‑28; Schema Indizes für Orders/Operations.[^2]
- Description: Vereinheitlichte Suche mit persistierenden Filtern und korrekten Datums-/Zeitzone‑Einstellungen.[^2]


### Feature 18: Onboarding und Performance‑Ziele

- Reference: PRD US‑037, US‑025; SRS FR‑022; API n/a; Schema n/a.[^2]
- Description: Geführte Touren und Metrik‑Kontrollen für Ladezeiten, DnD‑Latenz und Re‑Optimierungsdauer.[^2]


## Review Checklist

- Traceability: Jedes Feature verweist explizit auf PRD US‑IDs, SRS FR‑IDs, API‑IDs und Schema‑Artefakte, sodass Abdeckung und Tests ableitbar sind.[^2]
- Vollständigkeit: Roadmap deckt alle MVP‑Must‑haves plus KI‑Assistenz, Szenarien, Freigabe/Dispatch, Alerts und KPIs ab.[^2]
- Konsistenz: Architekturprinzipien sind einheitlich (Next.js, Supabase REST/RPC, RLS, Server Actions), wodurch Implementierung pro Inkrement gleichartig erfolgt.[^1][^2]
- Einzelentwickler‑Fokus: Reihenfolge minimiert Abhängigkeiten, liefert früh nutzbare Teilwerte und hält Setup‑Aufwand gering.[^4][^2]


## Hinweise zur Umsetzung

- API‑Stil: Für Standard‑CRUD direkt PostgREST nutzen, privilegierte Flows über Next.js API‑Routen/Server Actions mit Service‑Key und zusätzlicher Validierung.[^1][^2]
- Datenpfad: Früh Seed‑Daten anlegen, um leere Zustände zu vermeiden; Indizes auf Due‑Date, Machine/Start und Plan‑Sequenzen für Performance.[^2]
- Iteration: Nach jedem Feature Nutzerfeedback einholen und MoSCoW‑Priorisierung für nächste Inkremente aktualisieren.[^4][^2]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^5][^6][^7][^8][^9]</span>

<div style="text-align: center">⁂</div>

[^1]: https://supabase.com/docs/guides/api

[^2]: paste.txt

[^3]: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs

[^4]: https://www.netguru.com/blog/roadmap-mvp

[^5]: https://matterapp.com/blog/mvp-to-scalable-product-digital-product-development-roadmap

[^6]: https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp

[^7]: https://devsquad.com/blog/mvp-development-process

[^8]: https://impalaintech.com/blog/mvp/mvp-roadmap/

[^9]: https://apidog.com/blog/supabase-api/

[^10]: https://www.reddit.com/r/Supabase/comments/1adceyw/supabase_nextjs_for_saas_whats_the_point_of/

[^11]: https://www.f22labs.com/blogs/mvp-milestones-deliverables/

[^12]: https://dev.to/shahmir049/how-to-use-nextjs-14-with-supabase-1ecc

[^13]: https://www.editiongroup.com/insights/minimum-viable-product-guide-for-founders

[^14]: https://supabase.com/blog/simplify-backend-with-data-api

[^15]: https://djangostars.com/blog/guide-mvp-mmp-mlp-mdp-map-startup-stages/

[^16]: https://chat2db.ai/resources/blog/how-to-integrate-supabase-rest-api

[^17]: https://catjam.fi/articles/next-supabase-what-do-differently

[^18]: https://github.com/orgs/supabase/discussions/21073

[^19]: https://www.youtube.com/watch?v=A6-56miVA_0

[^20]: https://www.projectrules.ai/rules/supabase

[^21]: https://www.answeroverflow.com/m/1335224186888519722

