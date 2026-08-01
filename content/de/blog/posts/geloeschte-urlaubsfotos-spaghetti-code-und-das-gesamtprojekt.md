---
title: "Geloeschte Urlaubsfotos, Spaghetti-Code und die Frage, wer eigentlich das Gesamtprojekt im Blick hat"
description: Wie geloeschte Urlaubsbilder zu einem Open-Source-Tool fuehrten — und warum mir dabei klar wurde, dass produktive Teamarbeit mit Coding-Agenten ein strukturelles Problem hat, das niemand mit Disziplin loest.
date: 2026-08-01
draft: false
translationKey: deleted-photos-spaghetti-code-whole-project
tags:
  - agenten
  - agentische-workflows
  - claude-code
  - best-practices
---
**Das hier ist keine Produktvorstellung. Es ist die Geschichte eines Problems, das mich zwei Projekte gekostet haette — und das jedes Team trifft, das Coding-Agenten nicht mehr nur ausprobiert, sondern produktiv in der Breite einsetzen will.**

## Es beginnt mit einer Digitalkamera

Meine Tochter hat im Urlaub die Fotos auf ihrer Digitalkamera geloescht. Versehentlich, unwiderruflich — dachte sie. Wer schon einmal in die Verlegenheit kam, geloeschte Bilder von einer SD-Karte retten zu wollen, kennt den Markt, der sich dann auftut: Tools, die erst nach der Analyse verraten, dass die Wiederherstellung Geld kostet. Tools mit Oberflaechen aus einer anderen Dekade. Tools, bei denen man als Elternteil nicht sicher sagen kann, ob sie die Karte retten oder endgueltig ruinieren.

