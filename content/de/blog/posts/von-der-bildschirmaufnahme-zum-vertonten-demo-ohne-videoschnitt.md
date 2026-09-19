---
title: "Von 47 Minuten Bildschirmaufnahme zum vertonten Demo — ohne ein Schnittprogramm zu oeffnen"
description: Wie aus der Rohaufnahme einer aSPARK-Session noch am selben Tag ein untertiteltes, gebrandetes, vertontes 100-Sekunden-Demo wurde — geplant aus einem Hash-Ledger statt aus einer Timeline, gerendert mit dem, was macOS mitbringt, und gesprochen von ElevenLabs.
date: 2026-09-19
draft: false
translationKey: screen-recording-to-narrated-demo
tags:
  - claude-code
  - agenten
  - agentische-workflows
---
**Ich hatte eine 47-minuetige Bildschirmaufnahme und kein Schnittprogramm auf einem Mac mit aelterem macOS. Am Ende desselben Tages lief ein vertontes, untertiteltes 100-Sekunden-Demo auf meiner Website und direkt in einem GitHub-README. So ist das passiert — und warum die wichtigste Zutat eine Logdatei war, die ich fuer einen ganz anderen Zweck gebaut hatte.**

<video controls playsinline preload="none"
  poster="https://aspark.lottes.dev/assets/video/aspark-demo-poster.jpg"
  src="https://aspark.lottes.dev/assets/video/aspark-demo-voice.mp4"
  style="width:100%;height:auto;border-radius:12px;margin:1.5rem 0"></video>

## Warum ueberhaupt ein Video

