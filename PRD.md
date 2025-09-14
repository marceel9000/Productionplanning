# You are a senior product manager tasked with creating a detailed and actionable Product Requirements Document (PRD) based on the provided project description. Follow the guidelines and structure below carefully to ensure comprehensive coverage and clarity.

<prd_instructions>
Zweck und Ziel
Die Anwendung digitalisiert die manuelle Plantafel in einen visuellen Leitstand, um Aufträge über Tiefdruck, Offset, Stanzen und Kleben entlang von Lieferterminen und Materialverfügbarkeit belastbar zu sequenzieren.
Ziel ist eine schlanke, reaktionsfähige Planung mit Drag-and-drop, endlicher Kapazität und klarer Übergabe aus dem ERP, die Transparenz, Termintreue und Planstabilität erhöht.
Zielgruppe
Primäre Nutzer sind Produktionsplaner, Arbeitsvorbereitung und Schichtleiter; sekundäre Nutzer sind Vertrieb und Werksleitung zur Status- und Terminsicht.
Die Software fördert abteilungsübergreifende Zusammenarbeit durch gemeinsame Datenbasis und klare Verantwortlichkeiten.
Problemstellung
Heute erfolgt die Planung über eine Wand‑Plantafel mit Spalten für Tage/Kalenderwochen und Zeilen je Maschine/Linie; viele kleine Aufträge erfordern händische Reihenfolgen Druck → Stanzen → Kleben unter Termin- und Materialrestriktionen.
Dies führt zu Medienbrüchen, begrenzter Sichtbarkeit, hohem Koordinationsaufwand und suboptimaler Reaktion bei Störungen.
Zielbild
Ein digitaler Leitstand mit interaktivem Gantt‑Board, endlicher Kapazität und KI‑gestützter Sequenzierung ersetzt die Tafel und unterstützt Szenarien, Echtzeit‑Anpassungen und saubere ERP/MES‑Übergaben.
Planer sehen Engpässe, Abweichungen und Auswirkungen von Drag‑and‑drop unmittelbar, erhalten KI‑Vorschläge zur optimalen Reihenfolge und simulieren Alternativen vor Freigabe.
MVP‑Umfang (must‑have)
Visuelles Planboard: Wochen-/Tagesraster als Spalten, Maschinen/Linien als Zeilen; Drag‑and‑drop von Auftrags-/Operationskarten im interaktiven Gantt.
Endliche Kapazität: Auslastungswarnungen, Vor-/Rückwärtsterminierung, einfache Regeln je Ressource/Schichtkalender.
Sequenzregeln: Grundfolge Druck → Stanzen → Kleben; Option zur Bündelung gleicher Setups (z. B. Farbe/Substrat) zur Rüstzeitreduktion.
ERP‑Import: Digitale „Mappe“ mit Artikeldaten, Marke, Gravur, Sorte/Etikett aus ERP übernehmen; AV reichert produktionsrelevante Parameter an.
Material-/Verfügbarkeitscheck: Terminierung nur bei Material-/Ressourcenverfügbarkeit, sonst Kennzeichnung und Alternative.
Freigabe \& Dispatch: Auswahl des besten Plans, Freigabe als Arbeits-/Rüstreihenfolgen je Maschine mit Statusverfolgung.
KI‑gestützte Planung (neu)
Vorschlags‑Sequenzierung: KI bewertet Termindruck, Rüstwechsel, Materiallage und Maschinenkalender und schlägt smarte Reihenfolgen vor, die Tardiness minimieren und Rüstzeiten bündeln.
Echtzeit‑Re‑Optimierung: Bei Störungen, Eilaufträgen oder Materialverzug reoptimiert die KI den Plan in Sekunden und erklärt Auswirkungen auf Termine und Auslastung.
Prädiktive Signale: Nutzung von historischen/IoT‑Daten für Ausfallwahrscheinlichkeiten und Engpassprognosen, um präventiv umzuplanen.
Druckspezifische Heuristiken: Farb-/Substrat‑Cluster, Bahnbreiten und Jobfamilien für Verpackungsdruck zur Reduktion von Rüst- und Makulaturzeiten.
Human‑in‑the‑Loop: Planer bestätigt/überschreibt KI‑Vorschläge; jede Empfehlung ist begründet (Explainability) und als Szenario simulierbar.
Best Practices (eingearbeitet)
Finite‑Capacity‑Scheduling mit visuellen Überlastwarnungen statt statischer Listen.
Szenarioarbeit und Echtzeit‑Anpassungen für höhere Agilität bei Nachfrage-/Störungsänderungen.
Geschlossener Regelkreis: Plan → Freigabe → Ausführung → Monitoring → Re‑Planung, gespeist mit Echtzeitdaten.
Lean‑Prinzipien: Rüstzeit‑Minimierung, Flussorientierung, Reduktion von Warte- und Umlaufbeständen.
Nicht‑Ziele (MVP)
Kein vollautomatischer Black‑Box‑Optimierer; Fokus auf assistierte Planung mit nachvollziehbaren Regeln und KI‑Empfehlungen.
Kein vollumfängliches MES; nur Planfreigabe und einfache Rückmeldungen/Status.
Keine langfristige Absatzprognose; Fokus auf operative Feinplanung.
Hauptnutzen
Weniger manuelle Eingriffe und Medienbrüche durch digitale „Mappe“, integrierte Planung und KI‑Empfehlungen.
Höhere Termintreue durch Engpasssicht, Tardy‑Warnungen, druckspezifische Bündelung und prädiktive Re‑Optimierung.
Zentrale Entitäten (Datenmodell grob)
Auftrag, Operation, Maschine/Arbeitszentrum, Schicht/Arbeitskalender, Material/Artikel, Setup‑Gruppe, Priorität/Termin, Status, Nutzer/Rolle.
Bezüge: Auftrag → Operationskette (Druck → Stanzen → Kleben), Operation → Maschine/Schicht, Operation → Materialverfügbarkeit, Operation → KI‑Score/Begründung.
Kern‑Userflows
Vertrieb legt Auftrag im ERP an → Import als digitale „Mappe“.
AV ergänzt produktionsrelevante Daten → Übergabe an Planung.
Planung sequenziert im Gantt; KI schlägt Reihenfolge vor, simuliert Szenarien, Planer bestätigt.
Freigabe erzeugt Dispatch‑Listen je Maschine; Rückmeldungen aktualisieren Status und trainieren Modelle fortlaufend.
KI‑Umfang im MVP
Heuristischer Prioritäts‑Score: Terminabweichung, Rüstwechsel, Setup‑Kompatibilität, Material‑Ready und Maschinenverfügbarkeit als gewichtete Features.
Explainability‑Panel: Anzeige „Warum oben?“ inkl. Termin‑Impact, Rüst‑Ersparnis und Auslastungsänderung je Vorschlag.
Online‑Re‑Optimierung: Ereignisgetriggerte Neuberechnung bei Störung/Eilauftrag/Materialverzug mit Delta‑Diff im Board.
KPIs und Erfolgskriterien
OTD‑Quote, Tardy‑Minuten und Anzahl verspäteter Aufträge.
Rüstzeitminuten durch Bündelung/Sequenzlogik und Makulaturreduktion im Druck.
Reaktionszeit bei Störungen/Eilaufträgen und Planstabilität.
Planeraufwand pro Tag und übernommene KI‑Vorschläge (Adoption‑Rate).
Annahmen und Risiken
Erfolgsfaktoren sind belastbare Stammdaten, Maschinenkalender, Schichtmodelle, definierte Rollen sowie akzeptierte Übergaberoutinen.
Datenzugänge für Echtzeit-/Historik (ERP/MES/IoT) und Governance für Human‑in‑the‑Loop sichern Qualität, Erklärbarkeit und Akzeptanz.
MVP‑Backlog (erste Schritte)
Maschinen/Linien, Schichten, Kalender, Grund‑Setup‑Gruppen anlegen.
ERP‑Mapping für Auftragsstammdaten und Material‑Ready‑Felder.
Gantt‑Board mit Drag‑and‑drop, Kapazitätswarnungen, Tardy‑Logik und KI‑Prioritäts‑Score.
Ereignis‑Re‑Optimierung und Freigabeprozess mit Dispatch‑Listen je Maschine.

