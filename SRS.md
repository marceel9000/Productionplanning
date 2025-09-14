# You are a senior software architect tasked with creating a clear, detailed, and actionable Software Requirements Specification (SRS) based on the provided Product Requirements Document (PRD). Ensure your SRS maintains direct traceability to the PRD, clearly references requirements, and strictly utilizes the specified technology stack.

<prd_document>

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

[^1]: [https://productschool.com/blog/product-strategy/product-template-requirements-document-prd](https://productschool.com/blog/product-strategy/product-template-requirements-document-prd)

[^2]: [https://www.aha.io/roadmapping/guide/requirements-management/what-is-a-good-product-requirements-document-template](https://www.aha.io/roadmapping/guide/requirements-management/what-is-a-good-product-requirements-document-template)

[^3]: [https://www.simplexitypd.com/developing-a-product-requirements-document-gt/](https://www.simplexitypd.com/developing-a-product-requirements-document-gt/)

[^4]: [https://formlabs.com/blog/product-requirements-document-prd-with-template/](https://formlabs.com/blog/product-requirements-document-prd-with-template/)

[^5]: [https://www.figma.com/resource-library/product-requirements-document/](https://www.figma.com/resource-library/product-requirements-document/)

[^6]: [https://templatearchive.com/product-requirements-document/](https://templatearchive.com/product-requirements-document/)

[^7]: [https://www.jamasoftware.com/requirements-management-guide/writing-requirements/how-to-write-an-effective-product-requirements-document/](https://www.jamasoftware.com/requirements-management-guide/writing-requirements/how-to-write-an-effective-product-requirements-document/)

[^8]: [https://www.atlassian.com/agile/product-management/requirements](https://www.atlassian.com/agile/product-management/requirements)

[^9]: [https://www.k15t.com/solutions/scroll-apps-for-confluence/pdf-template-library/projects/product-requirements-document-template](https://www.k15t.com/solutions/scroll-apps-for-confluence/pdf-template-library/projects/product-requirements-document-template)

[^10]: [https://www.reddit.com/r/ProductManagement/comments/r5q2iq/does_anyone_have_example_prds/](https://www.reddit.com/r/ProductManagement/comments/r5q2iq/does_anyone_have_example_prds/)
</prd_document>
<tech_stack>

- Frontend: NextJS
- CSS: shadcn / TailwindCSS
- Database: Supabase (PostgreSQL)
</tech_stack>
<visual_guide>
Hier Design-Richtlinien, Corporate Identity etc. hinterlegen
</visual_guide>


## Steps to Create the SRS:

### 1. Review the PRD

- Clearly understand all functional and non-functional requirements outlined.
- Identify and note critical dependencies and constraints.


### 2. Document Structure

Structure your SRS according to the following outline:

# Software Requirements Specification (SRS)

## 1. Introduction

- Briefly describe the purpose, scope, and intended use of this SRS.
- Summarize the software’s core functionality based on the PRD.


## 2. Functional Requirements

Organize into clear subsections:

### 2.1 Core Features

- CRUD Operations (Create, Read, Update, Delete)
- Business Rules:
    - Validation rules
    - Calculation or transformation logic
    - Domain-specific constraints
- Workflow and Process Flows:
    - Detail multi-step processes
    - State transitions (if applicable)
- Data Management requirements


### 2.2 Authentication and Authorization

- Define clearly each user role (e.g., Admin, Registered User, Guest).
- Explicitly outline permissions for each role.
- Reference relevant PRD requirements directly (e.g., PRD-001).
- Provide specific acceptance criteria per role constraint (e.g., "Admin can create user accounts," "Guest can view but not modify content").
Each Functional Requirement should follow this structure:
- **ID**: FR-XXX
- **Title**: [Requirement Title]
- **Description**: [Clear description]
- **Rationale**: [Justification or reason for requirement]
- **Dependencies**: [Explicit PRD references]
- **Acceptance Criteria**: [Clear and testable]


## 3. Data Requirements

- Detail database schema requirements aligned with PRD (tables, fields, data types).
- Outline relationships, constraints, and validations clearly.
- Reference PRD IDs to maintain traceability.


## 4. System Interface Requirements

- Specify interfaces between frontend (NextJS) and backend (Supabase/PostgreSQL).
- Clearly document API endpoints, methods (GET, POST, etc.), and required parameters.
- Detail interactions and data exchanges with clarity.


## 5. Use Cases

- Provide comprehensive use cases for each primary feature:
- **ID**: UC-XXX
- **Title**: [Use Case Title]
- **Actor(s)**: [List actors]
- **Preconditions**: [Conditions before use case execution]
- **Main Flow**: [Step-by-step main flow]
- **Alternative Flows**: [Alternative paths, if applicable]
- **Postconditions**: [State of system after execution]


### 3. Requirements Traceability

- Explicitly cross-reference each SRS item back to the PRD requirements.
- Ensure every requirement from the PRD is covered and addressed.


### 4. Technical Constraints

- Strictly adhere to the defined tech stack (NextJS, shadcn/TailwindCSS, Supabase/PostgreSQL).
- Avoid using external APIs or dependencies unless explicitly mentioned in the PRD.


### 5. Formatting Guidelines

- Consistent numbering and clear Markdown formatting.
- Do not use bold markdown formatting (**).
- Clearly structure each section, subsection, and requirement.

Hier ist eine klare, detaillierte und umsetzbare SRS auf Basis des PRD, mit expliziter Traceability und strikter Einhaltung des Tech-Stacks NextJS, shadcn/TailwindCSS und Supabase/PostgreSQL.[^1]

# Software Requirements Specification (SRS)

## 1. Introduction

Zweck dieses Dokuments ist die formale Spezifikation aller funktionalen und nicht-funktionalen Anforderungen der MVP-Anwendung zur smarten Produktionsplanung, strukturiert nach etablierten IEEE‑SRS‑Leitlinien.[^1]
Der Umfang umfasst Kernfunktionen für Planung via Gantt‑Board, endliche Kapazität, Sequenzregeln, ERP‑Import, Materialprüfung, Planfreigabe/Dispatch sowie KI‑Assistenz mit Vorschlagssequenzierung, Re‑Optimierung und Explainability, unter Nutzung von NextJS im Frontend und Supabase/PostgreSQL im Backend.[^2][^1]
Das Dokument dient als Grundlage für Implementierung, Test, Abnahme und Betrieb, wobei jede SRS‑Anforderung auf konkrete PRD‑User‑Stories rückverweist.[^1]

## 2. Functional Requirements

### 2.1 Core Features

FR-001 Titel: Maschinen- und Linien-Stammdaten CRUD
Beschreibung: CRUD für Maschinen/Linien mit Typ, Kapazität, Schichtkalender und Wartungsfenstern.[^2]
Rationale: Endliche Kapazitätsplanung benötigt vollständige, valide Stammdaten.[^1]
Dependencies: PRD US-003.[^1]
Akzeptanzkriterien: Anlegen/Bearbeiten/Deaktivieren mit Validierung für eindeutige Namen, gültige Kalender und Sperren bei Referenzen.[^2]

FR-002 Titel: Setup-/Rüstgruppen CRUD
Beschreibung: Verwaltung von Setup‑Gruppen inkl. Attributen (Farbe, Substrat, Bahnbreite) und Sequenz‑Rüstzeitmatrix.[^1]
Rationale: Reduktion von Rüstzeiten durch Bündelung und korrekte Dauerberechnung.[^1]
Dependencies: PRD US-004, US-011, US-034.[^1]
Akzeptanzkriterien: CSV/JSON‑Import/Export, konsistente Attributzuordnung und Matrixvalidierung.[^2]

FR-003 Titel: ERP-Import Digitale Mappe
Beschreibung: Import von Aufträgen aus ERP in eine digitale Mappe mit Pflicht-/Optionalfeldern und Validierungsreport.[^2]
Rationale: Vermeidung von Medienbrüchen und Sicherstellung vollständiger Planungsdaten.[^1]
Dependencies: PRD US-005, US-023, US-026.[^1]
Akzeptanzkriterien: Deduplizierung per Schlüssel, Teilimporte mit Fehlerprotokoll, Pflichtfeldprüfung.[^2]

FR-004 Titel: AV-Anreicherung
Beschreibung: AV ergänzt produktspezifische Parameter mit Sperren gegen gleichzeitige Bearbeitung und Änderungsverlauf.[^1]
Rationale: Vollständigkeit vor Übergabe an die Planung.[^1]
Dependencies: PRD US-006.[^1]
Akzeptanzkriterien: Pflichtfeld-Gate, Historie mit Zeitstempel/Nutzer, Locking.[^1]

FR-005 Titel: Visuelles Gantt-Board
Beschreibung: Interaktives Planboard mit Tages-/Wochenraster, Maschinenzeilen, Drag‑and‑drop und Tooltips.[^1]
Rationale: Transparenz und schnelle Planinteraktion.[^1]
Dependencies: PRD US-007.[^1]
Akzeptanzkriterien: Zoom, ruckfreie Drag‑and‑drop‑Interaktion und konfigurierbare Spaltenbreiten.[^1]

FR-006 Titel: Endliche Kapazität und Warnungen
Beschreibung: Kapazitätsprüfung mit Farbkennzeichnung, Schicht-/Kalenderbezug und Terminierungslogik vor-/rückwärts.[^1]
Rationale: Realistische Pläne und frühzeitige Engpasssicht.[^1]
Dependencies: PRD US-008, US-009.[^1]
Akzeptanzkriterien: Warnstufen Unter-/Überlast, Tardy‑Anzeige und Scheduler‑Regeln je Ressource.[^1]

FR-007 Titel: Sequenzregeln Prozesskette
Beschreibung: Erzwingung Druck → Stanzen → Kleben mit Abhängigkeitsvisualisierung und begründetem Override.[^1]
Rationale: Fehlerprävention und korrekte Reihenfolge.[^1]
Dependencies: PRD US-010.[^1]
Akzeptanzkriterien: Blocker bei verbotener Sequenz, Link‑Darstellung und Konsistenzupdates.[^1]

FR-008 Titel: Setup-Bündelung
Beschreibung: Optionale Sortierung nach Setup‑Gruppen mit Anzeige geschätzter Rüstzeiteinsparung.[^1]
Rationale: Rüstzeitminimierung und Planstabilität.[^1]
Dependencies: PRD US-011.[^1]
Akzeptanzkriterien: Aktivierbare Regel pro Maschine, KPI‑Ausweis pro Bündel.[^1]

FR-009 Titel: Material-Ready-Check
Beschreibung: Materialstatusprüfung und Alternativslot‑Vorschlag bei verspäteter Bereitstellung.[^1]
Rationale: Vermeidung unrealistischer Pläne und Terminrisiken.[^1]
Dependencies: PRD US-012, US-033.[^1]
Akzeptanzkriterien: Statusflags, Warnungen und ETA‑Abgleich mit Schwellenwerten.[^1]

FR-010 Titel: KI-Vorschlagssequenzierung
Beschreibung: KI‑gestützte Priorisierung mit Score pro Operation, Annahme/Verwerfen, Board‑Update.[^3]
Rationale: Reduktion von Tardiness und Rüstwechseln mit Assistenz statt Black‑Box.[^1]
Dependencies: PRD US-013, US-031, US-041.[^1]
Akzeptanzkriterien: Ein-/Ausblendung, Score sichtbar, Änderungsprotokoll pro Entscheidung.[^3]

FR-011 Titel: Explainability-Panel
Beschreibung: Anzeige Termin‑Impact, Rüst‑Ersparnis, Auslastungsänderung und berücksichtigte Constraints pro Vorschlag.[^1]
Rationale: Akzeptanz und Nachvollziehbarkeit der KI.[^1]
Dependencies: PRD US-014, US-041.[^1]
Akzeptanzkriterien: Exportierbare Begründung und Policy‑konforme Protokollierung.[^4]

FR-012 Titel: Echtzeit-Re-Optimierung
Beschreibung: Ereignisgetriggerte Neuplanung bei Störung, Eilauftrag, Materialverzug mit Delta‑Diff.[^1]
Rationale: Schnelle Reaktion und Planstabilität.[^1]
Dependencies: PRD US-015, US-028, US-029.[^1]
Akzeptanzkriterien: Rechenzeit < 10 s bei 200 Ops, Vorher/Nachher‑Ansicht.[^1]

FR-013 Titel: Druckspezifische Heuristiken
Beschreibung: Konfigurierbare Gewichte für Farb-/Substrat-/Bahnbreiten‑Cluster und KPI‑Ausweis Makulaturreduktion.[^1]
Rationale: Branchenspezifische Effizienz.[^1]
Dependencies: PRD US-016, US-034.[^1]
Akzeptanzkriterien: Cluster‑Visualisierung und Gewichtsverwaltung.[^1]

FR-014 Titel: Szenarien und Vergleich
Beschreibung: What‑if‑Simulation mit KPI‑Vergleich und Markierung „Bestes Szenario“.[^1]
Rationale: Risikofreie Evaluierung vor Freigabe.[^1]
Dependencies: PRD US-017, US-035.[^1]
Akzeptanzkriterien: Bis zu 3 Szenarien, KPI‑Tabelle und Entscheidungsnotiz.[^1]

FR-015 Titel: Planfreigabe und Dispatch
Beschreibung: Versionierte Freigabe, Sperren, Dispatch‑Listen pro Maschine/Schicht.[^2]
Rationale: Prozesssicherheit und Ausführungstransparenz.[^1]
Dependencies: PRD US-018, US-047.[^1]
Akzeptanzkriterien: Version/Kommentar, Rollback‑Option und Export.[^2]

FR-016 Titel: Shopfloor-Rückmeldung
Beschreibung: Start/Ende/Rüst/Unterbrechung je Operation mit Offline‑Pufferung.[^1]
Rationale: Statusaktualität und Feedback‑Loop.[^1]
Dependencies: PRD US-019.[^1]
Akzeptanzkriterien: Minimaldialog, Synchronisierung und Konfliktauflösung.[^1]

FR-017 Titel: Alerts und Benachrichtigungen
Beschreibung: Rollenbasierte Alerts für Termin, Material, Kapazität, Störung mit Ereignisprotokoll.[^1]
Rationale: Proaktive Steuerung.[^1]
Dependencies: PRD US-020.[^1]
Akzeptanzkriterien: Abo, Stummschaltung, Protokollfilter.[^1]

FR-018 Titel: KPI-Dashboard
Beschreibung: OTD, Tardy‑Minuten, Auslastung, Planstabilität mit Drill‑down und CSV‑Export.[^2]
Rationale: Steuerungsfähigkeit für Werksleitung.[^1]
Dependencies: PRD US-021, US-038, US-042.[^1]
Akzeptanzkriterien: Zeitraumfilter, Drill‑down, Export.[^2]

FR-019 Titel: Vertriebsstatus
Beschreibung: Lesende Sicht auf Auftragsstatus, Termine und Risikoampel ohne Edit‑Recht.[^1]
Rationale: Verlässliche Kundenauskünfte.[^1]
Dependencies: PRD US-022, US-036.[^1]
Akzeptanzkriterien: Ampellogik mit Gründen und Prognosefenster.[^1]

FR-020 Titel: Datenvalidierung
Beschreibung: Pflichtfelder, Wertebereiche, Referenzen und Sammelreport inkl. Massenkorrektur.[^1]
Rationale: Datenqualität und Stabilität.[^1]
Dependencies: PRD US-023.[^1]
Akzeptanzkriterien: Blocker bei harten Verstößen, Report‑Export.[^2]

FR-021 Titel: Audit-Logs
Beschreibung: Wer/Was/Wann Vorher/Nachher mit Filtern und CSV‑Export.[^2]
Rationale: Compliance und Nachvollziehbarkeit.[^1]
Dependencies: PRD US-024, US-041, US-047, US-050.[^1]
Akzeptanzkriterien: Lückenlose Protokolle und revisionssichere Speicherung.[^2]

FR-022 Titel: Performance-Ziele
Beschreibung: Ladezeiten Board <3 s bei 100 Maschinen/1.000 Ops, DnD <150 ms, Re‑Opt <10 s/200 Ops.[^1]
Rationale: Bedienbarkeit im Tagesgeschäft.[^1]
Dependencies: PRD US-025.[^1]
Akzeptanzkriterien: Metrikmessung und Budgetierung in Tests.[^1]

FR-023 Titel: Konflikterkennung
Beschreibung: Overlap, Kapazitätsverletzung, Materialmangel mit Overlay und Behebungsvorschlägen.[^1]
Rationale: Schnellere Korrekturen.[^1]
Dependencies: PRD US-027.[^1]
Akzeptanzkriterien: Blocker vs Hinweis, Direktnavigation.[^1]

FR-024 Titel: Eilauftrag-Handling
Beschreibung: Priorisiertes Einplanen mit minimalinvasiven Umschichtungen und Impact‑Anzeige.[^1]
Rationale: Reaktionsfähigkeit auf Hot‑Jobs.[^1]
Dependencies: PRD US-028.[^1]
Akzeptanzkriterien: Flag hebt Score, Betroffene sichtbar.[^1]

FR-025 Titel: Maschinenausfall
Beschreibung: Sofortiger Lock, Alternativenliste, Re‑Optimierung mit Impact.[^1]
Rationale: Störungsmanagement.[^1]
Dependencies: PRD US-029.[^1]
Akzeptanzkriterien: Triggerbasiert, Vorschläge regelkonform.[^1]

FR-026 Titel: Auftragsänderungen/Storno
Beschreibung: Versionierte Änderungen, Konflikt‑Recheck, Planerbestätigung.[^1]
Rationale: Konsistenz bei Änderungen.[^1]
Dependencies: PRD US-030.[^1]
Akzeptanzkriterien: Automatische Prüfungen und Freigabe‑Gate.[^1]

FR-027 Titel: Human-in-the-Loop Override
Beschreibung: Manuelle Übersteuerung mit Begründung und optionalem Lernsignal.[^1]
Rationale: Fachwissen integrieren, Black‑Box vermeiden.[^1]
Dependencies: PRD US-031.[^1]
Akzeptanzkriterien: Pflichtbegründung, Kennzeichnung im Board.[^1]

FR-028 Titel: Sessions/Logs Sicherheit
Beschreibung: Konfigurierbares Timeout, Geräte-/IP‑Protokoll, Sofort‑Logout.[^3]
Rationale: Minimierung Sicherheitsrisiken.[^5]
Dependencies: PRD US-032.[^1]
Akzeptanzkriterien: Policy‑konform und testbar.[^5]

FR-029 Titel: Minimaler Predictive‑Scope
Beschreibung: Manuelle Risikoflags je Maschine, Penalty im KI‑Score, Hinweis zur Datenqualität.[^6]
Rationale: Pragmatische Prognose im MVP.[^1]
Dependencies: PRD US-046.[^1]
Akzeptanzkriterien: Gewichtung im Score und UI‑Hinweis.[^6]

FR-030 Titel: Suche/Filter
Beschreibung: Filter nach Kunde, Terminfenster, Maschine, Status, Setup‑Gruppe; Volltext Auftragsnummer.[^2]
Rationale: Navigation in großen Plänen.[^1]
Dependencies: PRD US-048.[^1]
Akzeptanzkriterien: Persistenz pro Nutzer, performante Queries.[^2]

FR-031 Titel: Board-Annotationen
Beschreibung: Textnotizen/Tags je Operation/Maschine mit rollenbasierter Sichtbarkeit.[^1]
Rationale: Kontext im Plan.[^1]
Dependencies: PRD US-049.[^1]
Akzeptanzkriterien: Änderungsprotokoll, Export in Planversion.[^2]

FR-032 Titel: Zeitreisen-Ansicht
Beschreibung: Read‑only vergangene Planstände und Vergleich zweier Stände.[^1]
Rationale: Audits und Ursachenanalyse.[^1]
Dependencies: PRD US-050.[^1]
Akzeptanzkriterien: Snapshot pro Freigabe/Szenario und Diff‑Ansicht.[^1]

### 2.2 Authentication and Authorization

FR-033 Titel: Authentifizierung
Beschreibung: E‑Mail/Passwort‑Login mit optionaler MFA, Fehlermeldungen ohne sensitive Details, Timeout.[^3]
Rationale: Sichere Identifikation von Nutzern.[^5]
Dependencies: PRD US-001.[^1]
Akzeptanzkriterien: MFA aktivierbar, 30‑Min‑Default Timeout, Sperre nach Fehlversuchen.[^3]

FR-034 Titel: Autorisierung und RLS
Beschreibung: Rollenbasierte Rechte durch Supabase Auth und Postgres Row Level Security (RLS) Policies.[^4]
Rationale: Durchgängiger Schutz bis auf Zeilenebene im Browser‑zugänglichen Datenzugriff.[^5]
Dependencies: PRD US-002, US-032, US-045.[^1]
Akzeptanzkriterien: RLS auf allen exponierten Tabellen aktiv, Policies je Rolle und Operation, verifizierte Server‑Routen für Admin‑Operationen.[^4][^6]

FR-035 Titel: Audit und Compliance
Beschreibung: Rollenänderungen, Logins und Freigaben werden revisionssicher protokolliert.[^5]
Rationale: Nachweis- und Prüfpflichten.[^1]
Dependencies: PRD US-024, US-045.[^1]
Akzeptanzkriterien: Vollständige, exportierbare Audit‑Trails.[^2]

## 3. Data Requirements

Tabellenübersicht mit Feldern, Typen und Constraints, ausgerichtet auf Supabase/PostgreSQL und RLS.[^4][^2]

- users: id (uuid, pk), email (text, unique), role (enum), created_at (timestamptz).[^2]
- roles: name (pk), permissions (jsonb).[^2]
- machines: id (uuid, pk), name (text unique), type (enum: gravure, offset, diecut, gluing), calendar_id (uuid fk), capacity_unit (text), active (bool), maintenance_windows (tstzrange[]).[^2]
- calendars: id (uuid, pk), shifts (jsonb), timezone (text).[^2]
- setup_groups: id (uuid, pk), name (text), attributes (jsonb), change_matrix (jsonb).[^2]
- orders: id (uuid, pk), erp_no (text unique), customer (text), due_date (date), quantity (int), article (text), process_chain (text[]), priority (int), status (enum).[^2]
- operations: id (uuid, pk), order_id (uuid fk), machine_id (uuid fk), start (timestamptz), end (timestamptz), duration_min (int), setup_group_id (uuid fk), deps (uuid[]), state (enum), ai_score (numeric), ai_explain (jsonb).[^2]
- materials: id (uuid, pk), article (text), lot (text), eta (timestamptz), qty (numeric).[^2]
- material_status: id (uuid, pk), operation_id (uuid fk), status (enum: ready, pending, critical), note (text).[^2]
- scenarios: id (uuid, pk), name (text), snapshot_at (timestamptz), kpis (jsonb).[^2]
- plans: id (uuid, pk), name (text), version (int), status (enum), comment (text).[^2]
- plan_operations: plan_id (uuid fk), operation_id (uuid fk), seq_index (int), locked (bool).[^2]
- dispatches: id (uuid, pk), machine_id (uuid fk), shift_date (date), items (jsonb).[^2]
- events: id (uuid, pk), type (enum: breakdown, rush, material_delay), payload (jsonb), created_at (timestamptz).[^2]
- alerts: id (uuid, pk), category (enum), severity (enum), entity_ref (jsonb), acknowledged_by (uuid fk), created_at (timestamptz).[^2]
- kpi_metrics: id (uuid, pk), name (text), value (numeric), period (daterange), breakdown (jsonb).[^2]
- audit_logs: id (uuid, pk), actor (uuid fk), action (text), entity (text), before (jsonb), after (jsonb), ts (timestamptz).[^2]
RLS: Enable RLS auf allen Tabellen im öffentlichen Schema, Policies pro Rolle mit auth.uid() und ggf. Security‑Definer‑RPCs für Admin‑Aktionen.[^4][^5]


## 4. System Interface Requirements

Frontend kommuniziert über Supabase JavaScript Client mit PostgREST‑Endpoints und Realtime Channels, ergänzt um serverseitige NextJS Actions/Routes für privilegierte Vorgänge.[^3][^2]
REST Endpoints (PostgREST Namenskonventionen):[^2]

- GET /rest/v1/orders?select=...\&erp_no=eq.<no> für Auftragsabfragen.[^2]
- POST /rest/v1/orders für ERP‑Import‑Upserts mit Prefer: resolution=merge-duplicates.[^2]
- PATCH /rest/v1/operations?id=eq.<id> für Planungsupdates und Statuswechsel.[^2]
- POST /rest/v1/rpc/reoptimize_plan für serverseitige Re‑Optimierung mit Security‑Definer.[^2]
- GET /rest/v1/dispatches?machine_id=eq.<id>\&shift_date=eq.<date> für Shopfloor‑Listen.[^2]
Realtime: Abos auf changes in operations, alerts, events für Live‑Aktualisierung des Boards.[^2]
Auth: Supabase Auth im Browser und Server‑Actions für sensible Operationen, RLS Policies sichern Datenzugriffe.[^5][^3]


## 5. Use Cases

UC-001 Titel: Login
Akteure: Nutzer beliebiger Rolle.[^3]
Preconditions: Konto existiert, ggf. MFA aktiviert.[^3]
Main Flow: Nutzer gibt Credentials ein, Server validiert, Session erstellt, Rolle lädt erlaubte Features.[^3]
Alternative Flows: Falsche Credentials → generische Fehlermeldung; Timeout → Re‑Login erforderlich.[^3]
Postconditions: Authentifizierte Session mit Rollenansicht aktiv.[^3]

UC-002 Titel: ERP-Import Mappe
Akteure: AV, Systemadministrator.[^2]
Preconditions: ERP‑Datei/Feed verfügbar, Mapping konfiguriert.[^2]
Main Flow: Upload/Fetch, Validierung, Upsert in orders, Report bei Optionalfeldern.[^2]
Alternative Flows: Teilimport bei Fehlern; Deduplizierung greift.[^2]
Postconditions: Aufträge als digitale Mappen verfügbar.[^2]

UC-003 Titel: Planung im Gantt
Akteure: Produktionsplaner.[^1]
Preconditions: Stammdaten vollständig, AV‑Mappe freigegeben.[^1]
Main Flow: Drag‑and‑drop von Operations, Kapazitätswarnungen, Sequenzregeln, Materialcheck.[^1]
Alternative Flows: Override mit Begründung, Konflikt‑Overlay, Szenario statt Live‑Plan.[^1]
Postconditions: Konsistenter Entwurf oder Szenario gespeichert.[^1]

UC-004 Titel: KI‑Vorschlagssequenzierung
Akteure: Produktionsplaner.[^3]
Preconditions: Ops liegen unsortiert vor, Setup‑Gruppen gepflegt.[^1]
Main Flow: Vorschlagsmodus aktivieren, Scores prüfen, Explainability sichten, Vorschläge annehmen.[^3]
Alternative Flows: Vorschläge verwerfen, Override setzen, Lernsignal optional senden.[^6]
Postconditions: Sequenz aktualisiert, Begründungen protokolliert.[^4]

UC-005 Titel: Re‑Optimierung bei Störung
Akteure: Produktionsplaner.[^1]
Preconditions: Event breakdown/rush/material_delay erfasst.[^2]
Main Flow: Re‑Opt aufrufen, Berechnung <10 s, Delta‑Diff prüfen, Freigabe oder zurück.[^1]
Alternative Flows: Szenariovergleich vor Freigabe, Teilreoptimierung nur auf betroffener Maschine.[^1]
Postconditions: Planversion erhöht und dispatchfähig.[^2]

UC-006 Titel: Planfreigabe/Dispatch
Akteure: Produktionsplaner, Schichtleiter.[^2]
Preconditions: Entwurf geprüft oder Szenario als bestes markiert.[^1]
Main Flow: Freigeben, Sperren, Dispatch je Maschine/Schicht generieren.[^2]
Alternative Flows: Rollback der Freigabe mit Kommentar.[^2]
Postconditions: Shopfloor verfügt über aktuelle Listen.[^2]

### 3. Requirements Traceability

Jede FR verweist in Dependencies auf PRD‑US‑IDs, wodurch lückenlose Rückverfolgbarkeit von PRD zu SRS gewährleistet ist.[^1]
Beispiele: FR‑010 ↔ US‑013/US‑031/US‑041, FR‑012 ↔ US‑015/US‑028/US‑029, FR‑015/FR‑021/FR‑032 ↔ US‑018/US‑047/US‑050.[^1]

### 4. Technical Constraints

Frontend zwingend NextJS mit server actions/routes für sichere Vorgänge und Client‑Seiten für Gantt‑Interaktionen.[^3]
UI auf shadcn/TailwindCSS basierend, ohne externe UI‑Frameworks jenseits der Vorgabe.[^3]
Datenhaltung in Supabase PostgreSQL mit PostgREST, Realtime und Auth, ausnahmslos mit aktivem RLS und Policies.[^4][^2]
RLS‑Best‑Practices: Wrap unveränderliche Werte wie auth.uid() in Subselects, batched RLS‑Funktionen, Admin‑Modus über Security‑Definer‑RPCs für Mutationen mit zentraler Prüfung.[^7][^6]
Keine externen APIs oder Bibliotheken außerhalb des Stacks, es sei denn später explizit ergänzt.[^1]

### 5. Formatting Guidelines

Dokument folgt einer IEEE‑konformen SRS‑Gliederung mit konsistenter Nummerierung und Markdown‑Struktur.[^1]
Keine Fettschrift verwendet, alle Anforderungen eindeutig identifizierbar und testbar formuliert.[^1]
Akzeptanzkriterien sind pro FR klar, spezifisch und verifizierbar definiert.[^1]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^8][^9]</span>

<div style="text-align: center">⁂</div>

[^1]: https://seng.cankaya.edu.tr/wp-content/uploads/sites/53/2024/09/IEEE-SRS-830-1998.pdf

[^2]: https://supabase.com/docs/guides/api

[^3]: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs

[^4]: https://supabase.com/docs/guides/database/postgres/row-level-security

[^5]: https://supabase.com/docs/guides/api/securing-your-api

[^6]: https://catjam.fi/articles/next-supabase-what-do-differently

[^7]: https://maxlynch.com/2023/11/04/tips-for-row-level-security-rls-in-postgres-and-supabase/

[^8]: https://www.utdallas.edu/~chung/RE/Presentations06F/Team_1.doc

[^9]: https://github.com/jam01/SRS-Template

[^10]: https://dspmuranchi.ac.in/pdf/Blog/srs_template-ieee.pdf

[^11]: http://nicsi.com/pbd/files/NICSI-PBD-SRS Template 830-1998 -13082019-V1.0.pdf

[^12]: https://docs.google.com/document/d/1mbBZ9oEcBwKDFcT5tvFbaKDshp_a4yG0-w8n1TIrK6s/

[^13]: https://www.getgalaxy.io/learn/glossary/implementing-row-based-permissions-in-supabase-postgres

[^14]: https://wildart.github.io/MISG5020/SRS.html

[^15]: https://dev.to/brianmmdev/an-introduction-to-postgres-row-level-security-rls-306k

[^16]: https://www.reddit.com/r/nextjs/comments/1hwd49d/the_best_way_to_use_supabase_with_vercel_nextjs/

[^17]: https://www.reddit.com/r/Supabase/comments/1c3xmgl/do_i_still_need_row_level_security/

[^18]: https://blog.logrocket.com/build-full-stack-app-next-js-supabase/

[^19]: https://forum.cursor.com/t/best-practices-for-structuring-a-next-js-fastapi-supabase-project/49706

[^20]: https://dev.to/sureshramani/build-a-powerful-crud-app-with-supabase-and-nextjs-full-guide-3a6p

