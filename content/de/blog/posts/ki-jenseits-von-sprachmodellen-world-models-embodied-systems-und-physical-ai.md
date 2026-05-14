---
title: KI jenseits von Sprachmodellen: World Models, Embodied Systems und Physical AI
description: Eine praxisnahe Kategorisierung moderner KI-Systeme jenseits von LLMs, von Wahrnehmung und Simulation bis zu Handlungen in der physischen Welt.
date: 2026-05-14
draft: true
translationKey: ai-beyond-language-models-physical-ai-and-world-models
tags:
  - ki-modelle
  - world-models
  - physical-ai
  - embodied-ai
---
## Abstract

Wer KI noch immer mit "Chatbot" gleichsetzt, greift zu kurz.

Der Schwerpunkt verlagert sich von reinen Sprachsystemen hin zu integrierten Architekturen, die wahrnehmen, simulieren, entscheiden und handeln. Dieser Beitrag ordnet diese Entwicklung mit einer praktischen Taxonomie ein und fokussiert auf World Models, Embodied AI und Physical AI.

## Warum Das Wichtig Ist

Im Alltag wird "KI" oft als Sammelbegriff verwendet, obwohl sehr unterschiedliche Systeme gemeint sind.

"Wir nutzen KI" kann in der Praxis bedeuten:

- Textgenerierung,
- Bild- und Videoverstehen,
- Umgebungs- und Prozesssimulation,
- autonome Entscheidungen und Handlungen im realen Umfeld.

Diese Unterschiede sind nicht nur begrifflich. Sie haben direkte Folgen fuer Datenbasis, Sicherheitsanforderungen, Evaluation und Betrieb.

Darum ist eine saubere Taxonomie kein akademischer Luxus, sondern eine praktische Voraussetzung fuer Strategie, Teamaufbau, Toolauswahl und Risikosteuerung.

## Eine Praktische Taxonomie Von KI Jenseits Von LLMs

### 1. Sprachzentrierte Foundation Models

Diese Modelle verarbeiten und erzeugen Sprache, haeufig auch Code. Sie eignen sich besonders fuer Kommunikation, Entwurf, Zusammenfassung, retrieval-gestuetztes Arbeiten und interface-nahe Interaktion.

Staerken:

- breite Wissensbasis,
- natuerliche Interaktion fuer Menschen,
- hohe Anpassungsfaehigkeit in Zero-Shot- und Few-Shot-Szenarien.

Grenze:

- kaum physische Verankerung, wenn sie nicht mit Wahrnehmung, Tools, Simulatoren oder Robotik kombiniert werden.

### 2. Wahrnehmungsmodelle (Vision, Audio, Sensorik)

Diese Systeme uebersetzen rohe Signale in strukturierte Information:

- Objekterkennung,
- Segmentierung,
- Tracking,
- Szenenverstaendnis,
- Sprach- und Akustikerkennung,
- multimodale Fusion.

Kernfrage: "Was passiert gerade?"

Wahrnehmung ist die Grundlage fuer jedes verkoerperte oder physische System. Wenn sie nicht robust ist, bleibt auch die nachgelagerte Planung instabil.

### 3. World Models Und Simulationsmodelle

World Models lernen praediktive Dynamik und schaetzen, wie sich ein Umfeld unter bestimmten Aktionen weiterentwickelt.

Kernfrage: "Was passiert wahrscheinlich als Naechstes, wenn ich so handle?"

Zwei wichtige Untertypen:

- latente Umgebungsmodelle fuer Policy-Lernen (klassische RL-World-Models),
- grosse generative Weltsimulatoren auf Basis von Video- und Interaktionsdaten.

Nutzen:

- sichereres Training in Simulation,
- schnellere Iteration von Policies,
- kontrafaktisches Testen,
- bessere Planung unter Unsicherheit.

Wichtige Einschraenkung:

- visuelle Plausibilitaet ist kein Beweis fuer physikalische Korrektheit.

### 4. Agentische Und Entscheidungsmodelle

Diese Systeme uebersetzen Ziele in konkrete Aktionsfolgen:

- Planung,
- Tool-Nutzung,
- Policy-Optimierung,
- mehrstufige Koordination.

Kernfrage: "Welche Aktion bringt mich jetzt am besten zum Ziel?"

Diese Ebene kann rein digital sein (Software-Agenten) oder verkoerpert auftreten (Roboter, Fahrzeuge, intelligente Umgebungen).

### 5. Embodied AI Und Vision-Language-Action-Systeme

Embodied AI verknuepft Wahrnehmung und Entscheidung mit Handlung in einer Umgebung, simuliert oder physisch.

Viele aktuelle Systeme folgen einem Vision-Language-Action-Muster:

- Inputs aus Vision und Sprache,
- Outputs als Aktionen (Tokens, Controls, Trajektorien).

Kernfrage: "Kann das System Anweisungen verstehen und im Kontext umsetzen?"

Hier zeigt sich der Unterschied zwischen Demo und Praxis: partielle Beobachtbarkeit, lange Handlungsketten und harte Echtzeitgrenzen.

### 6. Physical AI

Physical AI markiert die Deployment-Front: Systeme, die in der realen Welt wahrnehmen, schlussfolgern und handeln.

Typische Beispiele:

- autonome mobile Roboter,
- Manipulationssysteme,
- Humanoide,
- autonome Fahrzeuge,
- intelligente Industrie- und Logistikraeume.

Typische Bausteine:

- Wahrnehmungsmodelle,
- World Models oder Simulatoren,
- Planungs- und Policy-Ebenen,
- hardware-nahes Laufzeit- und Kontrollsystem.

Dazu kommen drei harte Rahmenbedingungen:

- sicherheitskritische Interaktion,
- Embodiment-Constraints (Latenz, Aktuation, Energie),
- Sim-to-Real-Transfer als zentrales Problem.

## Beziehung Zwischen Den Kategorien

Ein haeufiger Denkfehler ist, diese Kategorien gegeneinander auszuspielen. In der Praxis greifen sie ineinander.

Ein typischer Physical-AI-Stack sieht so aus:

1. Wahrnehmung extrahiert Zustand aus Kameras und Sensoren.
2. Ein World Model prognostiziert kurzfristige Folgen.
3. Ein Entscheidungsmodell waehlt Aktionen.
4. Eine Kontrollschicht fuehrt Aktionen auf der Hardware aus.
5. Ein Sprachinterface erklaert Schritte, nimmt Ziele entgegen und unterstuetzt Supervision.

Es geht also nicht um "LLMs versus Roboter", sondern um den Uebergang von sprachzentrierter zu integrierter Wahrnehmung-Simulation-Aktion-Intelligenz.

## Eine Nuetzliche Zwei-Achsen-Sicht

Zusaetzlich lassen sich Systeme entlang zweier Achsen einordnen:

- Weltverankerung: von symbolisch/sprachlich zu physisch geerdet,
- Agency-Level: von beratender Ausgabe zu geschlossenem, autonomem Handeln.

Daraus ergibt sich ein einfacher Reifepfad:

- Chat-Assistenten,
- multimodale Assistenten,
- digitale Agenten,
- simulierte verkoerperte Agenten,
- Physical-AI-Systeme im realen Einsatz.

## Strategische Implikationen Fuer Teams

1. Erst Taxonomie klaeren, dann Modellmarke waehlen.
2. "Wirkt intelligent" von "handelt verlaesslich unter Constraints" trennen.
3. Frueh in Simulations- und Evaluationsinfrastruktur investieren.
4. Embodied Benchmarks und Safety Cases als Produktanforderung behandeln.
5. Von hybriden Architekturen ausgehen statt von One-Model-Erzaehlungen.

## Grenzen Dieses Drafts

Diese Kategorisierung ist bewusst pragmatisch, nicht kanonisch. Grenzen werden weiter verschwimmen, insbesondere wenn multimodale Foundation Models und World Models zusammenwachsen.

Trotzdem bleibt der Punkt: Selbst eine unvollkommene Karte ist besser als "KI" als undifferenzierter Sammelbegriff.

## Fazit

Die naechste KI-Phase dreht sich nicht primaer um bessere Konversation, sondern um Systeme, die ueber digitale und physische Kontexte hinweg wahrnehmen, modellieren, entscheiden und handeln.

Sprachmodelle bleiben zentral, sind aber nur noch eine Schicht in einer groesseren Architektur. Die technologische Front wird zunehmend durch World Models, verkoerperte Intelligenz und Physical AI bestimmt.

## Quellenhinweise (for follow-up version)

- Ha and Schmidhuber, World Models (2018): fruehe RL-orientierte Formulierung gelernter Umgebungsdynamik.
- OpenAI, Video generation models as world simulators (2024): Skalierung visueller Simulationsfaehigkeiten und deren Grenzen.
- Google DeepMind, Genie 2 (2024): Foundation World Model fuer interaktive 3D-Welten.
- Duan et al., A Survey of Embodied AI (2021/2022): Ueberblick zu Simulatoren und Tasks in Embodied AI.
- Brohan et al., RT-2 (2023): Vision-Language-Action-Transfer von Web-Wissen in robotische Steuerung.
- NVIDIA Glossary, Physical AI (2026): Industry-Framing von Physical-AI-Stacks und Simulation-to-Deployment-Workflow.