</prd_instructions>

## Steps to Create the PRD:

### 1. Introduction

Provide a concise introduction clearly stating the purpose, goals, and context of the document. Briefly describe the intended outcome of the product development effort.

### 2. Document Structure

Structure your PRD according to the following outline:
<prd_outline>

# Product Requirements Document

## 1. Title and Overview

### 1.1 Document Title \& Version

- Clearly state the official document title and version number.


### 1.2 Product Summary

- Summarize the core purpose of the product, primary functionality, target audience, and key goals.


## 2. User Personas

### 2.1 Key User Types

- List all distinct user types interacting with the product (e.g., Admin, Registered User, Guest).


### 2.2 Basic Persona Details

For each user type, provide:

- Role Name
- Job description or context
- Goals and objectives when using the product
- Main challenges or pain points faced


### 2.3 Role-based Access

- Clearly define each user role’s permissions and access levels.
- Describe key features accessible by each role.


## 3. User Stories

- List ALL necessary user stories (including primary, alternative, and edge-case scenarios).
- Each user story must include:
    - ID (e.g., US-001)
    - Title
    - Description ("As a [role], I want [feature/action] so that [benefit/outcome].")
    - Acceptance Criteria (clear, specific, testable)
- Include at least one specific user story related to secure access, authentication, or authorization if user identification or access control is required.
</prd_outline>


### 3. Creating User Stories

When developing user stories:

- Assign a unique and sequential ID for traceability.
- Cover all potential interactions (primary, secondary, edge cases).
- Ensure every user story has clear and testable acceptance criteria.


### 4. Final Checklist

