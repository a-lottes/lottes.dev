---
title: "Eine Person, ein ganzes Team: Wie aSPARK Claude Code in einen agilen Delivery-Prozess verwandelt"
description: Warum ich ein agiles KI-Team als Claude-Code-Plugin gebaut habe, wie der SPARK-Loop funktioniert und was geschah, als ein echtes Feature den Loop durchlief.
date: 2026-07-13
draft: false
translationKey: aspark-one-person-whole-team
tags:
  - agenten
  - agentische-workflows
  - claude-code
  - best-practices
---
**Coding-Agenten haben das Tempo-Problem gelöst. Das Zuverlässigkeits-Problem nicht.**

aSPARK ist meine Antwort auf diese Lücke: ein Claude-Code-Plugin, das einem einzelnen Entwickler ein komplettes agiles Team zur Seite stellt — Product Owner, Designer, Engineering Manager, Reviewer, QA-Tester, Release Manager — und jedes Feature durch einen Delivery-Loop mit Quality Gates schickt. Dieser Beitrag erklärt die Idee, führt durch den SPARK-Loop und teilt einen Erfahrungsbericht: ein echtes Feature, das in einem meiner eigenen Projekte durch den Loop gelaufen ist.

## Warum das wichtig ist

Wer heute mit einem Coding-Agenten arbeitet, ist schnell. Beängstigend schnell.

Aber als Solo-Entwickler bist du gleichzeitig auch Product Owner, Architekt, Reviewer und QA-Abteilung. In der Praxis bleiben einige dieser Hüte im Regal. Der Agent baut, was du bestellt hast — sofort, selbstbewusst, und ohne dass je jemand fragt, ob es das Richtige war, ob der Plan trug oder ob jemand jenseits des Happy Path getestet hat.

Das ist der stille Fehlermodus des "Vibe Coding": Der Engpass wandert vom Schreiben des Codes zu allem, was den Code umgibt. Tempo ist gelöst. Disziplin nicht.

## Die Idee: Rollen als Agenten, Zeremonien als Skills

Echte Software-Teams verlassen sich nicht auf einen brillanten Generalisten. Sie verlassen sich auf spezialisierte Rollen mit expliziten Übergaben: Jemand hinterfragt die Anforderungen, jemand plant, jemand baut, jemand reviewt, jemand testet, jemand liefert aus.

aSPARK übersetzt diese Struktur in Claude Code:

- **Sechs Agenten** verkörpern die Rollen: Product Owner, Designer, Engineering Manager, Reviewer, QA-Tester, Release Manager.
- **Skills bilden die Zeremonien**: `/story-time`, `/look-and-feel`, `/sprint-plan`, `/increment`, `/peer-review`, `/demo-day`, `/go-live`.
- **Ein Orchestrator**, `/spark`, fährt den ganzen Loop von Anfang bis Ende — und hält an jedem Gate für eine menschliche Entscheidung an.

Es geht nicht um Rollenspiel. Es geht um Gewaltenteilung: Der Agent, der den Code reviewt, ist nicht der Agent, der ihn geschrieben hat. Und der Agent, der deine Idee hinterfragt, hat kein Interesse daran, sie zu bauen.

## Der SPARK-Loop

Jedes Feature durchläuft fünf Phasen, und jede Phase endet an einem Gate:

1. **Specify** — der Product Owner nimmt die Idee ins Kreuzverhör und macht daraus eine Spec mit testbaren Akzeptanzkriterien; der Designer prüft die Usability, wo ein UI betroffen ist.
2. **Plan** — der Engineering Manager liefert eine Architekturentscheidung (inklusive verworfener Alternativen), einen geordneten Task-Breakdown und eine Teststrategie.
3. **Act** — das Inkrement wird gebaut, strikt entlang des freigegebenen Plans.
4. **Review** — ein Reviewer auditiert den Diff; ein QA-Tester prüft die laufende Anwendung in einem echten Browser, jenseits des Happy Path.
5. **Keep** — der Release Manager fährt Pre-Flight-Checks, schreibt den Changelog und liefert aus.

Zwei Eigenschaften machen daraus einen Prozess statt einer Prompt-Pipeline:

- **Jede Phase erzeugt ein Artefakt** — `spec.md`, `plan.md`, `review.md`, `qa.md`, `release.md` — abgelegt in einem `.spark/<feature>/`-Ordner in deinem Projekt. Die Entscheidungsspur ist lesbar, reviewbar und versionierbar.
- **Jedes Gate verlangt *deine* Entscheidung.** Der Loop schreitet nie aus eigener Autorität voran. Fällt ein Gate durch, eskaliert der Loop rückwärts — ein gescheitertes Review schickt die Arbeit zurück in den Plan oder den Build, nicht in den Merge.

