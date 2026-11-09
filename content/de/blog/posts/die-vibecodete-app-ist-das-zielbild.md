---
title: "Die vibecodete App ist das Zielbild, nicht das Produkt"
description: "Warum vibecodete Microapps kein gelöstes Problem sind, wie sie zum Zielbild für agentische Entwicklung werden, und warum eine Dark Factory ein Target als Contract braucht, um fertig zu werden."
date: 2026-11-03
draft: false
translationKey: vibe-coded-app-target
image:
  path: ../../../../public/img/blog/vibe-coded-app-target.jpg
  alt: "Die grobe Skizze einer App wird zum präzisen Bauplan im Zentrum einer Zielscheibe."
tags:
  - agenten
  - claude-code
  - agentische-workflows
---
Ich verantworte Delivery in Softwareprojekten für Industriekunden. In fast jedem dieser Unternehmen hat sich im letzten Jahr etwas verschoben: Die Mitarbeitenden haben Zugang zu KI bekommen. Offiziell, mit Vertrag, Datenschutzregeln und Login über die IT, nicht mehr über den privaten Account nebenher.

Das war richtig. Schatten-KI ist nicht weniger geworden, weil jemand sie verboten hat. Sie ist weniger geworden, weil der offizielle Weg jetzt einfacher ist als der inoffizielle.

## Plötzlich baut jeder

Mit dem Zugang kam etwas, das niemand geplant hatte: Menschen ohne Software-Engineering-Hintergrund bauen Software. Die Disponentin vibecodet ein Dashboard für offene Aufträge. Der Qualitätsingenieur baut eine kleine App, die aus Prüffotos einen Bericht macht. Im Einkauf ersetzt eine Microapp drei Excel-Listen und eine wöchentliche Mail.

Diese Apps funktionieren. Sie lösen ein echtes Problem, und sie sind dort erprobt, wo es zählt: im Arbeitsalltag der Person, die sie gebaut hat. Das finde ich beeindruckend, und ich will es nicht kleinreden.

## Gebaut heißt nicht fertig

Das Missverständnis beginnt danach. Eine App, die läuft, sieht aus wie ein gelöstes Problem. Ist sie aber nicht. Sie ist Software, und Software muss betrieben und gewartet werden.

Wer aktualisiert die Bibliothek mit der Sicherheitslücke? Wer merkt, dass der Export nach dem nächsten ERP-Update nicht mehr stimmt? Wer kann die App ändern, wenn die Person, die sie gebaut hat, das Team wechselt? Wo liegen die Daten, und wer darf sie sehen?

Auf keine dieser Fragen hat eine vibecodete App eine Antwort. Meist hat sie auch niemand gestellt. Die Kosten fallen nicht beim Bauen an. Sie kommen ein halbes Jahr später, als Ausfall, als Audit-Finding oder als App, die niemand mehr anfassen will.

Verbieten wäre trotzdem die falsche Antwort. Damit schickt man die Leute genau in den Schatten zurück, aus dem man sie gerade geholt hat.

## Die App als Zielbild lesen

Besser ist ein anderer Blick: Die vibecodete App ist ein Proof of Concept, und oft ein sehr guter. Sie zeigt, was die Anwender wirklich brauchen, in ihrer Sprache und in ihrem Ablauf. So nah kommt kein Anforderungsworkshop.

Hier setzt Software Engineering an. Nicht, um die App wegzuwerfen und neu anzufangen, und auch nicht, um sie so zu übernehmen, wie sie ist. Die App wird zum Zielbild: Das muss das Ergebnis können. In der agentischen Softwareentwicklung ist genau das die fehlende Zutat. Ein Agent kann viel bauen, aber er muss wissen, wann er fertig ist.

Der Prototyp liefert das. Jede Ansicht, jeder Filter, jeder Export ist ein Verhalten, das man beschreiben und prüfen kann. „Zeigt alle offenen Aufträge, die älter als 14 Tage sind, sortiert nach Kunde.“ „Exportiert den Prüfbericht einer Charge als PDF.“ Das sind Abnahmekriterien. Und weil der Prototyp existiert, lässt sich dagegen testen: Kann die neue Version, was der Prototyp konnte?

Bei diesem Schritt helfen Plugins und Skills im Coding Harness, etwa in Claude Code. Ein Skill liest den Prototyp, geht ihn mit der Person durch, die ihn gebaut hat, und leitet Features und Abnahmekriterien ab, eine Frage nach der anderen. Die Fachseite bestätigt, was die App können muss. Das Engineering entscheidet, was Pflicht ist, was nice to have und was draußen bleibt. Heraus kommt kein Klon des Prototyps, sondern ein Vertrag.