Before finalizing the PRD, verify that:

- All user stories are testable.
- Acceptance criteria are clear, precise, and actionable.
- User stories collectively cover a complete, fully functional application.
- Authentication and authorization requirements are fully addressed (if applicable).


### 5. Formatting Guidelines

- Use valid Markdown consistently throughout the document.
- Do not use bold markdown formatting (**).
- Clearly number and structure sections and subsections.
- List every user story explicitly in the document.

Hier ist ein detailliertes, umsetzbares PRD entsprechend der vorgegebenen Struktur; es basiert vollständig auf den bereitgestellten Projektzielen und -anforderungen und ist auf ein MVP mit KI-Assistenz fokussiert.

# Product Requirements Document

## 1. Title and Overview

### 1.1 Document Title \& Version

- Titel: Smarter Leitstand für Produktionsplanung im Verpackungsdruck (MVP)
- Version: v0.9 (Draft)


### 1.2 Product Summary

- Zweck: Die Anwendung digitalisiert die manuelle Plantafel in einen visuellen Leitstand mit interaktivem Gantt-Board, endlicher Kapazität und KI-gestützter Sequenzierung für Tiefdruck, Offset, Stanzen und Kleben entlang von Lieferterminen und Materialverfügbarkeit.
- Primäre Funktionen: Visuelles Planboard mit Drag-and-drop; endliche Kapazitätsprüfung inkl. Auslastungswarnungen; Sequenzregeln Druck → Stanzen → Kleben; ERP-Import der digitalen „Mappe“; Material-/Ressourcenverfügbarkeitscheck; Planfreigabe und Dispatch; KI-Vorschlagssequenzierung, Echtzeit-Re-Optimierung, prädiktive Signale, druckspezifische Heuristiken; Human-in-the-Loop mit Explainability.
- Zielgruppe: Produktionsplanung, Arbeitsvorbereitung, Schichtleitung; sekundär Vertrieb und Werksleitung für Status-/Terminsicht.
- Ziele: Erhöhung von Transparenz, Termintreue und Planstabilität; Reduktion von Medienbrüchen und manuellem Koordinationsaufwand; schnelle Reaktion auf Störungen mit nachvollziehbarer, assistierter KI.


## 2. User Personas

### 2.1 Key User Types

- Systemadministrator
- Produktionsplaner
- Arbeitsvorbereitung (AV)
- Schichtleiter
- Vertrieb
- Werksleitung


### 2.2 Basic Persona Details

- Systemadministrator
    - Kontext: Verantwortlich für Stammdaten, Benutzer, Rollen, Integrationen, Systemeinstellungen.
    - Ziele: Sichere, performante Systemnutzung; robuste Schnittstellen; regelkonforme Zugriffssteuerung.
    - Pain Points: Inkonsistente Stammdaten, fehlerhafte Importe, Berechtigungsfehler.
- Produktionsplaner
    - Kontext: Sequenziert Aufträge über Druck, Stanzen, Kleben; reagiert auf Störungen und Eilaufträge.
    - Ziele: Termintreue, minimale Rüstzeiten, Planstabilität, schnelle Re-Planung.
    - Pain Points: Medienbrüche, fehlende Materialinfo, Engpasssicht, hoher manueller Aufwand.
- Arbeitsvorbereitung (AV)
    - Kontext: Anreicherung der „Mappe“ mit produktspezifischen Parametern (Marke, Gravur, Sorte/Etikett, Substrat, Bahnbreiten).
    - Ziele: Vollständige, fehlerarme Auftragsdaten für die Planung.
    - Pain Points: Unvollständige ERP-Daten, Rückfragen, doppelte Datenerfassung.
- Schichtleiter
    - Kontext: Führt freigegebene Reihenfolgen aus, meldet Status/Rüstungen/Rückmeldungen.
    - Ziele: Klare Dispatch-Listen, aktuelle Prioritäten, einfache Rückmeldung.
    - Pain Points: Unklare Änderungen, fehlende Priorisierung, veraltete Pläne.
- Vertrieb
    - Kontext: Auftragseingabe im ERP, Status-/Terminauskünfte für Kunden.
    - Ziele: Verlässliche Termine, frühzeitige Risikohinweise.
    - Pain Points: Intransparente Verzögerungen, manueller Nachlauf.
- Werksleitung
    - Kontext: Überblick über Auslastung, Engpässe, OTD, Planstabilität.
    - Ziele: Steuerungsrelevante KPIs, Eskalationsfähigkeit.
    - Pain Points: Inselberichte, fehlende Echtzeit-Sicht.


### 2.3 Role-based Access

- Systemadministrator
    - Rechte: Vollzugriff auf Stammdaten, Rollen, Integrationen, Systemeinstellungen.
    - Features: Benutzer-/Rollenverwaltung, ERP-/MES-Connector, Schicht-/Kalenderpflege, Setup-Gruppen.