Du bleibst der Mensch im Loop. Du hörst nur auf, die *einzige* Kontrollinstanz im Loop zu sein.

## Erfahrungsbericht: Ein Feature durch den Loop

Theorie ist billig. Hier ist also, was tatsächlich passierte, als ich ein echtes Feature in **Datrivo** durch aSPARK laufen liess — einem Foto-Recovery-Tool, das ich gerade baue (noch unveröffentlicht). Das Feature: Fotos in den modernen Formaten wiederherstellen, die iPhones und Android-Geräte heute erzeugen.

### Specify: die KI hat mein Backlog gegengeprüft

Ich startete `/story-time` mit einem — wie ich dachte — gut verstandenen Backlog-Eintrag, formuliert, wie Entwickler-Anfragen nun mal formuliert sind: als Lösung. "Wir brauchen einen echten Carver für dieses Format."

Zwei Dinge passierten, mit denen ich nicht gerechnet hatte.

Erstens weigerte sich der Product Owner, meine Lösung als Anforderung zu akzeptieren. Er übersetzte die Anfrage in das eigentliche Bedürfnis — *Nutzer müssen ihre Fotos intakt, korrekt benannt und ehrlich gelabelt zurückbekommen* — und hielt meine ursprüngliche Formulierung separat fest, wie es seine No-Solutions-Regel verlangt.

Zweitens, und bemerkenswerter: Der PO untersuchte die Codebasis und **widerlegte die Prämisse meines Backlog-Eintrags**. Das Problem, das ich zu haben glaubte — bestimmte Dateien würden gar nicht gefunden — war schon Monate zuvor gelöst worden. Die *tatsächlichen* Lücken waren andere: Ein Format wurde unter falschem Namen wiederhergestellt, und völlig intakte Fotos wurden als "möglicherweise unvollständig" markiert — was leise das Vertrauen der Nutzer untergräbt.

Das Feature wurde neu zugeschnitten, bevor eine einzige Zeile Code entstand. Allein hätte ich eine Lösung für ein Problem gebaut, das nicht mehr existierte.

Die Specify-Phase brachte außerdem drei explizite Entscheidungen hervor, die am Gate an mich eskaliert wurden — darunter das bewusste Verschieben einer Teilanforderung in einen späteren Zyklus, dokumentiert als eigene "Won't, this cycle"-Story, damit das *Nein* festgehalten und nicht vergessen wird. Das Designer-Review wurde mit schriftlicher Begründung als N/A markiert (kein neues UI) — statt stillschweigend übersprungen.

### Plan: eine Entscheidung ohne Alternativen ist eine Vermutung

`/sprint-plan` übergab die freigegebene Spec an den Engineering Manager, und der resultierende Plan überraschte mich auf andere Weise: nicht durch das, was er entschied, sondern durch das, was er *dokumentierte*.

Die Architekturentscheidung kam mit drei explizit verworfenen Alternativen, jede mit Begründung. Die billigste Option — das Bestehende flicken — wurde verworfen, weil sie die Akzeptanzkriterien der Spec nachweislich nicht erfüllen konnte. Eine externe Bibliothek einzubinden wurde nach der Regel verworfen, dass jede Abhängigkeit eine Bürde ist — der Teil, den wir wirklich brauchten, war klein genug, um ihn selbst zu besitzen. Und die Maximallösung — vollständige Validierung mit schwergewichtigen Abhängigkeiten — wurde als Gold-Plating verworfen, unverhältnismäßig für das Feature. Das Plan-Gate erzwingt das wörtlich: *"a decision without alternatives is a guess."*

Der Rest des Plans folgte derselben Disziplin. Acht geordnete Tasks, jeder einer User Story zugeordnet, jeder mit prüfbarer Definition of Done — und die Story, die wir in Specify verschoben hatten, bekam überhaupt keine Tasks, *by design*. Die Teststrategie benannte explizit, was automatisierte Tests nicht beweisen können (öffnet sich das wiederhergestellte Foto für einen echten Nutzer?), und delegierte genau das an die manuelle QA-Session — mit schriftlicher Begründung, warum das der verhältnismäßige Check ist und keine Abkürzung.

Mein Lieblingsdetail stand in der Risikotabelle: Das höchstgerankte Risiko war, dass das neue "ehrliche" Vollständigkeits-Label selbst lügen könnte. Die Gegenmassnahme als Regel: im Zweifel konservativ — niemals fälschlich Erfolg melden. Ein Team, das die Fehlermodi seiner eigenen Vertrauenssignale einplant, macht etwas richtig.

### Act: eine Abweichung wird dokumentiert, nicht eingeschmuggelt

