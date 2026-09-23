---
title: "Von 47 Minuten Bildschirmaufnahme zum vertonten Demo — ohne ein Schnittprogramm zu öffnen"
description: Wie aus der Rohaufnahme einer aSPARK-Session noch am selben Tag ein untertiteltes, gebrandetes, vertontes 100-Sekunden-Demo wurde — geplant aus einem Hash-Ledger statt aus einer Timeline, gerendert mit dem, was macOS mitbringt, und gesprochen von ElevenLabs.
date: 2026-09-19
draft: false
translationKey: screen-recording-to-narrated-demo
tags:
  - claude-code
  - agenten
  - agentische-workflows
---
**Ich hatte eine 47-minütige Bildschirmaufnahme und kein Schnittprogramm auf einem Mac mit älterem macOS. Am Ende desselben Tages lief ein vertontes, untertiteltes 100-Sekunden-Demo auf meiner Website und direkt in einem GitHub-README. So ist das passiert — und warum die wichtigste Zutat eine Logdatei war, die ich für einen ganz anderen Zweck gebaut hatte.**

<video controls playsinline preload="none"
  poster="https://aspark.lottes.dev/assets/video/aspark-demo-poster.jpg"
  src="https://aspark.lottes.dev/assets/video/aspark-demo-voice.mp4"
  style="width:100%;height:auto;border-radius:12px;margin:1.5rem 0"></video>

## Warum überhaupt ein Video