- Produktionsplaner
    - Rechte: Erstellen/Ändern von Plänen, Szenarien, Freigaben; Einsicht in Material-/Kapazitätslage.
    - Features: Gantt-Board, KI-Vorschläge, Szenarien, Kapazitätswarnungen, Planfreigabe.
- Arbeitsvorbereitung
    - Rechte: Bearbeiten der Auftragsparameter; kein Freigaberecht.
    - Features: Digitale „Mappe“ anzeigen/ergänzen, Validierungschecks.
- Schichtleiter
    - Rechte: Lesen freigegebener Pläne, Rückmeldungen erfassen.
    - Features: Dispatch-Listen, Status-Updates, Störungsmeldungen.
- Vertrieb
    - Rechte: Leserechte auf Auftragsstatus/Termine.
    - Features: Status-/Terminübersicht, prognostische Risikohinweise.
- Werksleitung
    - Rechte: Leserechte auf KPIs/Dashboards; Eskalationshinweise.
    - Features: OTD, Tardy-Minuten, Auslastung, Planstabilität.


## 3. User Stories

US-001 Authentication: Login und Rollen

- Titel: Rollenbasierter Login
- Beschreibung: Als registrierter Nutzer möchte ich mich sicher anmelden, damit mir nur die für meine Rolle vorgesehenen Funktionen zur Verfügung stehen.
- Akzeptanzkriterien:
    - MFA optional aktivierbar durch Administrator.
    - Falsche Anmeldeinformationen führen zu Fehlermeldung ohne Details.
    - Nach Login werden Features gemäß Rolle angezeigt/versteckt.
    - Inaktivitäts-Timeout ist konfigurierbar (Standard 30 Minuten).

US-002 Authorization: Rechteprüfung

- Titel: Zugriffsschutz nach Rolle
- Beschreibung: Als Systemadministrator möchte ich Rollen und Berechtigungen verwalten, damit nur autorisierte Nutzer sensible Aktionen ausführen.
- Akzeptanzkriterien:
    - CRUD auf Rollen und Rechte.
    - Jede kritische Aktion prüft Berechtigungen serverseitig.
    - Audit-Log erfasst Rollenänderungen.

US-003 Stammdaten: Maschinen/Linien

- Titel: Maschinenstammdaten anlegen
- Beschreibung: Als Systemadministrator möchte ich Maschinen und Linien mit Kapazitäten und Schichtkalendern anlegen, damit die Planung auf endlicher Kapazität basiert.
- Akzeptanzkriterien:
    - Felder: Name, Typ (Tiefdruck/Offset/Stanzen/Kleben), Schichten, Kapazitätseinheiten, Wartungsfenster.
    - Validierung: Keine doppelten Namen; Kalender muss gültig sein.
    - Deaktivieren statt Löschen, wenn referenziert.

US-004 Stammdaten: Setup-Gruppen

- Titel: Setup-/Rüstgruppen definieren
- Beschreibung: Als Systemadministrator möchte ich Setup-Gruppen (z. B. Farbe, Substrat, Bahnbreite) definieren, um Rüstzeiten zu reduzieren.
- Akzeptanzkriterien:
    - Zuordnung von Attributen zu Gruppen.
    - Sequenzabhängige Rüstzeitregeln hinterlegbar.
    - Export/Import von Gruppen via CSV/JSON.

US-005 ERP-Import: Digitale Mappe

- Titel: Auftragsimporte aus ERP
- Beschreibung: Als AV möchte ich ERP-Aufträge als digitale „Mappe“ importieren, damit alle relevanten Felder für die Planung verfügbar sind.
- Akzeptanzkriterien:
    - Pflichtfelder: Auftragsnummer, Kunde, Termin, Menge, Artikel, Prozesskette.
    - Optional: Marke, Gravur, Sorte/Etikett, Substrat, Bahnbreite.
    - Validierungsreport für fehlende Pflichtfelder.
    - Deduplizierung per Auftragsnummer.

US-006 AV-Anreicherung

- Titel: Auftragsparameter ergänzen
- Beschreibung: Als AV möchte ich fehlende/produktspezifische Parameter ergänzen, damit die Planung vollständig ist.
- Akzeptanzkriterien:
    - Pflichtfeld-Prüfung vor Übergabe in Planung.
    - Änderungsverlauf mit Zeitstempel/Nutzer.
    - Sperrung gegen gleichzeitige Bearbeitung.

US-007 Planboard: Grundlayout

- Titel: Visuelles Gantt-Board
- Beschreibung: Als Produktionsplaner möchte ich ein Gantt-Board mit Tagen/Wochen und Maschinenzeilen sehen, um Operationen zu platzieren.
- Akzeptanzkriterien:
    - Zoombare Zeitachse (Tag/Woche).
    - Drag-and-drop von Operationskarten.
    - Tooltips mit Kernparametern (Termin, Dauer, Setup-Gruppe).

US-008 Endliche Kapazität: Auslastungswarnungen

