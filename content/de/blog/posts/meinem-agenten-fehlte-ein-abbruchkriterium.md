---
title: "Meinem Agenten fehlte ein Abbruchkriterium"
description: "Warum ein Feature-Loop für Migrationen nicht passt, was mir für lange mechanische Arbeit gefehlt hat, und wie ein Agent aussieht, der von selbst anhält."
date: 2026-10-04
draft: false
translationKey: agent-stop-condition
tags:
  - agenten
  - claude-code
  - agentische-workflows
---
Mein Loop in aSPARK ist auf eine User Story gebaut. Spec, Plan, Umsetzung, Review, QA, Release, und an jedem Übergang entscheide ich. Für ein Feature ist das genau richtig.

Dann kommt Arbeit, die keine Story ist. Ein altes Modul gegen ein neues tauschen, Stück für Stück. Alle offenen Major-Findings schließen. Das Ziel ist hier ein Zustand, den man prüfen kann: alles grün. Bis dahin wiederholt sich derselbe Handgriff, zwanzig Mal, vierzig Mal.

Ich hatte dafür zwei schlechte Optionen. Ich konnte daraus eine Fake-Story machen, mit Akzeptanzkriterien, die niemand braucht. Oder ich schrieb dem Agenten „mach weiter“ und schaute zu.

„Mach weiter“ ist der Prompt, bei dem ich am meisten Vertrauen verliere. Der Agent hat kein Ziel, das er prüfen kann, also hört er auf, wenn es sich fertig anfühlt. Er hat kein Budget, also verbrennt er Tokens an der dritten Variante desselben Fixes. Und wenn etwas kaputtgeht, das vorher lief, flickt er es leise mit, statt zu sagen, dass sich gerade zwei Teile der Arbeit widersprechen.

Mir fehlte also nicht mehr Autonomie, sondern drei Dinge, die jedes Projekt mit Menschen selbstverständlich hat:

1. ein Ziel, das eine Maschine entscheiden kann,
2. ein Budget,
3. Regeln, wann man aufhört und fragt.

## Kampagnen

Daraus ist in aSPARK eine Kampagne geworden. Ich gebe ein Ziel frei, zum Beispiel „jede Scheibe ist parity-green“, dazu Iterationen, Tokens und Stopp-Regeln. Der Agent iteriert nur innerhalb dieses Rahmens.

Die erste Art ist eine Migration. Zuerst pinnt ein Archaeologist das alte Verhalten als Tests fest, die gegen den alten Code grün sein müssen. Dann migriert ein Migrator genau eine Scheibe pro Iteration und committet nur deren Pfade. Danach prüft ein Parity Verifier, und zwar in einem frischen Kontext, nicht in dem, der den Code geschrieben hat. Nur seine zitierte Ausgabe darf eine Scheibe grün nennen.

Der Moment, für den ich das gebaut habe, kam in der QA auf einem kleinen Test-Repo. Scheibe 1 war grün. Scheibe 2 brauchte eine gemeinsame Hilfsfunktion, die jetzt `float(x)` zurückgibt. Der Verifier meldete danach:

```
S1 PARITY-RED add(1, 2): old=3 new=3.0
S2 PARITY-GREEN
S3 NOT-MIGRATED
```

3 gegen 3.0, so etwas übersieht man beim Durchklicken leicht. Der Agent hielt an, Stopp-Regel SR-5: Eine grüne Scheibe ist rot geworden. Er ließ Scheibe 2 committet, schrieb die Ursache auf und legte drei Optionen hin: Scheibe 2 zurücknehmen, den Schnitt der Scheiben ändern oder einen anderen Weg. Dazu der Hinweis, dass etwa 190k von 200k Tokens verbraucht waren.

In einem weiteren Testlauf bekam er danach nur „Please continue it.“ Die Antwort:

> "Continue" doesn't say which way.

Genau das hatte mir gefehlt. Ein Agent, der weiß, dass Weitermachen hier eine Entscheidung ist und keine Fleißaufgabe.

## Der Haken: der Einstieg

Eine Kampagne zu starten war umständlich. Man musste den Ordner des installierten Plugins unter `~/.claude/plugins/` finden, im Prompt nennen und die Vorlage zusammenkopieren, weil ein Agent außerhalb eines Skills `${CLAUDE_PLUGIN_ROOT}` nicht auflösen kann. Ohne Pfad hat er sich in einer QA-Session einfach selbst eine Struktur ausgedacht. Diesen Ablauf macht niemand freiwillig zweimal.

Deshalb läuft gerade der zweite Loop: ein Befehl `/campaign <name> [kind]`. Er findet die Vorlage selbst, fragt nur ab, was die gewählte Art noch offen lässt, und schreibt einen Entwurf von `campaign.md`. Freigeben und starten bleibt bei mir. Die Spec ist freigegeben, der Rest des Loops läuft.

Zwei Dinge sind mir dabei wichtig. Die Stopp-Regeln befolgt der Agent, erzwungen werden sie nicht, Core ist Markdown ohne Laufzeit. Hart durchsetzen könnte sie nur ein Hook außerhalb des Modells, wie ihn aspark-guard für die Gates hat; für Kampagnen gibt es den noch nicht. Und bisher lief das Ganze auf Test-Repos, nicht auf einem echten Projekt. Ob sich Kampagnen im Alltag lohnen, weiß ich erst, wenn ich die erste echte Migration damit gemacht habe.

Aber zum ersten Mal habe ich für lange, mechanische Arbeit ein Werkzeug, bei dem ich nicht danebensitzen muss, um zu merken, wann es aufhören sollte.

Die Kampagnen-Doku liegt im [aSPARK-Repo](https://github.com/a-lottes/aSPARK/tree/main/campaigns), den SR-5-Moment gibt es auch als [60-Sekunden-Video](https://youtube.com/shorts/yD54Mq4JLJw). Wann eine Kampagne passt und wann eine Story, habe ich auf der aSPARK-Seite aufgeschrieben: [Kampagne oder Story? Wo aSPARK die Grenze zieht](https://aspark.lottes.dev/de/blog/kampagne-oder-story/).