Ich habe kein Werkzeug gefunden, das kostenfrei war *und* einfach genug, dass man es einem Menschen ohne Terminal-Erfahrung in die Hand geben koennte. Also habe ich beschlossen, selbst eins zu bauen: [Datrivo](https://datrivo.app) — ein Foto-Recovery-Tool, das Open Source erscheinen soll, damit das naechste Elternteil in dieser Situation eine ehrliche, kostenlose Option hat.

So weit die schoene Geschichte. Der eigentliche Anlass fuer diesen Text ist, was *beim Bauen* passiert ist.

## Die Flitterwochen

Ich entwickle Datrivo mit Claude Code, und die ersten Wochen waren genau das, was die Begeisterung um Coding-Agenten verspricht. Ein Datei-Carver fuer ein Format, das ich vorher nie im Hexeditor gesehen hatte: ein Nachmittag. Eine GUI, die meine Zielgruppe nicht ueberfordert: ein Abend. Features, die mich frueher eine Woche Feierabende gekostet haetten, entstanden in Stunden.

Das will ich nicht kleinreden, und wer das noch nicht erlebt hat, sollte es erleben: Die Geschwindigkeit ist real. Genau deshalb ist das, was danach kam, so tueckisch — es fuehlt sich naemlich lange nicht wie ein Problem an.

## Der Bruch: lokal brillant, global Spaghetti

Nach mehreren Iterationen habe ich in meine eigene Codebasis geschaut und sie nicht mehr wiedererkannt. Drei verschiedene Stellen, die auf drei verschiedene Arten dasselbe taten. Abstraktionen, die sich widersprachen. Module, die aneinander vorbei entworfen waren — jedes fuer sich sauber, zusammen ein Knoten.

Der klassische Reflex waere Selbstkritik: schlechter geplant, zu schnell gebaut, haette ich mal aufgeraeumt. Aber je laenger ich darauf geschaut habe, desto klarer wurde: Das ist kein Versagen von Disziplin. Es ist eine strukturelle Eigenschaft der Arbeitsweise.

Jede Claude-Code-Session beginnt mit einer Aufgabe. "Bau Feature X." "Fixe Bug Y." Und der Agent tut genau das — kompetent, zielstrebig und **aus der Perspektive dieser einen Aufgabe**. Der Kontext einer Session ist fluechtig: Die Architekturentscheidung aus Session 3 ist in Session 12 nicht mehr praesent. Die Konvention, die sich in Session 5 herausgebildet hat, kennt Session 9 nicht. Jede Session optimiert lokal, und die Summe lokal optimaler Entscheidungen ist kein global konsistentes System — sie ist Spaghetti mit ausgezeichneter Testabdeckung.

Anders gesagt: **Das Gesamtprojekt hat in der Session keinen Anwalt.** Der Agent vertritt die Aufgabe. Ich vertrete — im Idealfall — das Produkt. Aber niemand am Tisch vertritt die Architektur, die Konsistenz, das System als Ganzes. Bei menschlichen Teams uebernehmen diese Rolle Strukturen, die ueber Jahrzehnte entstanden sind: Reviews, Architekturrunden, Definition of Done, das institutionelle Gedaechtnis erfahrener Kollegen. In einer Agenten-Session existiert davon erst einmal: nichts.

## Warum "besser prompten" das nicht loest

Die naheliegenden Gegenmittel habe ich durchprobiert, und ich vermute, jeder ernsthafte Claude-Code-Nutzer kennt die Liste:

- **Eine CLAUDE.md mit Projektkontext und Konventionen.** Hilft — und skaliert nicht. Die Datei waechst, veraltet, und ab einer gewissen Laenge konkurriert sie mit der eigentlichen Aufgabe um Aufmerksamkeit. Vor allem aber ist sie *beschreibend*, nicht *durchsetzend*: Nichts zwingt eine Session, sich daran zu halten, und niemand prueft es nach.
- **Disziplinierteres Prompten.** "Beachte die bestehende Architektur" ist ein frommer Wunsch, wenn die Session die bestehende Architektur gar nicht vollstaendig gesehen hat.
- **Regelmaessig aufraeumen.** Das ist Refactoring als Dauerschuld — man bezahlt die Erosion nachtraeglich ab, statt sie zu verhindern. Bei einem Hobbyprojekt aergerlich, in einem Produktivsystem ein Budgetposten.

Der gemeinsame Fehler aller drei Ansaetze: Sie versuchen, ein Strukturproblem mit Verhalten zu loesen. Das funktioniert bei Menschen schon nicht — genau deshalb haben Teams Prozesse und verlassen sich nicht auf "wir passen alle gut auf".

## Jetzt multipliziere das mit einem Team

Bis hierhin ist das die Geschichte eines Solo-Entwicklers mit einem Wochenendprojekt. Der Grund, warum ich sie aufschreibe, ist die Multiplikation.

Was mir allein nach fuenfzehn Sessions passiert ist, passiert einem Team von zehn Entwicklern, die alle produktiv mit Coding-Agenten arbeiten, in der ersten Woche. Zehn Personen, jede faehrt mehrere Sessions am Tag, jede Session optimiert lokal — und die Frequenz, mit der Code entsteht, uebersteigt die Frequenz, mit der irgendjemand das Gesamtbild pruefen kann, um ein Vielfaches. Der Engpass verschiebt sich sichtbar: **Code generieren ist billig geworden. Konsistenz, Nachvollziehbarkeit und Ueberblick sind der neue Engpass.**

Und in echten Unternehmen kommt verschaerfend dazu, was mein Hobbyprojekt nicht hat:

- **Brownfield.** Die meisten Teams starten nicht auf der gruenen Wiese, sondern in einer gewachsenen Codebasis, die *keine einzige Session je vollstaendig gesehen hat*. Jede Aufgabe wird gegen einen Ausschnitt geloest; die Seiteneffekte auf den Rest bleiben dem Zufall ueberlassen.
- **Wissensverfall.** Die Verbindung zwischen Anforderung und Code lebt heute schon zu oft nur in Koepfen. Agenten verschaerfen das: Der Chatverlauf, in dem eine Entscheidung fiel, ist nach der Session weg. Was bleibt, ist Code ohne Begruendung.
- **Nachweispflichten.** Spaetestens wenn Compliance fragt, welcher Standard fuer welches Release galt und wer welche Entscheidung getroffen hat, reicht "das hat der Agent so gebaut" nicht als Antwort.

Einzeln betrachtet sind das Tooling-Luecken. Zusammen ist es der Grund, warum viele Claude-Code-Pilotprojekte glaenzen — und die Skalierung in die Breite dann stockt.

## Was strukturell noetig waere

Ich habe lange nach etwas gesucht, das dieses Problem adressiert, und bin nicht fuendig geworden. Was es gibt, sind zwei Kategorien, die beide am Thema vorbeigehen: Coding-Assistenten, die den *Durchsatz des Einzelnen* optimieren, und Prozess-Suiten, die *Tickets und Reporting* verwalten, aber vom Code nichts wissen. Die Luecke dazwischen — der Ort, an dem das Gesamtprojekt einen Anwalt braeuchte — bleibt leer.

Wie muesste eine Loesung aussehen? Produktneutral formuliert bin ich bei vier Anforderungen gelandet:

1. **Entscheidungen muessen das Ende der Session ueberleben.** Specs, Plaene, Review-Ergebnisse gehoeren als Artefakte ins Repository — versioniert, lesbar, neben den Code — nicht in einen fluechtigen Chatverlauf.
2. **Es braucht Rollen, die nicht bauen.** Die Instanz, die eine Idee hinterfragt, darf kein Interesse daran haben, sie umzusetzen. Die Instanz, die reviewt, darf nicht dieselbe sein, die geschrieben hat. Das ist bei Menschen Gewaltenteilung — bei Agenten ist es genauso noetig.
3. **Uebergaben brauchen Gates, die Nein sagen koennen.** Ein Prozess, der unter Druck uebersprungen werden kann, ist Folklore. Ein Gate, das die naechste Phase verweigert, solange die vorherige nicht sauber abgeschlossen ist, ist Struktur.
4. **Anforderungen muessen bis in den Code verfolgbar sein.** Wenn niemand mehr beantworten kann, welcher Code welche Anforderung erfuellt, ist das Wissen schon verloren — es faellt nur erst spaeter auf.

Nichts davon ist eine neue Erkenntnis. Es ist das, was funktionierende Software-Teams seit Jahrzehnten tun. Neu ist nur die Einsicht, dass diese Strukturen nicht mitgeliefert werden, wenn man Agenten einfuehrt — man muss sie explizit nachbauen, sonst arbeitet man mit einem sehr schnellen Team ohne jeden Prozess.

## Was ich daraus gebaut habe

An dieser Stelle die versprochene Transparenz: Ich habe auf diese vier Anforderungen hin ein Werkzeug gebaut, und natuerlich bin ich befangen. [aSPARK](https://github.com/a-lottes/aSPARK) ist ein Open-Source-Plugin fuer Claude Code, das einem Projekt genau diese Struktur gibt: spezialisierte Rollen (ein Product Owner, der Ideen hinterfragt, ein Reviewer, der nicht gebaut hat, ein QA-Tester, der im echten Browser klickt), einen fuenfphasigen Loop mit Gates und eine schriftliche Entscheidungsspur als Markdown-Artefakte im Repo.

Ob es haelt, was das Konzept verspricht, habe ich am eigenen Projekt getestet: Datrivo-Features laufen inzwischen durch diesen Loop. Das Ergebnis war lehrreicher als erhofft — die Specify-Phase hat unter anderem eine veraltete Annahme aus meinem eigenen Backlog beerdigt, bevor Code entstand, und die Hands-on-QA fing zwei nutzersichtbare Bugs, die eine komplett gruene Test-Suite und ein bestandenes Code-Review uebersehen hatten. Den vollstaendigen Erfahrungsbericht — ein echtes Feature, alle fuenf Phasen, inklusive der Stellen, an denen der Loop mich ausgebremst hat — gibt es in einem [eigenen Beitrag](/de/blog/eine-person-ein-ganzes-team-aspark-agile-ki-delivery/).

Wichtiger als das Werkzeug ist mir aber der Punkt darunter: Selbst wenn aSPARK morgen verschwaende, bliebe das Problem. Wer Coding-Agenten produktiv in der Breite einsetzen will — als Team, im Brownfield, mit Nachweispflichten — braucht *irgendeine* Antwort auf die Frage, wer das Gesamtprojekt vertritt, wenn jede Session nur ihre Aufgabe sieht.

## Offenes Ende

Datrivo ist noch nicht veroeffentlicht — die Urlaubsfotos meiner Tochter sind uebrigens wieder da. aSPARK ist Open Source und in Entwicklung. Und die Frage, wie ein Team zielfuehrend und dauerhaft mit Coding-Agenten arbeitet, halte ich fuer eine der praktisch wichtigsten der naechsten Jahre — und fuer alles andere als abschliessend beantwortet.

Wenn du das Problem aus deinem eigenen Projekt oder Team kennst — oder eine andere Loesung dafuer gefunden hast — freue ich mich ueber Widerspruch, Erfahrungen und Diskussion.