- Titel: Kapazitätsprüfung
- Beschreibung: Als Produktionsplaner möchte ich Auslastungswarnungen sehen, um Überlast zu vermeiden.
- Akzeptanzkriterien:
    - Farbcodes für Unter-/Überlast.
    - Platzierung, die Kapazität übersteigt, erzeugt Warnhinweis.
    - Schicht-/Kalenderrücksichtnahme.

US-009 Terminierung: Vor-/Rückwärts

- Titel: Terminierungslogik
- Beschreibung: Als Produktionsplaner möchte ich vorwärts oder rückwärts terminieren, um Termine einzuhalten.
- Akzeptanzkriterien:
    - Modusauswahl je Operation.
    - Berechnung berücksichtigt Schichten, Pausen, Wartung.
    - Tardy-Anzeige bei Terminüberschreitung.

US-010 Sequenzregeln: Prozessfolge

- Titel: Grundfolge Druck → Stanzen → Kleben
- Beschreibung: Als Produktionsplaner möchte ich die Prozessfolge enforced haben, um Fehler zu vermeiden.
- Akzeptanzkriterien:
    - Invalides Sequencing wird verhindert oder erfordert Override mit Begründung.
    - Abhängigkeiten werden visualisiert (Pfeile/Links).
    - Reihenfolgeänderungen aktualisieren abhängige Schritte.

US-011 Setup-Bündelung

- Titel: Rüstzeitreduktion
- Beschreibung: Als Produktionsplaner möchte ich gleiche Setup-Gruppen bündeln, um Rüstzeiten zu reduzieren.
- Akzeptanzkriterien:
    - Option „nach Setup-Gruppen sortieren“ je Maschine.
    - Anzeige geschätzter Rüstzeitersparnis.
    - KI-Vorschläge berücksichtigen Setup-Gruppen.

US-012 Materialverfügbarkeit

- Titel: Material-Ready-Check
- Beschreibung: Als Produktionsplaner möchte ich Materialbereitstellung prüfen, um unrealistische Pläne zu vermeiden.
- Akzeptanzkriterien:
    - Materialstatus: verfügbar, ausstehend, kritisch.
    - Platzierung ohne Material setzt Flag und erzeugt Hinweis.
    - Alternativslot-Vorschlag bei verspätetem Material.

US-013 KI-Vorschlagssequenzierung

- Titel: KI-Empfehlungen zur Reihenfolge
- Beschreibung: Als Produktionsplaner möchte ich KI-gestützte Sequenzvorschläge erhalten, um Tardiness zu minimieren und Rüstwechsel zu bündeln.
- Akzeptanzkriterien:
    - Vorschlagsmodus ein-/ausblendbar.
    - Anzeigen eines Prioritäts-Scores pro Operation.
    - Akzeptieren/Verwerfen je Vorschlag; Board aktualisiert sich entsprechend.

US-014 Explainability-Panel

- Titel: Begründung der KI
- Beschreibung: Als Produktionsplaner möchte ich verstehen, warum ein Vorschlag oben steht, um fundierte Entscheidungen zu treffen.
- Akzeptanzkriterien:
    - Darstellung Termin-Impact, Rüst-Ersparnis, Auslastungsänderung.
    - Verweis auf berücksichtigte Constraints (Material, Kalender).
    - Exportierbare Begründung je Entscheidung.

US-015 Echtzeit-Re-Optimierung

- Titel: Ereignisbasierte Neuplanung
- Beschreibung: Als Produktionsplaner möchte ich bei Störungen/Eilaufträgen/Materialverzug schnelle Re-Optimierung auslösen, um Termine bestmöglich zu halten.
- Akzeptanzkriterien:
    - Trigger: Störung, Eilauftrag, Materialstatus geändert.
    - Berechnung < 10 Sekunden für 200 Operationen (MVP-Ziel).
    - Delta-Diff-Ansicht mit Vorher/Nachher.

US-016 Druckspezifische Heuristiken

- Titel: Branchenheuristiken
- Beschreibung: Als Produktionsplaner möchte ich Farb-/Substrat-/Bahnbreiten-Cluster nutzen, um Makulatur und Rüstzeiten zu reduzieren.
- Akzeptanzkriterien:
    - Konfigurierbare Heuristik-Gewichte.
    - Visualisierung von Familien/Clustern.
    - KPI: geschätzte Makulaturreduktion je Sequenz.

US-017 Szenarien

- Titel: What-if-Simulation
- Beschreibung: Als Produktionsplaner möchte ich Szenarien simulieren und vergleichen, bevor ich einen Plan freigebe.
- Akzeptanzkriterien:
    - Szenarien anlegen, benennen, vergleichen (KPI-Vergleich: OTD, Tardy, Rüst).
    - Max. 3 parallele Szenarien im MVP.
    - „Bestes Szenario“ markieren und freigeben.

US-018 Planfreigabe

- Titel: Dispatch-Erzeugung
- Beschreibung: Als Produktionsplaner möchte ich den finalen Plan freigeben und Dispatch-Listen je Maschine erzeugen.
- Akzeptanzkriterien:
    - Freigabe sperrt bearbeitete Slots; nur über Re-Planung änderbar.
    - Export/Ansicht je Maschine und Schicht.
    - Versionsnummer des Plans.