`/increment` arbeitete die acht Tasks der Reihe nach ab, und der Build selbst war ereignislos — genau das ist der Sinn eines guten Plans. Der interessante Moment war ein Konflikt: Zwei Aussagen in den freigegebenen Dokumenten widersprachen sich in einem Randfall. Beide hatten Gates passiert. Ein Solo-Entwickler im Flow hätte stillschweigend eine gewählt und wäre weitergezogen.

Stattdessen löste der Builder den Konflikt zugunsten der *testbaren* Akzeptanzkriterien auf, hielt die Abweichung samt Begründung im Plan fest und deckte die Entscheidung mit einem Test ab. Später beurteilte der Reviewer diese Abweichung explizit und akzeptierte sie schriftlich. Nichts wurde eingeschmuggelt; jede Abweichung vom Plan hinterliess eine Spur, die jemand anderes auditieren kann.

### Review: die Risikotabelle wurde wahr

`/peer-review` las nicht nur den Diff. Der Reviewer liess die volle Test-Suite laufen und schrieb dann seine *eigene* Sonde, um Randfälle zu prüfen, die die eingecheckten Tests nicht abdeckten — und diese Sonde fand etwas, das die Tests des Entwicklers übersehen hatten.

Der Fund war exakt der Fehlermodus, den die Risikotabelle des Plans vorhergesagt hatte: ein Randfall, in dem eine beschädigte Datei fälschlich als intakt gemeldet worden wäre. Das Eine, wofür das Feature existierte — ein Vertrauenssignal, das nicht lügt — hatte ein Loch. Der Begleitfund war die passende Testlücke: der Grund, *wie* das Loch durchgerutscht war.

Genauso aufschlussreich war, was der Reviewer als Nächstes tat: nichts. Weil der Fix eine Design-Entscheidung beinhaltete, gingen die Findings zurück an den Entwickler, statt vom Reviewer an Ort und Stelle geflickt zu werden. Fix, Re-Review, zwei neue Tests, die das Verhalten festnageln. Zwei kosmetische Nits blieben offen — dokumentiert und explizit akzeptiert, statt stillschweigend vergessen.

### QA: das Review bestand — und die Demo fiel trotzdem durch

Das hier ist der Teil, der mich überzeugt hat, dass die Rollen wirklich Unterschiedliches sehen.

Das Code-Review war bestanden. Dann liess `/demo-day` das tatsächlich kompilierte Produkt so laufen, wie ein Nutzer es tun würde — und **liess es am Gate durchfallen**, mit zwei Major-Bugs:

- Dateien, die wie echte Daten geformt waren (nicht wie die vereinfachten Test-Fixtures), wurden falsch identifiziert und erzeugten ein Phantom-Duplikat unter falschem Namen — exakt die Bug-Klasse, zu deren Beseitigung das Feature gebaut wurde.
- Das ehrliche Vollständigkeits-Signal — das Herzstück des ganzen Features — wurde intern korrekt berechnet, war aber *im tatsächlichen Output des Produkts unsichtbar*. Jeder Unit-Test grün; ein echter Nutzer hätte das Feature nie funktionieren sehen.

Der Loop tat, wofür ein Loop da ist: Er eskalierte zurück in die Build-Phase, und nach den Fixes testete QA alles erneut — Runde zwei bestand, mit der Frage, die sich der QA-Agent selbst stellt: *"Would I demo this to a stakeholder right now? Yes."*

QA dokumentierte außerdem, was sich mit synthetischen Testdaten *nicht* verifizieren liess, und hielt es als bekannte Einschränkung fest, statt es zu überspielen — eine ehrliche Grenze statt eines grünen Häkchens.

Die Lektion, zu der ich immer wieder zurückkomme: Der Reviewer fand einen Bug im *Code*; QA fand Bugs im *Produkt*. Keiner hätte die Funde des anderen gemacht. Das ist das Argument für getrennte Rollen in einem Satz.

### Keep: das Release, das sich weigert, sich selbst zu pushen

`/go-live` schloss den Zyklus — und verhielt sich weniger wie ein übereifriges Deploy-Skript als wie ein sorgfältiger Release Manager. Die Pre-Flight-Checks liefen *frisch* auf dem Release-Commit, statt aus den früheren Reports kopiert zu werden: noch einmal die volle Test-Suite, noch einmal beide Builds, plus die Prüfung, dass nichts Fremdes mit hineingeraten war. Der Changelog kam in Nutzersprache heraus — was können Nutzer jetzt, was vorher nicht ging — Commit-Hashes und Jargon ausdrücklich verboten.