## Das Target als Contract in der aSPARK Factory

Hier kommt meine eigene Arbeit ins Spiel. Mit [aSPARK](https://github.com/a-lottes/aSPARK) entwickle ich agentisch, Story für Story, mit Gates für Review und QA. Die aSPARK Factory fährt diesen Loop in Linien, bis hin zum Dark Mode: Eine Linie schlägt ihre Arbeit selbst vor, legt ihre Tickets an und merged nach ihren Gates.

Vor einem Monat habe ich geschrieben, dass [meinem Agenten ein Abbruchkriterium fehlte](/de/blog/meinem-agenten-fehlte-ein-abbruchkriterium/). In der Factory zeigte sich dasselbe Problem eine Ebene höher. Eine Linie im Dark Mode findet immer etwas zu tun. Ohne aufgeschriebenes Ziel kann sie ein Projekt nicht von einem Produkt unterscheiden, also entwickelt sie weiter.

Deshalb startet ein Projekt in der Factory mit einem Target, und das Target ist ein Contract. Ein Skill im Factory-Plugin für Claude Code, `factory-start`, führt durch das Gespräch: Was ist es, und wer nutzt es? Gibt es ein Ende? Was muss funktionieren, damit es fertig ist? Wie viele Tage darf es dauern? Aus den Antworten entsteht eine Datei, `.spark/target.md`:

```markdown
# Target: Invoice export v1

Kind: project
Status: active
Started: 2026-11-03
Budget: 20 days

## Features
### F-1 Monthly export (must)
- F-1.1 Exports the invoices of a month as CSV
- F-1.2 Skips cancelled invoices
### F-2 Email delivery (should)
- F-2.1 Sends the export to a configured address

## Out of scope
- Changes to invoices
```

Die Regeln dazu sind kurz:

- **Prüfbare Kriterien.** Jedes Kriterium ist etwas, das ein QA-Schritt beobachten kann. Nie „schnell“ oder „benutzerfreundlich“.
- **Must, Should, Could.** Features haben eine Priorität, und was nicht dazugehört, steht auch drin.
- **Budget in Kalendertagen.** Should-Features baut die Linie nur, solange die Prognose ins Budget passt.
- **Fortschritt wird belegt, nicht geschätzt.** Ein Kriterium zählt, wenn ein bestandener QA-Bericht seine ID nennt und die Änderung gemerged ist.
- **Arbeit nur für offene Features.** Die Linie schlägt Tickets nur für Features vor, die noch nicht fertig sind.
- **Nur ein Mensch verschiebt die Torpfosten.** Die Linie darf die Target-Datei nicht schreiben. Eine Änderung läuft über eine eigene Target-Zeremonie und endet als Pull Request, den ein Mensch merged.

## Warum eine Dark Factory ein Ende braucht

In einer Dark Factory schaut niemand bei jedem Schritt zu. Genau darum geht es. Das heißt aber auch: Die Factory braucht eine Bedingung, die sie selbst prüfen kann, um aufzuhören. „Die App ist jetzt gut“ ist keine. „Jedes Must-Kriterium ist in einem bestandenen QA-Bericht belegt“ ist eine.

Sind alle Must-Features fertig, schlägt die Linie keine neue Arbeit mehr vor und fragt einmal nach: Release vorbereiten, Target ändern oder so lassen. Nach dem Release geht sie in den Wartungsbetrieb. Sie behebt Bugs und passt an, was Menschen melden, baut aber keine neuen Features. Ein aufgebrauchtes Budget stoppt sie genauso, auch wenn das Target noch nicht erreicht ist.

Ohne diesen Contract wird eine Dark Factory zu dem, was die vibecodete App schon war: etwas, das immer weiter wächst und das niemand fertig nennen kann. Mit ihm hat die Entwicklung ein Ende und der Betrieb einen klaren Anfang.

## Was das heißt

Wenn dein Unternehmen den Leuten KI gegeben hat: Hindere sie nicht am Bauen. Behandle, was sie bauen, als die besten Anforderungen, die du je bekommen hast. Stell jemanden aus dem Engineering daneben, mach daraus ein Target mit prüfbaren Kriterien und lass es ordentlich bauen und betreiben.

Wenn du aus dem Engineering kommst: Der Prototyp ist keine Konkurrenz. Er ist die Spezifikation, die du dir immer gewünscht hast.

Das ist kein Laboraufbau. Die Factory läuft auf mehreren Rechnern und baut echte Projekte, auch im Dark Mode. Möglich macht das der Target-Contract: Ich lege das Ende fest, die Linie liefert dagegen, und ich steige ein, wenn sie fragt. So wird aus einer vibecodeten Idee Software, die jemand über Jahre betreiben kann.