US-019 Shopfloor-Rückmeldung

- Titel: Statusupdates
- Beschreibung: Als Schichtleiter möchte ich Start/Ende/Rüst/Unterbrechung je Operation rückmelden, um den Planstatus aktuell zu halten.
- Akzeptanzkriterien:
    - Minimaler Erfassungsdialog pro Operation.
    - Offline-Pufferung bei Verbindungsproblemen.
    - Automatische Statussynchronisierung ins Board.

US-020 Alerts und Benachrichtigungen

- Titel: Warnungen und Hinweise
- Beschreibung: Als Nutzer möchte ich relevante Alerts erhalten, um rechtzeitig zu reagieren.
- Akzeptanzkriterien:
    - Kategorien: Termin, Material, Kapazität, Störung.
    - Rollenbasiertes Abo; stumm schalten möglich.
    - Ereignisprotokoll.

US-021 KPI-Dashboard

- Titel: Steuerungskennzahlen
- Beschreibung: Als Werksleitung möchte ich KPIs (OTD, Tardy-Minuten, Auslastung, Planstabilität) sehen, um die Performance zu bewerten.
- Akzeptanzkriterien:
    - Zeitraumfilter.
    - Drill-down bis Auftrag/Maschine.
    - Export als CSV.

US-022 Vertriebsstatus

- Titel: Auftragsstatus für Vertrieb
- Beschreibung: Als Vertrieb möchte ich geplante Termine und Risiken einsehen, um Kunden verlässlich zu informieren.
- Akzeptanzkriterien:
    - Leserechte ohne Planänderung.
    - Anzeige Risikofahnen (grün/gelb/rot) mit Grund.
    - Prognosefenster.

US-023 Datenqualität: Validierung

- Titel: Eingabekontrollen
- Beschreibung: Als AV möchte ich Validierungen sehen, um unvollständige/inkonsistente Daten früh zu beheben.
- Akzeptanzkriterien:
    - Pflichtfelder, Wertebereiche, Referenzprüfungen.
    - Sammelreport für alle fehlerhaften Aufträge.
    - Massenkorrektur (wo sinnvoll).

US-024 Audit-Logs

- Titel: Nachvollziehbarkeit
- Beschreibung: Als Auditor möchte ich Änderungen an Plänen und Stammdaten nachvollziehen, um Compliance zu sichern.
- Akzeptanzkriterien:
    - Wer, was, wann, vorher/nachher.
    - Filter nach Auftrag/Maschine/Nutzer.
    - Export als CSV.

US-025 Performance (MVP)

- Titel: Reaktionszeiten
- Beschreibung: Als Nutzer möchte ich flüssige Interaktionen, um effizient zu arbeiten.
- Akzeptanzkriterien:
    - Board-Load < 3 s bei 100 Maschinen/1.000 Operationen.
    - Drag-and-drop Latenz < 150 ms sichtbar.
    - Re-Optimierung wie US-015.

US-026 Fehlerfälle: Import

- Titel: Importfehlertoleranz
- Beschreibung: Als Systemadministrator möchte ich robuste ERP-Importe, um Teilausfälle zu vermeiden.
- Akzeptanzkriterien:
    - Teilimporte mit Fehlerbericht.
    - Idempotenz bei Wiederholungen.
    - Deduplizierung pro Schlüssel.

US-027 Fehlerfälle: Konflikte

- Titel: Konflikterkennung
- Beschreibung: Als Produktionsplaner möchte ich Konflikte (Overlap, Kapazitätsverletzung, Materialmangel) sofort sehen.
- Akzeptanzkriterien:
    - Konflikt-Overlay mit Kategorie.
    - Vorschläge zur Behebung.
    - Blocker- vs. Hinweis-Level.

US-028 Edge Case: Eilauftrag

- Titel: Hot-Insert
- Beschreibung: Als Produktionsplaner möchte ich Eilaufträge priorisiert einplanen.
- Akzeptanzkriterien:
    - Flag „Eilauftrag“ hebt Prioritäts-Score.
    - KI schlägt minimalinvasives Umschichten vor.
    - Anzeige betroffener Aufträge.

US-029 Edge Case: Maschinenausfall

- Titel: Downtime-Reaktion
- Beschreibung: Als Produktionsplaner möchte ich bei Ausfall alternative Maschinen/Slots sehen.
- Akzeptanzkriterien:
    - Sofortiger Lock der Ressource.
    - Alternativenliste nach gleicher Fähigkeit/Setup-Gruppe.
    - Re-Optimierungsknopf mit Impact-Anzeige.

US-030 Edge Case: Storno/Änderung

- Titel: Auftragsänderungen
- Beschreibung: Als AV/Vertrieb möchte ich Änderungen/Storno abbilden, ohne Plankonsistenz zu verlieren.
- Akzeptanzkriterien:
    - Änderungstracking mit Versionierung.
    - Automatischer Re-Check der Konflikte.
    - Bestätigung durch Planer bei kritischen Änderungen.