[aSPARK](https://github.com/a-lottes/aSPARK) macht aus Claude Code ein agiles Team: ein Product Owner, der deine Idee hinterfragt, ein Designer, ein Engineering Manager, ein Reviewer, ein QA-Tester, der deine App in einem echten Browser durchklickt, und ein Release Manager — mit einem Quality Gate zwischen jeder Phase, das nur du öffnen kannst.

Das sind viele Worte. Und genau die Worte waren das Problem. Als ich Claude um eine ehrliche Einschätzung des Projekts bat, war die Antwort deutlich: Das README verwendete viertausend Wörter darauf zu erklären, was der Loop tut, und keine einzige Sekunde darauf, ihn *zu zeigen*. Das eine, was sonst niemand macht — ein Agent, der deine App im Browser testet und einen echten Bug findet — war unsichtbar.

Also haben wir das README auf ein Drittel gekürzt und ganz oben eine Zeile eingefügt: `<!-- TODO: 90-second screencast -->`. Dann mussten wir einen machen.

## Schritt 1: Ein Feature, das in eine Sitzung passt

Ein Demo-Loop muss echt sein, und er muss kurz sein. Claude hat ein winziges Demo-Projekt aufgesetzt — eine Todo-App in reinem JavaScript, drei Dateien, keine Abhängigkeiten — dazu eine Projekt-Constitution, die jedes Gate schlank hält: eine aktive Lens, Browser-QA, kein Testframework, das erst aufgebaut werden müsste.

Dann hat es das Feature vorgeschlagen: eine Filterleiste mit *All / Active / Done* und einem Zähler "N items left". Der Trick steckte in der Formulierung der Idee selbst. Der eine Satz, den ich in `/spark` eingefügt habe, beantwortete schon das meiste, was die Clarify-Runde des Product Owners abfragt — Grenzen, leere Zustände, Tastaturbedienung, was ausdrücklich nicht dazugehört. Der Product Owner hat trotzdem nachgehakt, aber ein paar schnelle Antworten reichten für die Spec.

Ich habe auf Aufnahme gedrückt. Siebenundvierzig Minuten später war `todo-filter-bar` als `v0.1.0` released: spezifiziert, design-geprüft, geplant, gebaut, reviewed (der Reviewer fand einen echten Bug mit dem Fokusrahmen, der behoben und nachgeprüft wurde) und gegen alle 29 Akzeptanzkriterien in Chrome verifiziert, am Desktop und in Handybreite.

## Schritt 2: Den Schnitt aus einem Ledger planen, nicht aus einer Timeline

Jetzt kommt der Teil, der alles andere leicht gemacht hat.

Siebenundvierzig Minuten sind rund 2.800 Sekunden Material. Der übliche Weg, die fünfzehn sehenswerten Sekunden zu finden, ist Durchspulen. Wir haben kein einziges Mal gespult.

aSPARK hat ein Begleit-Plugin, [aspark-guard](https://github.com/a-lottes/aSPARK-guard). Seine Aufgabe ist Durchsetzung: Es verweigert einen Schreibvorgang, der ein Quality Gate überspringen würde, und es protokolliert **jeden Schreibvorgang auf ein `.spark/`-Artefakt in einem Append-only-Ledger** — mit dem SHA-256 des Artefakts, seinem Status, dem Agenten, der geschrieben hat, und einem Zeitstempel. Ich habe es gebaut, damit kein Gate still passiert werden kann. Als Video-Werkzeug habe ich es nie gesehen.

Aber ein Ledger mit Zeitstempeln ist ein Inhaltsverzeichnis. Zieht man den Startzeitpunkt der Aufnahme ab, liest es sich so:

| In der Aufnahme | Was passiert ist |
|---|---|
| 1:44 | Product Owner schreibt den ersten Spec-Entwurf |
| 7:32 | Designer ergänzt das Design-Review |
| 12:40 | Engineering Manager schreibt den Plan |
| 23:44 | Reviewer eröffnet das Review |
| 37:23 | QA-Tester schreibt den QA-Bericht |
| 42:55 | Release Manager bereitet das Release vor |

**Der Ledger von aspark-guard hat die Phasenkarte der ganzen Session geliefert — und genau das hat diesen Ablauf überhaupt erst möglich gemacht.** Claude hat ihn mit dem Protokoll der Claude-Code-Session (jede Gate-Frage und meine Antwort, auf die Sekunde) und dem Git-Log zu einer Zeitachse zusammengeführt. Daraus entstand das Drehbuch: der `/spark`-Befehl, die erste harte Frage des Product Owners, die Befunde des Designers, jedes Gate, der Bug des Reviewers, QA im Browser, das Release.

Das Werkzeug, das den Prozess nachprüfbar macht, hat ihn auch *verfilmbar* gemacht. Ich liebe es, wenn so etwas passiert.

## Schritt 3: Nur dort hinschauen, wo es zählt

Erst dann haben wir Bilder geöffnet — Kontaktbogen der Aufnahme, eine Kachel alle zwei Minuten, und zugeschnittene Standbilder genau an den Kandidaten-Sekunden, um zu prüfen, ob der Terminaltext bei 720p noch lesbar ist.

Diese Standbilder haben drei Dinge gefunden, die ich nie in einem öffentlichen Video haben wollte: eine ältere Version meiner eigenen Website in einem Browser-Tab (mit Aussagen, die ich später am selben Tag umgeschrieben habe), eine Neuer-Tab-Seite mit Dateinamen aus meinem Google Drive und mein Profilbild in der Browser-Leiste. Jeder Browser-Ausschnitt beginnt jetzt unterhalb der Leiste, und diese Sekunden sind schlicht nicht im Schnitt. Claude hat mir gesagt, was es weggelassen hat und warum, statt still zu schneiden.

## Schritt 4: Rendern mit dem, was macOS mitbringt

Mein Mac läuft mit Ventura. Kein iMovie, kein ffmpeg, kein Homebrew. Wie sich herausstellte, war nichts davon nötig: Swift und AVFoundation bringt das System mit.

Claude hat ein kleines Render-Programm geschrieben, das eine einzige JSON-Datei mit dem Schnitt liest: fünfzehn Szenen, jede mit einem Quellabschnitt, einem Ausschnitt (Schwenk und Zoom ins Terminal oder in den Browser) und einem Tempo. Die Build-Phase läuft mit 30×, die Gate-Fragen in Echtzeit. Jede beschleunigte Szene trägt ein **Zeitraffer-Badge** in der Ecke — einem Demo, das seine Beschleunigungen versteckt, glaubt niemand mehr, sobald er die erste bemerkt.

Es exportiert einen Master und kodiert ihn dann zweimal neu: einmal unter GitHubs 10-MB-Grenze für Anhänge, einmal in höherer Qualität für die Website.

## Schritt 5: "Die Schrift wirkt etwas trocken"

Der erste Schnitt war korrekt und schlicht. Ich habe einen Satz gesagt — *die Typografie wirkt langweilig, geht das moderner?* — und bekam ein Redesign aus meiner eigenen Website: Inter Display und JetBrains Mono, direkt aus den Schriftdateien der Seite geladen, der Türkis-Orange-Verlauf der Überschriften auf der Wortmarke und Untertitel-Karten mit einem Rollen-Label oben (`PRODUCT OWNER`, `GATE · PLAN`, `QA TESTER`) und einem Satz darunter.

Dazu kam etwas, um das ich nicht gebeten hatte und das ich jetzt nicht mehr missen will: ein **Phasen-Tracker** oben links — *Specify · Plan · Act · Review · Keep* — der die Phase hervorhebt, die du gerade siehst. Du weißt immer, wo im Loop du bist.

## Schritt 6: Eine Stimme

Nur mit Untertiteln wirkte es immer noch etwas stumm. Ich habe einen kostenlosen ElevenLabs-Account, also kam ein Sprecher dazu.

Claude hat pro Szene einen kurzen gesprochenen Satz geschrieben — der Zwilling des Untertitels, nicht seine Kopie — und ein Skript, das jeden Satz einzeln an ElevenLabs schickt und die Nachbarsätze mitgibt, damit die Betonung durchgehend bleibt. Der MCP-Connector von ElevenLabs ist mit meinem Account verbunden, war in dieser Session aber nicht verfügbar, also spricht das Skript direkt mit der API. Der Schlüssel liegt im macOS-Schlüsselbund und ist nie im Chat aufgetaucht.

Die Synchronisation war der einfache Teil, denn nichts musste nach Gehör angepasst werden. Jede Aufnahme wird auf Sekundenbruchteile vermessen und eine Drittelsekunde nach Szenenbeginn gesetzt. Ist ein Satz länger als seine Szene, läuft deren Zeitraffer etwas langsamer, und das Badge zeigt das neue, ehrliche Tempo. Eine Pegelmessung der fertigen Datei hat danach bestätigt, dass die Stimme genau dort einsetzt, wo die Szenen beginnen.

Die ganze Vertonung hat 871 der 10.000 kostenlosen Monats-Credits gekostet, und die Namensnennung, die der Gratis-Plan verlangt, steht auf der Schlusskarte.

## Schritt 7: Ausliefern

Die hochwertige Fassung liegt selbst gehostet auf [aspark.lottes.dev](https://aspark.lottes.dev/de/#showcase). Für das README will GitHub einen Anhang, der über einen Browser hochgeladen wird — also hat Claude in meinem angemeldeten Chrome ein Issue geöffnet, die Datei ins Kommentarfeld geladen, ohne etwas zu posten, die Anhang-URL übernommen und über GitHubs eigene Markdown-API geprüft, dass sie für anonyme Besucher als Player erscheint, bevor sie committet wurde. Das Video läuft jetzt [direkt auf der Repository-Seite](https://github.com/a-lottes/aSPARK).

## Was mich überrascht hat

Nicht, dass es funktioniert hat. Sondern dass es **ohne Reibung an den falschen Stellen** funktioniert hat.

Die Reibung lag genau dort, wo sie hingehört: bei mir. Welches Feature gezeigt wird. Ob das Design passt. Ob die Stimme gut klingt. Alles andere — die Planung, die Datenschutz-Prüfung, das Rendern, die Kontrollen — lief von selbst, und die kleinen Dinge, die schiefgingen, wurden von Prüfungen gefunden, nicht von mir: Overlay-Text, der im ersten Durchlauf als leere Kästen erschien, ein API-Schlüssel, der als die falschen acht Zeichen gespeichert war, ein Push, der an einer 13-MB-Videodatei hängen blieb. Jedes davon tauchte auf, wurde benannt, wurde behoben.

Und die Ehrlichkeit war eingebaut, nicht nachträglich angeschraubt. Das Badge markiert jeden Zeitraffer. Der Schnitt lässt weg, was nicht öffentlich sein soll. Die Namensnennung steht auf der Karte. Es ist dasselbe Prinzip, das aSPARK auf Code anwendet: Was nicht verifiziert ist, darf nicht verifiziert aussehen.

## Jetzt ist es ein Skill

Alles oben lebt jetzt in einem Claude-Code-Skill: das Zeitachsen-Skript, das Ledger und Protokoll liest, die Werkzeuge für Kontaktbogen und Rendern, die Designvorgaben, die Vertonung und jeder Stolperstein, auf den wir unterwegs gestoßen sind. Die nächste Aufnahme ist einen Prompt entfernt: *Mach aus dieser Bildschirmaufnahme ein Demo-Video.*

## Probier aSPARK aus

Wenn du mit Claude Code arbeitest und ein agiles Team um jedes Feature willst — mit Gates, über die du entscheidest, und einer Spur, die du lesen, diffen und, wie sich zeigt, sogar verfilmen kannst:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Nimm [aspark-guard](https://github.com/a-lottes/aSPARK-guard) dazu, wenn du die Gates im Code durchgesetzt haben willst — und den Ledger, der sich als das beste Video-Drehbuch herausgestellt hat, das ich je hatte.

Alles ist Open Source: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK). Und wenn du es in einem eigenen Projekt einsetzt, ist mir ein [Erfahrungsbericht](https://github.com/a-lottes/aSPARK/issues/new?template=field_report.yml) mehr wert als jeder Stern — besonders, wenn es schiefgegangen ist.
