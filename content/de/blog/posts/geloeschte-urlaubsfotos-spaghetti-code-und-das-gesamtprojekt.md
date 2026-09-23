---
title: "Gelöschte Urlaubsfotos, Spaghetti-Code und die Frage, wer eigentlich das Gesamtprojekt im Blick hat"
description: Wie gelöschte Urlaubsbilder zu einem Open-Source-Tool führten — und warum mir dabei klar wurde, dass produktive Teamarbeit mit Coding-Agenten ein strukturelles Problem hat, das niemand mit Disziplin löst.
date: 2026-08-01
draft: false
translationKey: deleted-photos-spaghetti-code-whole-project
tags:
  - agenten
  - agentische-workflows
  - claude-code
  - best-practices
---
**Das hier ist keine Produktvorstellung. Es ist die Geschichte eines Problems, das mich zwei Projekte gekostet hätte — und das jedes Team trifft, das Coding-Agenten nicht mehr nur ausprobiert, sondern produktiv in der Breite einsetzen will.**

## Es beginnt mit einer Digitalkamera

Meine Tochter hat im Urlaub die Fotos auf ihrer Digitalkamera gelöscht. Versehentlich, unwiderruflich — dachte sie. Wer schon einmal in die Verlegenheit kam, gelöschte Bilder von einer SD-Karte retten zu wollen, kennt den Markt, der sich dann auftut: Tools, die erst nach der Analyse verraten, dass die Wiederherstellung Geld kostet. Tools mit Oberflächen aus einer anderen Dekade. Tools, bei denen man als Elternteil nicht sicher sagen kann, ob sie die Karte retten oder endgültig ruinieren.