US-031 Human-in-the-Loop

- Titel: Manuelle Übersteuerung
- Beschreibung: Als Produktionsplaner möchte ich KI-Vorschläge überschreiben, wenn Fachwissen dies erfordert.
- Akzeptanzkriterien:
    - Override mit Begründungspflicht.
    - KI lernt optional aus akzeptierten Entscheidungen (Opt-in).
    - Kennzeichnung manueller Entscheidungen.

US-032 Sicherheit: Sitzungen/Protokolle

- Titel: Session-Management
- Beschreibung: Als Sicherheitsbeauftragter möchte ich Session-Timeouts und Protokollierung, um Risiken zu minimieren.
- Akzeptanzkriterien:
    - Konfigurierbares Timeout.
    - IP-/Geräteprotokoll.
    - Sofort-Logout aller Sitzungen pro Nutzer.

US-033 Materialprognose einfach (MVP)

- Titel: Frühe Materialrisiken
- Beschreibung: Als Produktionsplaner möchte ich einfache Materialprognosen (ETA vs. Bedarf), um früh umzuplanen.
- Akzeptanzkriterien:
    - ETA-Abgleich gegen Planbedarf.
    - Warnschwellen konfigurierbar.
    - Alternativtermin-Vorschläge.

US-034 Setup-Zeitmodell (MVP)

- Titel: Sequenzabhängige Rüstzeiten
- Beschreibung: Als Produktionsplaner möchte ich differenzierte Rüstzeiten, um realistische Pläne zu erzeugen.
- Akzeptanzkriterien:
    - Matrix: Vorherige → Nächste Setup-Gruppe.
    - Berechnung fließt in Dauer ein.
    - KPI-Ausweis Rüstzeitanteil.

US-035 Szenarioprotokolle

- Titel: Vergleich und Entscheidung
- Beschreibung: Als Produktionsplaner möchte ich Szenariovergleiche dokumentieren, um Entscheidungen zu rechtfertigen.
- Akzeptanzkriterien:
    - KPI-Vergleichstabelle.
    - Entscheidungsnotiz hinterlegbar.
    - Verknüpfung zur Freigabeversion.

US-036 Vertriebsansicht: Risikoampel

- Titel: Ampellogik
- Beschreibung: Als Vertrieb möchte ich eine Ampel je Auftrag sehen, um Risiken schnell zu erfassen.
- Akzeptanzkriterien:
    - Grün: pünktlich; Gelb: Risiko > definierte Schwelle; Rot: verspätet.
    - Tooltips mit Grund (Kapazität/Material/Störung).
    - Kein Edit-Recht.

US-037 Onboarding-Hilfen

- Titel: Geführte Einführung
- Beschreibung: Als neuer Nutzer möchte ich geführte Touren, um Kernfunktionen zu verstehen.
- Akzeptanzkriterien:
    - Rollenbezogene Kurz-Tour.
    - De-/Aktivierbar pro Nutzer.
    - Link zur Kurzdokumentation.

US-038 Datenexporte

- Titel: Exporte für Analyse
- Beschreibung: Als Werksleitung möchte ich CSV-Exporte für KPIs und Planstände.
- Akzeptanzkriterien:
    - Filterbarer Export (Zeitraum, Maschine, Auftrag).
    - Versionstempel im Export.
    - Datenschutzkonform (keine sensiblen Personendaten).

US-039 Lokalisierung/Zeiten

- Titel: Zeitzonen/Format
- Beschreibung: Als Nutzer möchte ich korrekte Zeit-/Datumsformate gemäß Werkseinstellungen.
- Akzeptanzkriterien:
    - Werkweite Einstellung.
    - Anzeige konsistent auf Board/Listen.
    - Export respektiert Format.

US-040 Stabilität Nicht-Ziele

- Titel: Funktionsgrenzen MVP
- Beschreibung: Als Produktteam möchte ich klare Nicht-Ziele im MVP, um Fokus zu halten.
- Akzeptanzkriterien:
    - Kein vollautomatischer Black-Box-Optimierer.
    - Kein vollumfängliches MES.
    - Keine langfristige Absatzprognose.

US-041 Logging KI-Entscheidungen

- Titel: KI-Entscheidungslog
- Beschreibung: Als Auditor möchte ich KI-Scoring-Input/Output protokolliert sehen.
- Akzeptanzkriterien:
    - Inputfaktoren, Score, empfohlene Position.
    - Zeitstempel, Version des Modells.
    - Download pro Auftrag.

US-042 Planstabilitätsmetrik

- Titel: Änderungszählung
- Beschreibung: Als Werksleitung möchte ich Planstabilität messen, um Turbulenz zu reduzieren.
- Akzeptanzkriterien:
    - Kennzahl: Anzahl Planänderungen je Auftrag bis Freigabe.
    - Trend über Zeit.
    - Zielwerte konfigurierbar.