Zwei Details stachen heraus. Der Release-Commit war bewusst eng geschnitten: nur die Dateien des Features, über explizite Pfade gestaged, während bekannte Altlasten anderswo im Repo als Follow-ups notiert wurden, statt sie ins Release zu kehren. Und der Rollback-Pfad wurde niedergeschrieben, *bevor* irgendetwas ausgeliefert wird — unter der Regel, die im Artefakt selbst steht: *"a release you can't roll back is a bet, not a release"* — inklusive einer Fix-Forward-Regel: Ein Defekt nach dem Release geht durch den gesamten Loop als nächste Version, nie als Hot-Patch auf dem Release-Commit.

Der allerletzte Schritt ist mein Favorit. Der Release Manager bereitete alles vor — Versions-Bump, eng geschnittener Commit, lokaler Tag — und *hielt dann an*. Jeder nach aussen gerichtete Befehl (Push, PR, Publish) steht vorbereitet in der Release-Notiz, wurde aber ausdrücklich nicht ausgeführt und wartet auf das Go des Nutzers. Da Datrivo noch nicht öffentlich ist, ruht der Zyklus genau dort: done-done — bis auf den Knopfdruck. Und genau das ist der Punkt: Der Loop vollzieht den einen irreversiblen Schritt nie aus eigener Autorität.

Und weil Keep das K in SPARK ist, hielt die Phase die Learnings des Zyklus fest: was gut lief (der Hands-on-QA-Schritt hat sich bezahlt gemacht), was wir anders machen würden (adversariale Tests gehören *zum* Code, nicht erst dazu, nachdem ein Reviewer das Loch findet) und wiederverwendbare Muster für künftige Zyklen — inklusive der Lektion, die uns QA beibrachte: Berechne nie ein Qualitätssignal, ohne auch zu beweisen, dass es den Nutzer erreicht.

### Was die Gates insgesamt gefangen haben

Ein Feature, ein Zyklus: eine veraltete Backlog-Prämisse beerdigt, bevor Code entstand; eine Lösung in ein Bedürfnis rückübersetzt; drei Architektur-Alternativen schriftlich verworfen; ein Plan-Konflikt transparent aufgelöst; ein Loch im Vertrauenssignal vom Review gefunden; zwei nutzersichtbare Major-Bugs von Hands-on-QA gefangen, nachdem das Review bereits bestanden war; und ein Release mit schriftlichem Rollback-Pfad und festgehaltenen Learnings vorbereitet — das kurz vor dem einen irreversiblen Schritt anhält, der menschlich bleibt. Jeder einzelne dieser Fänge passierte *vor* dem Release — und jeder steht in fünf Markdown-Dateien, die ich in sechs Monaten wieder nachlesen kann.

## Wann sich der Overhead lohnt — und wann nicht

Eine ehrliche Einordnung, denn ein Prozess mit Gates ist nicht gratis:

**Lohnt sich:** Features mit echtem Risiko — alles, was Datenintegrität berührt, alles Nutzersichtbare, alles, wo dich "scheint zu funktionieren" schon einmal verbrannt hat. Im Datrivo-Beispiel hat sich die Specify-Phase allein dadurch bezahlt gemacht, dass sie eine veraltete Annahme beerdigte, bevor sie zu Code wurde — und Demo-Day fing zwei nutzersichtbare Bugs, die eine komplett grüne Test-Suite und ein bestandenes Code-Review übersehen hatten.

**Lohnt sich nicht:** Einzeiler-Fixes, Typos, mechanische Refactorings. Eine Sechs-Rollen-Zeremonie über einen `README`-Typo zu fahren ist Theater. aSPARK ist bewusst modular — du kannst eine einzelne Phase aufrufen (etwa nur `/peer-review` auf einen Diff), ohne den ganzen Loop.

Meine Daumenregel: Wenn ich mir von einem menschlichen Kollegen ein zweites Paar Augen wünschen würde, fährt der Loop.

## Loslegen

aSPARK ist Open Source und installiert sich als Claude-Code-Plugin mit zwei Befehlen:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Danach entweder einzelne Zeremonien pro Phase aufrufen — oder `/spark` starten und das ganze Team ein Feature von der Idee bis zum Release tragen lassen, während du an jedem Gate entscheidest.

Das Repository mit vollständiger Dokumentation der Agenten, Skills und Gate-Regeln: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK)

## Fazit

Coding-Agenten haben das Bauen schnell gemacht. aSPARK ist mein Versuch, es *vertrauenswürdig* zu machen — nicht indem der Agent gebremst wird, sondern indem er von derselben Struktur umgeben wird, die menschliche Teams zuverlässig macht: spezialisierte Rollen, explizite Übergaben, Quality Gates und eine schriftliche Entscheidungsspur.

In einem Satz:

Eine Person plus aSPARK arbeitet wie ein ganzes Team — und der Unterschied zeigt sich nicht darin, wie schnell du baust, sondern darin, was du fängst, bevor du baust.

Feedback, Issues und Pull Requests sind herzlich willkommen.