Ich habe kein Werkzeug gefunden, das kostenfrei war *und* einfach genug, dass man es einem Menschen ohne Terminal-Erfahrung in die Hand geben könnte. Also habe ich beschlossen, selbst eins zu bauen: [Datrivo](https://datrivo.app) — ein Foto-Recovery-Tool, das Open Source erscheinen soll, damit das nächste Elternteil in dieser Situation eine ehrliche, kostenlose Option hat.

So weit die schöne Geschichte. Der eigentliche Anlass für diesen Text ist, was *beim Bauen* passiert ist.

## Die Flitterwochen

Ich entwickle Datrivo mit Claude Code, und die ersten Wochen waren genau das, was die Begeisterung um Coding-Agenten verspricht. Ein Datei-Carver für ein Format, das ich vorher nie im Hexeditor gesehen hatte: ein Nachmittag. Eine GUI, die meine Zielgruppe nicht überfordert: ein Abend. Features, die mich früher eine Woche Feierabende gekostet hätten, entstanden in Stunden.

Das will ich nicht kleinreden, und wer das noch nicht erlebt hat, sollte es erleben: Die Geschwindigkeit ist real. Genau deshalb ist das, was danach kam, so tückisch — es fühlt sich nämlich lange nicht wie ein Problem an.

## Der Bruch: lokal brillant, global Spaghetti

Nach mehreren Iterationen habe ich in meine eigene Codebasis geschaut und sie nicht mehr wiedererkannt. Drei verschiedene Stellen, die auf drei verschiedene Arten dasselbe taten. Abstraktionen, die sich widersprachen. Module, die aneinander vorbei entworfen waren — jedes für sich sauber, zusammen ein Knoten.

Der klassische Reflex wäre Selbstkritik: schlechter geplant, zu schnell gebaut, hätte ich mal aufgeräumt. Aber je länger ich darauf geschaut habe, desto klarer wurde: Das ist kein Versagen von Disziplin. Es ist eine strukturelle Eigenschaft der Arbeitsweise.

Jede Claude-Code-Session beginnt mit einer Aufgabe. "Bau Feature X." "Fixe Bug Y." Und der Agent tut genau das — kompetent, zielstrebig und **aus der Perspektive dieser einen Aufgabe**. Der Kontext einer Session ist flüchtig: Die Architekturentscheidung aus Session 3 ist in Session 12 nicht mehr präsent. Die Konvention, die sich in Session 5 herausgebildet hat, kennt Session 9 nicht. Jede Session optimiert lokal, und die Summe lokal optimaler Entscheidungen ist kein global konsistentes System — sie ist Spaghetti mit ausgezeichneter Testabdeckung.

Anders gesagt: **Das Gesamtprojekt hat in der Session keinen Anwalt.** Der Agent vertritt die Aufgabe. Ich vertrete — im Idealfall — das Produkt. Aber niemand am Tisch vertritt die Architektur, die Konsistenz, das System als Ganzes. Bei menschlichen Teams übernehmen diese Rolle Strukturen, die über Jahrzehnte entstanden sind: Reviews, Architekturrunden, Definition of Done, das institutionelle Gedächtnis erfahrener Kollegen. In einer Agenten-Session existiert davon erst einmal: nichts.

## Warum "besser prompten" das nicht löst

Die naheliegenden Gegenmittel habe ich durchprobiert, und ich vermute, jeder ernsthafte Claude-Code-Nutzer kennt die Liste:

- **Eine CLAUDE.md mit Projektkontext und Konventionen.** Hilft — und skaliert nicht. Die Datei wächst, veraltet, und ab einer gewissen Länge konkurriert sie mit der eigentlichen Aufgabe um Aufmerksamkeit. Vor allem aber ist sie *beschreibend*, nicht *durchsetzend*: Nichts zwingt eine Session, sich daran zu halten, und niemand prüft es nach.
- **Disziplinierteres Prompten.** "Beachte die bestehende Architektur" ist ein frommer Wunsch, wenn die Session die bestehende Architektur gar nicht vollständig gesehen hat.
- **Regelmäßig aufräumen.** Das ist Refactoring als Dauerschuld — man bezahlt die Erosion nachträglich ab, statt sie zu verhindern. Bei einem Hobbyprojekt ärgerlich, in einem Produktivsystem ein Budgetposten.

Der gemeinsame Fehler aller drei Ansätze: Sie versuchen, ein Strukturproblem mit Verhalten zu lösen. Das funktioniert bei Menschen schon nicht — genau deshalb haben Teams Prozesse und verlassen sich nicht auf "wir passen alle gut auf".

## Jetzt multipliziere das mit einem Team

Bis hierhin ist das die Geschichte eines Solo-Entwicklers mit einem Wochenendprojekt. Der Grund, warum ich sie aufschreibe, ist die Multiplikation.

Was mir allein nach fünfzehn Sessions passiert ist, passiert einem Team von zehn Entwicklern, die alle produktiv mit Coding-Agenten arbeiten, in der ersten Woche. Zehn Personen, jede fährt mehrere Sessions am Tag, jede Session optimiert lokal — und die Frequenz, mit der Code entsteht, übersteigt die Frequenz, mit der irgendjemand das Gesamtbild prüfen kann, um ein Vielfaches. Der Engpass verschiebt sich sichtbar: **Code generieren ist billig geworden. Konsistenz, Nachvollziehbarkeit und Überblick sind der neue Engpass.**

Und in echten Unternehmen kommt verschärfend dazu, was mein Hobbyprojekt nicht hat:

- **Brownfield.** Die meisten Teams starten nicht auf der grünen Wiese, sondern in einer gewachsenen Codebasis, die *keine einzige Session je vollständig gesehen hat*. Jede Aufgabe wird gegen einen Ausschnitt gelöst; die Seiteneffekte auf den Rest bleiben dem Zufall überlassen.
- **Wissensverfall.** Die Verbindung zwischen Anforderung und Code lebt heute schon zu oft nur in Köpfen. Agenten verschärfen das: Der Chatverlauf, in dem eine Entscheidung fiel, ist nach der Session weg. Was bleibt, ist Code ohne Begründung.
- **Nachweispflichten.** Spätestens wenn Compliance fragt, welcher Standard für welches Release galt und wer welche Entscheidung getroffen hat, reicht "das hat der Agent so gebaut" nicht als Antwort.

Einzeln betrachtet sind das Tooling-Lücken. Zusammen ist es der Grund, warum viele Claude-Code-Pilotprojekte glänzen — und die Skalierung in die Breite dann stockt.

## Was strukturell nötig wäre

Ich habe lange nach etwas gesucht, das dieses Problem adressiert, und bin nicht fündig geworden. Was es gibt, sind zwei Kategorien, die beide am Thema vorbeigehen: Coding-Assistenten, die den *Durchsatz des Einzelnen* optimieren, und Prozess-Suiten, die *Tickets und Reporting* verwalten, aber vom Code nichts wissen. Die Lücke dazwischen — der Ort, an dem das Gesamtprojekt einen Anwalt bräuchte — bleibt leer.

Wie müsste eine Lösung aussehen? Produktneutral formuliert bin ich bei vier Anforderungen gelandet:

1. **Entscheidungen müssen das Ende der Session überleben.** Specs, Pläne, Review-Ergebnisse gehören als Artefakte ins Repository — versioniert, lesbar, neben den Code — nicht in einen flüchtigen Chatverlauf.
2. **Es braucht Rollen, die nicht bauen.** Die Instanz, die eine Idee hinterfragt, darf kein Interesse daran haben, sie umzusetzen. Die Instanz, die reviewt, darf nicht dieselbe sein, die geschrieben hat. Das ist bei Menschen Gewaltenteilung — bei Agenten ist es genauso nötig.
3. **Übergaben brauchen Gates, die Nein sagen können.** Ein Prozess, der unter Druck übersprungen werden kann, ist Folklore. Ein Gate, das die nächste Phase verweigert, solange die vorherige nicht sauber abgeschlossen ist, ist Struktur.
4. **Anforderungen müssen bis in den Code verfolgbar sein.** Wenn niemand mehr beantworten kann, welcher Code welche Anforderung erfüllt, ist das Wissen schon verloren — es fällt nur erst später auf.

Nichts davon ist eine neue Erkenntnis. Es ist das, was funktionierende Software-Teams seit Jahrzehnten tun. Neu ist nur die Einsicht, dass diese Strukturen nicht mitgeliefert werden, wenn man Agenten einführt — man muss sie explizit nachbauen, sonst arbeitet man mit einem sehr schnellen Team ohne jeden Prozess.

## Was ich daraus gebaut habe

An dieser Stelle die versprochene Transparenz: Ich habe auf diese vier Anforderungen hin ein Werkzeug gebaut, und natürlich bin ich befangen. [aSPARK](https://github.com/a-lottes/aSPARK) ist ein Open-Source-Plugin für Claude Code, das einem Projekt genau diese Struktur gibt: spezialisierte Rollen (ein Product Owner, der Ideen hinterfragt, ein Reviewer, der nicht gebaut hat, ein QA-Tester, der im echten Browser klickt), einen fünfphasigen Loop mit Gates und eine schriftliche Entscheidungsspur als Markdown-Artefakte im Repo.

Ob es hält, was das Konzept verspricht, habe ich am eigenen Projekt getestet: Datrivo-Features laufen inzwischen durch diesen Loop. Das Ergebnis war lehrreicher als erhofft — die Specify-Phase hat unter anderem eine veraltete Annahme aus meinem eigenen Backlog beerdigt, bevor Code entstand, und die Hands-on-QA fing zwei nutzersichtbare Bugs, die eine komplett grüne Test-Suite und ein bestandenes Code-Review übersehen hatten. Den vollständigen Erfahrungsbericht — ein echtes Feature, alle fünf Phasen, inklusive der Stellen, an denen der Loop mich ausgebremst hat — gibt es in einem [eigenen Beitrag](/de/blog/eine-person-ein-ganzes-team-aspark-agile-ki-delivery/).

Wichtiger als das Werkzeug ist mir aber der Punkt darunter: Selbst wenn aSPARK morgen verschwände, bliebe das Problem. Wer Coding-Agenten produktiv in der Breite einsetzen will — als Team, im Brownfield, mit Nachweispflichten — braucht *irgendeine* Antwort auf die Frage, wer das Gesamtprojekt vertritt, wenn jede Session nur ihre Aufgabe sieht.

## Offenes Ende

Datrivo ist noch nicht veröffentlicht — die Urlaubsfotos meiner Tochter sind übrigens wieder da. aSPARK ist Open Source und in Entwicklung. Und die Frage, wie ein Team zielführend und dauerhaft mit Coding-Agenten arbeitet, halte ich für eine der praktisch wichtigsten der nächsten Jahre — und für alles andere als abschließend beantwortet.

Wenn du das Problem aus deinem eigenen Projekt oder Team kennst — oder eine andere Lösung dafür gefunden hast — freue ich mich über Widerspruch, Erfahrungen und Diskussion.