US-043 Wartungsfenster

- Titel: Geplante Instandhaltung
- Beschreibung: Als Produktionsplaner möchte ich Wartungsfenster im Board berücksichtigen.
- Akzeptanzkriterien:
    - Sperrzeiten pro Maschine.
    - Konfliktwarnung bei Überschneidung.
    - Alternative Vorschläge.

US-044 Rework/Schleifen

- Titel: Rework einplanen
- Beschreibung: Als Produktionsplaner möchte ich Rework-Schritte einplanen, wenn Qualitätsprobleme auftreten.
- Akzeptanzkriterien:
    - Rework-Operation verknüpft mit Ursprungsauftrag.
    - Prioritätsregel konfigurierbar.
    - KPI-Auswirkung sichtbar.

US-045 Datenschutz/Protokolle

- Titel: DSGVO-konforme Nutzung
- Beschreibung: Als Sicherheitsbeauftragter möchte ich Datenschutzvorgaben eingehalten sehen.
- Akzeptanzkriterien:
    - Rollenbasierter Zugriff auf personenbezogene Daten minimal.
    - Lösch-/Anonymisierungsprozesse für Nutzerdaten.
    - Protokoll der Einwilligungen (falls erforderlich).

US-046 Minimaler Predictive-Scope (MVP)

- Titel: Einfache Ausfallindikatoren
- Beschreibung: Als Produktionsplaner möchte ich einfache Ausfallindikatoren (historisch/IoT-light), um präventiv zu reagieren.
- Akzeptanzkriterien:
    - Manuelles Hinterlegen von Risikoflag je Maschine (Low/Mid/High).
    - Bei High fließt Penalty in KI-Score ein.
    - Hinweis zur Datenbasis-Qualität.

US-047 Deployment/Version

- Titel: Versionierte Freigabe
- Beschreibung: Als Systemadministrator möchte ich versionierte Planfreigaben, um Rollback zu ermöglichen.
- Akzeptanzkriterien:
    - Jede Freigabe hat Version/Kommentar.
    - Rollback mit Bestätigung.
    - Audit-Log erfasst Rollbacks.

US-048 Such-/Filterfunktionen

- Titel: Schnell finden
- Beschreibung: Als Nutzer möchte ich Aufträge/Operationen schnell finden und filtern.
- Akzeptanzkriterien:
    - Filter: Kunde, Terminfenster, Maschine, Status, Setup-Gruppe.
    - Volltextsuchen nach Auftragsnummer.
    - Persistente Filter pro Nutzer.

US-049 Board-Annotationen

- Titel: Notizen am Plan
- Beschreibung: Als Produktionsplaner möchte ich Notizen/Tags am Board hinterlassen.
- Akzeptanzkriterien:
    - Textnotizen je Operation/Maschine.
    - Tags konfigurierbar.
    - Sichtbarkeit rollenbasiert.

US-050 Zeitreisen-Ansicht

- Titel: Historische Planstände
- Beschreibung: Als Auditor möchte ich vergangene Planstände einsehen.
- Akzeptanzkriterien:
    - Snapshot pro Freigabe/Szenario.
    - Read-only Anzeige.
    - Vergleich zweier Stände.


### Final Checklist (intern)

- Alle Stories enthalten testbare, klare Akzeptanzkriterien.
- Authentifizierung/Autorisierung ist adressiert (US-001, US-002, US-032).
- Stories decken eine nutzbare MVP-Anwendung vollständig ab (Planboard, Kapazität, Sequenz, Material, KI-Assistenz, Freigabe/Dispatch, Status, KPIs).
- Edge-Cases und Fehlerfälle sind berücksichtigt (Import, Konflikte, Eilauftrag, Ausfall).


### Formatierungshinweise

- Markdown-Struktur gemäß Vorgabe umgesetzt.
- Keine Fettschrift verwendet.
- Eindeutige IDs und vollständige Auflistung der User Stories vorhanden.
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div style="text-align: center">⁂</div>

[^1]: https://productschool.com/blog/product-strategy/product-template-requirements-document-prd

[^2]: https://www.aha.io/roadmapping/guide/requirements-management/what-is-a-good-product-requirements-document-template

[^3]: https://www.simplexitypd.com/developing-a-product-requirements-document-gt/

[^4]: https://formlabs.com/blog/product-requirements-document-prd-with-template/

[^5]: https://www.figma.com/resource-library/product-requirements-document/

[^6]: https://templatearchive.com/product-requirements-document/

[^7]: https://www.jamasoftware.com/requirements-management-guide/writing-requirements/how-to-write-an-effective-product-requirements-document/

[^8]: https://www.atlassian.com/agile/product-management/requirements

[^9]: https://www.k15t.com/solutions/scroll-apps-for-confluence/pdf-template-library/projects/product-requirements-document-template

[^10]: https://www.reddit.com/r/ProductManagement/comments/r5q2iq/does_anyone_have_example_prds/