[aSPARK](https://github.com/a-lottes/aSPARK) macht aus Claude Code ein agiles Team: ein Product Owner, der deine Idee hinterfragt, ein Designer, ein Engineering Manager, ein Reviewer, ein QA-Tester, der deine App in einem echten Browser durchklickt, und ein Release Manager — mit einem Quality Gate zwischen jeder Phase, das nur du oeffnen kannst.

Das sind viele Worte. Und genau die Worte waren das Problem. Als ich Claude um eine ehrliche Einschaetzung des Projekts bat, war die Antwort deutlich: Das README verwendete viertausend Woerter darauf zu erklaeren, was der Loop tut, und keine einzige Sekunde darauf, ihn *zu zeigen*. Das eine, was sonst niemand macht — ein Agent, der deine App im Browser testet und einen echten Bug findet — war unsichtbar.

Also haben wir das README auf ein Drittel gekuerzt und ganz oben eine Zeile eingefuegt: `<!-- TODO: 90-second screencast -->`. Dann mussten wir einen machen.

## Schritt 1: Ein Feature, das in eine Sitzung passt

Ein Demo-Loop muss echt sein, und er muss kurz sein. Claude hat ein winziges Demo-Projekt aufgesetzt — eine Todo-App in reinem JavaScript, drei Dateien, keine Abhaengigkeiten — dazu eine Projekt-Constitution, die jedes Gate schlank haelt: eine aktive Lens, Browser-QA, kein Testframework, das erst aufgebaut werden muesste.

Dann hat es das Feature vorgeschlagen: eine Filterleiste mit *All / Active / Done* und einem Zaehler "N items left". Der Trick steckte in der Formulierung der Idee selbst. Der eine Satz, den ich in `/spark` eingefuegt habe, beantwortete schon das meiste, was die Clarify-Runde des Product Owners abfragt — Grenzen, leere Zustaende, Tastaturbedienung, was ausdruecklich nicht dazugehoert. Der Product Owner hat trotzdem nachgehakt, aber ein paar schnelle Antworten reichten fuer die Spec.

Ich habe auf Aufnahme gedrueckt. Siebenundvierzig Minuten spaeter war `todo-filter-bar` als `v0.1.0` released: spezifiziert, design-geprueft, geplant, gebaut, reviewed (der Reviewer fand einen echten Bug mit dem Fokusrahmen, der behoben und nachgeprueft wurde) und gegen alle 29 Akzeptanzkriterien in Chrome verifiziert, am Desktop und in Handybreite.

## Schritt 2: Den Schnitt aus einem Ledger planen, nicht aus einer Timeline

Jetzt kommt der Teil, der alles andere leicht gemacht hat.

Siebenundvierzig Minuten sind rund 2.800 Sekunden Material. Der uebliche Weg, die fuenfzehn sehenswerten Sekunden zu finden, ist Durchspulen. Wir haben kein einziges Mal gespult.

aSPARK hat ein Begleit-Plugin, [aspark-guard](https://github.com/a-lottes/aSPARK-guard). Seine Aufgabe ist Durchsetzung: Es verweigert einen Schreibvorgang, der ein Quality Gate ueberspringen wuerde, und es protokolliert **jeden Schreibvorgang auf ein `.spark/`-Artefakt in einem Append-only-Ledger** — mit dem SHA-256 des Artefakts, seinem Status, dem Agenten, der geschrieben hat, und einem Zeitstempel. Ich habe es gebaut, damit kein Gate still passiert werden kann. Als Video-Werkzeug habe ich es nie gesehen.

Aber ein Ledger mit Zeitstempeln ist ein Inhaltsverzeichnis. Zieht man den Startzeitpunkt der Aufnahme ab, liest es sich so:

| In der Aufnahme | Was passiert ist |
|---|---|
| 1:44 | Product Owner schreibt den ersten Spec-Entwurf |
| 7:32 | Designer ergaenzt das Design-Review |
| 12:40 | Engineering Manager schreibt den Plan |
| 23:44 | Reviewer eroeffnet das Review |
| 37:23 | QA-Tester schreibt den QA-Bericht |
| 42:55 | Release Manager bereitet das Release vor |

**Der Ledger von aspark-guard hat die Phasenkarte der ganzen Session geliefert — und genau das hat diesen Ablauf ueberhaupt erst moeglich gemacht.** Claude hat ihn mit dem Protokoll der Claude-Code-Session (jede Gate-Frage und meine Antwort, auf die Sekunde) und dem Git-Log zu einer Zeitachse zusammengefuehrt. Daraus entstand das Drehbuch: der `/spark`-Befehl, die erste harte Frage des Product Owners, die Befunde des Designers, jedes Gate, der Bug des Reviewers, QA im Browser, das Release.

Das Werkzeug, das den Prozess nachpruefbar macht, hat ihn auch *verfilmbar* gemacht. Ich liebe es, wenn so etwas passiert.

## Schritt 3: Nur dort hinschauen, wo es zaehlt

Erst dann haben wir Bilder geoeffnet — Kontaktbogen der Aufnahme, eine Kachel alle zwei Minuten, und zugeschnittene Standbilder genau an den Kandidaten-Sekunden, um zu pruefen, ob der Terminaltext bei 720p noch lesbar ist.

Diese Standbilder haben drei Dinge gefunden, die ich nie in einem oeffentlichen Video haben wollte: eine aeltere Version meiner eigenen Website in einem Browser-Tab (mit Aussagen, die ich spaeter am selben Tag umgeschrieben habe), eine Neuer-Tab-Seite mit Dateinamen aus meinem Google Drive und mein Profilbild in der Browser-Leiste. Jeder Browser-Ausschnitt beginnt jetzt unterhalb der Leiste, und diese Sekunden sind schlicht nicht im Schnitt. Claude hat mir gesagt, was es weggelassen hat und warum, statt still zu schneiden.

## Schritt 4: Rendern mit dem, was macOS mitbringt

Mein Mac laeuft mit Ventura. Kein iMovie, kein ffmpeg, kein Homebrew. Wie sich herausstellte, war nichts davon noetig: Swift und AVFoundation bringt das System mit.

Claude hat ein kleines Render-Programm geschrieben, das eine einzige JSON-Datei mit dem Schnitt liest: fuenfzehn Szenen, jede mit einem Quellabschnitt, einem Ausschnitt (Schwenk und Zoom ins Terminal oder in den Browser) und einem Tempo. Die Build-Phase laeuft mit 30×, die Gate-Fragen in Echtzeit. Jede beschleunigte Szene traegt ein **Zeitraffer-Badge** in der Ecke — einem Demo, das seine Beschleunigungen versteckt, glaubt niemand mehr, sobald er die erste bemerkt.

Es exportiert einen Master und kodiert ihn dann zweimal neu: einmal unter GitHubs 10-MB-Grenze fuer Anhaenge, einmal in hoeherer Qualitaet fuer die Website.

## Schritt 5: "Die Schrift wirkt etwas trocken"

Der erste Schnitt war korrekt und schlicht. Ich habe einen Satz gesagt — *die Typografie wirkt langweilig, geht das moderner?* — und bekam ein Redesign aus meiner eigenen Website: Inter Display und JetBrains Mono, direkt aus den Schriftdateien der Seite geladen, der Tuerkis-Orange-Verlauf der Ueberschriften auf der Wortmarke und Untertitel-Karten mit einem Rollen-Label oben (`PRODUCT OWNER`, `GATE · PLAN`, `QA TESTER`) und einem Satz darunter.

Dazu kam etwas, um das ich nicht gebeten hatte und das ich jetzt nicht mehr missen will: ein **Phasen-Tracker** oben links — *Specify · Plan · Act · Review · Keep* — der die Phase hervorhebt, die du gerade siehst. Du weisst immer, wo im Loop du bist.

## Schritt 6: Eine Stimme

Nur mit Untertiteln wirkte es immer noch etwas stumm. Ich habe einen kostenlosen ElevenLabs-Account, also kam ein Sprecher dazu.

Claude hat pro Szene einen kurzen gesprochenen Satz geschrieben — der Zwilling des Untertitels, nicht seine Kopie — und ein Skript, das jeden Satz einzeln an ElevenLabs schickt und die Nachbarsaetze mitgibt, damit die Betonung durchgehend bleibt. Der MCP-Connector von ElevenLabs ist mit meinem Account verbunden, war in dieser Session aber nicht verfuegbar, also spricht das Skript direkt mit der API. Der Schluessel liegt im macOS-Schluesselbund und ist nie im Chat aufgetaucht.

Die Synchronisation war der einfache Teil, denn nichts musste nach Gehoer angepasst werden. Jede Aufnahme wird auf Sekundenbruchteile vermessen und eine Drittelsekunde nach Szenenbeginn gesetzt. Ist ein Satz laenger als seine Szene, laeuft deren Zeitraffer etwas langsamer, und das Badge zeigt das neue, ehrliche Tempo. Eine Pegelmessung der fertigen Datei hat danach bestaetigt, dass die Stimme genau dort einsetzt, wo die Szenen beginnen.

Die ganze Vertonung hat 871 der 10.000 kostenlosen Monats-Credits gekostet, und die Namensnennung, die der Gratis-Plan verlangt, steht auf der Schlusskarte.

## Schritt 7: Ausliefern

Die hochwertige Fassung liegt selbst gehostet auf [aspark.lottes.dev](https://aspark.lottes.dev/de/#showcase). Fuer das README will GitHub einen Anhang, der ueber einen Browser hochgeladen wird — also hat Claude in meinem angemeldeten Chrome ein Issue geoeffnet, die Datei ins Kommentarfeld geladen, ohne etwas zu posten, die Anhang-URL uebernommen und ueber GitHubs eigene Markdown-API geprueft, dass sie fuer anonyme Besucher als Player erscheint, bevor sie committet wurde. Das Video laeuft jetzt [direkt auf der Repository-Seite](https://github.com/a-lottes/aSPARK).

## Was mich ueberrascht hat

Nicht, dass es funktioniert hat. Sondern dass es **ohne Reibung an den falschen Stellen** funktioniert hat.

Die Reibung lag genau dort, wo sie hingehoert: bei mir. Welches Feature gezeigt wird. Ob das Design passt. Ob die Stimme gut klingt. Alles andere — die Planung, die Datenschutz-Pruefung, das Rendern, die Kontrollen — lief von selbst, und die kleinen Dinge, die schiefgingen, wurden von Pruefungen gefunden, nicht von mir: Overlay-Text, der im ersten Durchlauf als leere Kaesten erschien, ein API-Schluessel, der als die falschen acht Zeichen gespeichert war, ein Push, der an einer 13-MB-Videodatei haengen blieb. Jedes davon tauchte auf, wurde benannt, wurde behoben.

Und die Ehrlichkeit war eingebaut, nicht nachtraeglich angeschraubt. Das Badge markiert jeden Zeitraffer. Der Schnitt laesst weg, was nicht oeffentlich sein soll. Die Namensnennung steht auf der Karte. Es ist dasselbe Prinzip, das aSPARK auf Code anwendet: Was nicht verifiziert ist, darf nicht verifiziert aussehen.

## Jetzt ist es ein Skill

Alles oben lebt jetzt in einem Claude-Code-Skill: das Zeitachsen-Skript, das Ledger und Protokoll liest, die Werkzeuge fuer Kontaktbogen und Rendern, die Designvorgaben, die Vertonung und jeder Stolperstein, auf den wir unterwegs gestossen sind. Die naechste Aufnahme ist einen Prompt entfernt: *Mach aus dieser Bildschirmaufnahme ein Demo-Video.*

## Probier aSPARK aus

Wenn du mit Claude Code arbeitest und ein agiles Team um jedes Feature willst — mit Gates, ueber die du entscheidest, und einer Spur, die du lesen, diffen und, wie sich zeigt, sogar verfilmen kannst:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Nimm [aspark-guard](https://github.com/a-lottes/aSPARK-guard) dazu, wenn du die Gates im Code durchgesetzt haben willst — und den Ledger, der sich als das beste Video-Drehbuch herausgestellt hat, das ich je hatte.

Alles ist Open Source: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK). Und wenn du es in einem eigenen Projekt einsetzt, ist mir ein [Erfahrungsbericht](https://github.com/a-lottes/aSPARK/issues/new?template=field_report.yml) mehr wert als jeder Stern — besonders, wenn es schiefgegangen ist.
