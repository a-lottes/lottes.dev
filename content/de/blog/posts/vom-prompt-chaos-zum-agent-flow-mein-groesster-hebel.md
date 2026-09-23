---
title: Vom Prompt-Chaos zum Agent-Flow mein größter Hebel beim Bau dieser App
description: Warum ich von manueller Prompt-Jonglage zu agentischen End-to-End-Workflows gewechselt bin und dadurch deutlich effizienter arbeite.
date: 2026-03-26
draft: false
translationKey: from-prompt-chaos-to-agent-flow
tags:
  - agenten
  - workflow
  - ki-applikationen
  - best-practices
---
Ausgangspunkt dieses Projekts war ein klassischer, manuell orchestrierter LLM-Workflow: Prompt formulieren, Antwort extrahieren, in ein weiteres Modell überführen, dort weiter verarbeiten und anschließend die Teilergebnisse konsolidieren. Dieser Ansatz ist funktional, erzeugt jedoch einen hohen Anteil nicht-wertschöpfender Arbeit in Form von Kontextwechseln, Copy-Paste-Operationen und inkonsistenten Zwischenständen.

Der zentrale Hebel lag daher nicht in weiterer Prompt-Optimierung, sondern in einer Veränderung der Prozessarchitektur: dem Übergang zu agentischen Workflows, die Planung, Modellselektion und Ergebnisintegration innerhalb eines durchgängigen Ausführungszyklus übernehmen.

## Erkenntnisinteresse und Validierung

Die leitende These lautet: Produktivitätsgewinne in Multi-LLM-Setups entstehen primär durch reduzierte Orchestrierungskosten, nicht ausschließlich durch bessere Einzelprompts. Diese These ist aus meiner Projekterfahrung konsistent beobachtbar und mit dem aktuellen Diskurs zu agentischer KI vereinbar.

Fachlich tragfähig sind insbesondere folgende Punkte:

- Manuelles Multi-Prompting erzeugt Reibung durch Kontextwechsel.
- Agentische Workflows reduzieren Koordinationsaufwand.
- Der Produktivitätsgewinn entsteht oft im Prozess, nicht im Einzelprompt.
- Multi-LLM-Setups werden dann wirksam, wenn Orchestrierung übernommen wird.

Der Beitrag bleibt bewusst qualitativ. Auf pauschale Prozentangaben verzichte ich, solange keine belastbare Vergleichsmessung mit definierter Methodik vorliegt.

## Ausgangsprozess: Manuelle Multi-LLM-Orchestrierung

Ein typischer Implementierungszyklus bestand aus den folgenden Schritten:

1. Problem in Modell A analysieren lassen.
2. Lösung in Modell B gegenchecken.
3. Code in Modell C erzeugen lassen.
4. Alles manuell zusammenführen.
5. Fehler korrigieren und Iteration wiederholen.

Dieser Ablauf war zwar prinzipiell wirksam, jedoch mit systematischer Friktion verbunden: Jeder Modellwechsel implizierte Re-Kontextualisierung, Medienbruch und erhöhtes Fehlerrisiko bei der Zusammenführung.

## Zielprozess: Agentischer End-to-End-Flow

Im agentischen Modus ist die Sequenz strukturell vereinfacht:

1. Ziel und Grenzen definieren.
2. Agent zerlegt die Aufgabe in Schritte.
3. Agent wählt pro Schritt das passende LLM-System.
4. Agent führt Teilergebnisse zusammen.
5. Ich reviewe Ergebnisqualität statt Rohmaterial.

Der entscheidende Unterschied besteht in der Verlagerung der Orchestrierungslogik: Die Koordination liegt nicht mehr primär beim Entwickler, sondern im Workflow selbst.

## Wirkmechanismus des Zeitgewinns

Der beobachtete Effizienzgewinn resultiert weniger aus isolierter Modellgeschwindigkeit, sondern aus einer Reduktion prozessualer Reibung:

- weniger manuelles Kopieren zwischen Modellen,
- weniger erneutes Erklären von Kontext,
- weniger Medienbrüche zwischen Tools,
- weniger Fehler durch inkonsistente Zwischenstände.

In Summe sinkt die Durchlaufzeit bei stabiler Ergebnisqualität, da Koordinationsaufwand durch Automatisierung substituiert wird.

## Robustes Architektur-Muster im Projekt

Als besonders robust erwies sich ein rollenbasiertes Multi-LLM-Muster ohne manuellen Systemwechsel:

- System A für Strukturierung,
- System B für Code-Transformation,
- System C für Kritik, Tests und Edge Cases.

Der Agent orchestriert diese Spezialisierungen innerhalb eines konsistenten Kontrollflusses. Der wesentliche Nutzen entsteht an den Übergabepunkten, an denen zuvor der größte Abstimmungsaufwand lag.

## Implikationen für die Praxis

- Der dominante Hebel liegt in der Prozessgestaltung, nicht in isolierter Prompt-Feinoptimierung.
- Leistungsfähige Agenten sind weniger als Einzelprompt zu verstehen, sondern als kontrollierter Ablauf mit expliziten Quality Gates.
- Multi-LLM-Architekturen entfalten ihren Nutzen erst bei automatisierter Übergabe zwischen spezialisierten Systemen.
- Relevante Produktivitätsgewinne entstehen dort, wo Abstimmungs- und Kontextkosten systematisch reduziert werden.

## Fazit

Das zentrale Ergebnis dieser App-Entwicklung ist eindeutig: Agentische Workflows sind im konkreten Projektkontext produktiver als manuelles Multi-Prompting mit Copy-Paste-basierter Koordination.

Nicht, weil einzelne Modelle grundsätzlich besser geworden wären, sondern weil ihre komplementären Stärken in einem stabilen Ausführungsprozess orchestriert werden.

In einer kompakten Formel:

Weniger Prompt-Jonglage, mehr durchgängiger Agent-Flow.
