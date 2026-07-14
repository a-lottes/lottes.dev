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
**Coding-Agenten haben das Tempo-Problem geloest. Das Zuverlaessigkeits-Problem nicht.**

aSPARK ist meine Antwort auf diese Luecke: ein Claude-Code-Plugin, das einem einzelnen Entwickler ein komplettes agiles Team zur Seite stellt — Product Owner, Designer, Engineering Manager, Reviewer, QA-Tester, Release Manager — und jedes Feature durch einen Delivery-Loop mit Quality Gates schickt. Dieser Beitrag erklaert die Idee, fuehrt durch den SPARK-Loop und teilt einen Erfahrungsbericht: ein echtes Feature, das in einem meiner eigenen Projekte durch den Loop gelaufen ist.

## Warum das wichtig ist

Wer heute mit einem Coding-Agenten arbeitet, ist schnell. Beaengstigend schnell.

Aber als Solo-Entwickler bist du gleichzeitig auch Product Owner, Architekt, Reviewer und QA-Abteilung. In der Praxis bleiben einige dieser Huete im Regal. Der Agent baut, was du bestellt hast — sofort, selbstbewusst, und ohne dass je jemand fragt, ob es das Richtige war, ob der Plan trug oder ob jemand jenseits des Happy Path getestet hat.

Das ist der stille Fehlermodus des "Vibe Coding": Der Engpass wandert vom Schreiben des Codes zu allem, was den Code umgibt. Tempo ist geloest. Disziplin nicht.

## Die Idee: Rollen als Agenten, Zeremonien als Skills

Echte Software-Teams verlassen sich nicht auf einen brillanten Generalisten. Sie verlassen sich auf spezialisierte Rollen mit expliziten Uebergaben: Jemand hinterfragt die Anforderungen, jemand plant, jemand baut, jemand reviewt, jemand testet, jemand liefert aus.

aSPARK uebersetzt diese Struktur in Claude Code:

- **Sechs Agenten** verkoerpern die Rollen: Product Owner, Designer, Engineering Manager, Reviewer, QA-Tester, Release Manager.
- **Skills bilden die Zeremonien**: `/story-time`, `/look-and-feel`, `/sprint-plan`, `/increment`, `/peer-review`, `/demo-day`, `/go-live`.
- **Ein Orchestrator**, `/spark`, faehrt den ganzen Loop von Anfang bis Ende — und haelt an jedem Gate fuer eine menschliche Entscheidung an.

Es geht nicht um Rollenspiel. Es geht um Gewaltenteilung: Der Agent, der den Code reviewt, ist nicht der Agent, der ihn geschrieben hat. Und der Agent, der deine Idee hinterfragt, hat kein Interesse daran, sie zu bauen.

## Der SPARK-Loop

Jedes Feature durchlaeuft fuenf Phasen, und jede Phase endet an einem Gate:

1. **Specify** — der Product Owner nimmt die Idee ins Kreuzverhoer und macht daraus eine Spec mit testbaren Akzeptanzkriterien; der Designer prueft die Usability, wo ein UI betroffen ist.
2. **Plan** — der Engineering Manager liefert eine Architekturentscheidung (inklusive verworfener Alternativen), einen geordneten Task-Breakdown und eine Teststrategie.
3. **Act** — das Inkrement wird gebaut, strikt entlang des freigegebenen Plans.
4. **Review** — ein Reviewer auditiert den Diff; ein QA-Tester prueft die laufende Anwendung in einem echten Browser, jenseits des Happy Path.
5. **Keep** — der Release Manager faehrt Pre-Flight-Checks, schreibt den Changelog und liefert aus.

Zwei Eigenschaften machen daraus einen Prozess statt einer Prompt-Pipeline:

- **Jede Phase erzeugt ein Artefakt** — `spec.md`, `plan.md`, `review.md`, `qa.md`, `release.md` — abgelegt in einem `.spark/<feature>/`-Ordner in deinem Projekt. Die Entscheidungsspur ist lesbar, reviewbar und versionierbar.
- **Jedes Gate verlangt *deine* Entscheidung.** Der Loop schreitet nie aus eigener Autoritaet voran. Faellt ein Gate durch, eskaliert der Loop rueckwaerts — ein gescheitertes Review schickt die Arbeit zurueck in den Plan oder den Build, nicht in den Merge.

Du bleibst der Mensch im Loop. Du hoerst nur auf, die *einzige* Kontrollinstanz im Loop zu sein.

## Erfahrungsbericht: Ein Feature durch den Loop

Theorie ist billig. Hier ist also, was tatsaechlich passierte, als ich ein echtes Feature in **Datrivo** durch aSPARK laufen liess — einem Foto-Recovery-Tool, das ich gerade baue (noch unveroeffentlicht). Das Feature: Fotos in den modernen Formaten wiederherstellen, die iPhones und Android-Geraete heute erzeugen.

### Specify: die KI hat mein Backlog gegengeprueft

Ich startete `/story-time` mit einem — wie ich dachte — gut verstandenen Backlog-Eintrag, formuliert, wie Entwickler-Anfragen nun mal formuliert sind: als Loesung. "Wir brauchen einen echten Carver fuer dieses Format."

Zwei Dinge passierten, mit denen ich nicht gerechnet hatte.

Erstens weigerte sich der Product Owner, meine Loesung als Anforderung zu akzeptieren. Er uebersetzte die Anfrage in das eigentliche Beduerfnis — *Nutzer muessen ihre Fotos intakt, korrekt benannt und ehrlich gelabelt zurueckbekommen* — und hielt meine urspruengliche Formulierung separat fest, wie es seine No-Solutions-Regel verlangt.

Zweitens, und bemerkenswerter: Der PO untersuchte die Codebasis und **widerlegte die Praemisse meines Backlog-Eintrags**. Das Problem, das ich zu haben glaubte — bestimmte Dateien wuerden gar nicht gefunden — war schon Monate zuvor geloest worden. Die *tatsaechlichen* Luecken waren andere: Ein Format wurde unter falschem Namen wiederhergestellt, und voellig intakte Fotos wurden als "moeglicherweise unvollstaendig" markiert — was leise das Vertrauen der Nutzer untergraebt.

Das Feature wurde neu zugeschnitten, bevor eine einzige Zeile Code entstand. Allein haette ich eine Loesung fuer ein Problem gebaut, das nicht mehr existierte.

Die Specify-Phase brachte ausserdem drei explizite Entscheidungen hervor, die am Gate an mich eskaliert wurden — darunter das bewusste Verschieben einer Teilanforderung in einen spaeteren Zyklus, dokumentiert als eigene "Won't, this cycle"-Story, damit das *Nein* festgehalten und nicht vergessen wird. Das Designer-Review wurde mit schriftlicher Begruendung als N/A markiert (kein neues UI) — statt stillschweigend uebersprungen.

### Plan: eine Entscheidung ohne Alternativen ist eine Vermutung

`/sprint-plan` uebergab die freigegebene Spec an den Engineering Manager, und der resultierende Plan ueberraschte mich auf andere Weise: nicht durch das, was er entschied, sondern durch das, was er *dokumentierte*.

Die Architekturentscheidung kam mit drei explizit verworfenen Alternativen, jede mit Begruendung. Die billigste Option — das Bestehende flicken — wurde verworfen, weil sie die Akzeptanzkriterien der Spec nachweislich nicht erfuellen konnte. Eine externe Bibliothek einzubinden wurde nach der Regel verworfen, dass jede Abhaengigkeit eine Buerde ist — der Teil, den wir wirklich brauchten, war klein genug, um ihn selbst zu besitzen. Und die Maximalloesung — vollstaendige Validierung mit schwergewichtigen Abhaengigkeiten — wurde als Gold-Plating verworfen, unverhaeltnismaessig fuer das Feature. Das Plan-Gate erzwingt das woertlich: *"a decision without alternatives is a guess."*

Der Rest des Plans folgte derselben Disziplin. Acht geordnete Tasks, jeder einer User Story zugeordnet, jeder mit pruefbarer Definition of Done — und die Story, die wir in Specify verschoben hatten, bekam ueberhaupt keine Tasks, *by design*. Die Teststrategie benannte explizit, was automatisierte Tests nicht beweisen koennen (oeffnet sich das wiederhergestellte Foto fuer einen echten Nutzer?), und delegierte genau das an die manuelle QA-Session — mit schriftlicher Begruendung, warum das der verhaeltnismaessige Check ist und keine Abkuerzung.

Mein Lieblingsdetail stand in der Risikotabelle: Das hoechstgerankte Risiko war, dass das neue "ehrliche" Vollstaendigkeits-Label selbst luegen koennte. Die Gegenmassnahme als Regel: im Zweifel konservativ — niemals faelschlich Erfolg melden. Ein Team, das die Fehlermodi seiner eigenen Vertrauenssignale einplant, macht etwas richtig.

### Act: eine Abweichung wird dokumentiert, nicht eingeschmuggelt

`/increment` arbeitete die acht Tasks der Reihe nach ab, und der Build selbst war ereignislos — genau das ist der Sinn eines guten Plans. Der interessante Moment war ein Konflikt: Zwei Aussagen in den freigegebenen Dokumenten widersprachen sich in einem Randfall. Beide hatten Gates passiert. Ein Solo-Entwickler im Flow haette stillschweigend eine gewaehlt und waere weitergezogen.

Stattdessen loeste der Builder den Konflikt zugunsten der *testbaren* Akzeptanzkriterien auf, hielt die Abweichung samt Begruendung im Plan fest und deckte die Entscheidung mit einem Test ab. Spaeter beurteilte der Reviewer diese Abweichung explizit und akzeptierte sie schriftlich. Nichts wurde eingeschmuggelt; jede Abweichung vom Plan hinterliess eine Spur, die jemand anderes auditieren kann.

### Review: die Risikotabelle wurde wahr

`/peer-review` las nicht nur den Diff. Der Reviewer liess die volle Test-Suite laufen und schrieb dann seine *eigene* Sonde, um Randfaelle zu pruefen, die die eingecheckten Tests nicht abdeckten — und diese Sonde fand etwas, das die Tests des Entwicklers uebersehen hatten.

Der Fund war exakt der Fehlermodus, den die Risikotabelle des Plans vorhergesagt hatte: ein Randfall, in dem eine beschaedigte Datei faelschlich als intakt gemeldet worden waere. Das Eine, wofuer das Feature existierte — ein Vertrauenssignal, das nicht luegt — hatte ein Loch. Der Begleitfund war die passende Testluecke: der Grund, *wie* das Loch durchgerutscht war.

Genauso aufschlussreich war, was der Reviewer als Naechstes tat: nichts. Weil der Fix eine Design-Entscheidung beinhaltete, gingen die Findings zurueck an den Entwickler, statt vom Reviewer an Ort und Stelle geflickt zu werden. Fix, Re-Review, zwei neue Tests, die das Verhalten festnageln. Zwei kosmetische Nits blieben offen — dokumentiert und explizit akzeptiert, statt stillschweigend vergessen.

### QA: das Review bestand — und die Demo fiel trotzdem durch

Das hier ist der Teil, der mich ueberzeugt hat, dass die Rollen wirklich Unterschiedliches sehen.

Das Code-Review war bestanden. Dann liess `/demo-day` das tatsaechlich kompilierte Produkt so laufen, wie ein Nutzer es tun wuerde — und **liess es am Gate durchfallen**, mit zwei Major-Bugs:

- Dateien, die wie echte Daten geformt waren (nicht wie die vereinfachten Test-Fixtures), wurden falsch identifiziert und erzeugten ein Phantom-Duplikat unter falschem Namen — exakt die Bug-Klasse, zu deren Beseitigung das Feature gebaut wurde.
- Das ehrliche Vollstaendigkeits-Signal — das Herzstueck des ganzen Features — wurde intern korrekt berechnet, war aber *im tatsaechlichen Output des Produkts unsichtbar*. Jeder Unit-Test gruen; ein echter Nutzer haette das Feature nie funktionieren sehen.

Der Loop tat, wofuer ein Loop da ist: Er eskalierte zurueck in die Build-Phase, und nach den Fixes testete QA alles erneut — Runde zwei bestand, mit der Frage, die sich der QA-Agent selbst stellt: *"Would I demo this to a stakeholder right now? Yes."*

QA dokumentierte ausserdem, was sich mit synthetischen Testdaten *nicht* verifizieren liess, und hielt es als bekannte Einschraenkung fest, statt es zu ueberspielen — eine ehrliche Grenze statt eines gruenen Haekchens.

Die Lektion, zu der ich immer wieder zurueckkomme: Der Reviewer fand einen Bug im *Code*; QA fand Bugs im *Produkt*. Keiner haette die Funde des anderen gemacht. Das ist das Argument fuer getrennte Rollen in einem Satz.

### Keep: das Release, das sich weigert, sich selbst zu pushen

`/go-live` schloss den Zyklus — und verhielt sich weniger wie ein uebereifriges Deploy-Skript als wie ein sorgfaeltiger Release Manager. Die Pre-Flight-Checks liefen *frisch* auf dem Release-Commit, statt aus den frueheren Reports kopiert zu werden: noch einmal die volle Test-Suite, noch einmal beide Builds, plus die Pruefung, dass nichts Fremdes mit hineingeraten war. Der Changelog kam in Nutzersprache heraus — was koennen Nutzer jetzt, was vorher nicht ging — Commit-Hashes und Jargon ausdruecklich verboten.

Zwei Details stachen heraus. Der Release-Commit war bewusst eng geschnitten: nur die Dateien des Features, ueber explizite Pfade gestaged, waehrend bekannte Altlasten anderswo im Repo als Follow-ups notiert wurden, statt sie ins Release zu kehren. Und der Rollback-Pfad wurde niedergeschrieben, *bevor* irgendetwas ausgeliefert wird — unter der Regel, die im Artefakt selbst steht: *"a release you can't roll back is a bet, not a release"* — inklusive einer Fix-Forward-Regel: Ein Defekt nach dem Release geht durch den gesamten Loop als naechste Version, nie als Hot-Patch auf dem Release-Commit.

Der allerletzte Schritt ist mein Favorit. Der Release Manager bereitete alles vor — Versions-Bump, eng geschnittener Commit, lokaler Tag — und *hielt dann an*. Jeder nach aussen gerichtete Befehl (Push, PR, Publish) steht vorbereitet in der Release-Notiz, wurde aber ausdruecklich nicht ausgefuehrt und wartet auf das Go des Nutzers. Da Datrivo noch nicht oeffentlich ist, ruht der Zyklus genau dort: done-done — bis auf den Knopfdruck. Und genau das ist der Punkt: Der Loop vollzieht den einen irreversiblen Schritt nie aus eigener Autoritaet.

Und weil Keep das K in SPARK ist, hielt die Phase die Learnings des Zyklus fest: was gut lief (der Hands-on-QA-Schritt hat sich bezahlt gemacht), was wir anders machen wuerden (adversariale Tests gehoeren *zum* Code, nicht erst dazu, nachdem ein Reviewer das Loch findet) und wiederverwendbare Muster fuer kuenftige Zyklen — inklusive der Lektion, die uns QA beibrachte: Berechne nie ein Qualitaetssignal, ohne auch zu beweisen, dass es den Nutzer erreicht.

### Was die Gates insgesamt gefangen haben

Ein Feature, ein Zyklus: eine veraltete Backlog-Praemisse beerdigt, bevor Code entstand; eine Loesung in ein Beduerfnis rueckuebersetzt; drei Architektur-Alternativen schriftlich verworfen; ein Plan-Konflikt transparent aufgeloest; ein Loch im Vertrauenssignal vom Review gefunden; zwei nutzersichtbare Major-Bugs von Hands-on-QA gefangen, nachdem das Review bereits bestanden war; und ein Release mit schriftlichem Rollback-Pfad und festgehaltenen Learnings vorbereitet — das kurz vor dem einen irreversiblen Schritt anhaelt, der menschlich bleibt. Jeder einzelne dieser Faenge passierte *vor* dem Release — und jeder steht in fuenf Markdown-Dateien, die ich in sechs Monaten wieder nachlesen kann.

## Wann sich der Overhead lohnt — und wann nicht

Eine ehrliche Einordnung, denn ein Prozess mit Gates ist nicht gratis:

**Lohnt sich:** Features mit echtem Risiko — alles, was Datenintegritaet beruehrt, alles Nutzersichtbare, alles, wo dich "scheint zu funktionieren" schon einmal verbrannt hat. Im Datrivo-Beispiel hat sich die Specify-Phase allein dadurch bezahlt gemacht, dass sie eine veraltete Annahme beerdigte, bevor sie zu Code wurde — und Demo-Day fing zwei nutzersichtbare Bugs, die eine komplett gruene Test-Suite und ein bestandenes Code-Review uebersehen hatten.

**Lohnt sich nicht:** Einzeiler-Fixes, Typos, mechanische Refactorings. Eine Sechs-Rollen-Zeremonie ueber einen `README`-Typo zu fahren ist Theater. aSPARK ist bewusst modular — du kannst eine einzelne Phase aufrufen (etwa nur `/peer-review` auf einen Diff), ohne den ganzen Loop.

Meine Daumenregel: Wenn ich mir von einem menschlichen Kollegen ein zweites Paar Augen wuenschen wuerde, faehrt der Loop.

## Loslegen

aSPARK ist Open Source und installiert sich als Claude-Code-Plugin mit zwei Befehlen:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Danach entweder einzelne Zeremonien pro Phase aufrufen — oder `/spark` starten und das ganze Team ein Feature von der Idee bis zum Release tragen lassen, waehrend du an jedem Gate entscheidest.

Das Repository mit vollstaendiger Dokumentation der Agenten, Skills und Gate-Regeln: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK)

## Fazit

Coding-Agenten haben das Bauen schnell gemacht. aSPARK ist mein Versuch, es *vertrauenswuerdig* zu machen — nicht indem der Agent gebremst wird, sondern indem er von derselben Struktur umgeben wird, die menschliche Teams zuverlaessig macht: spezialisierte Rollen, explizite Uebergaben, Quality Gates und eine schriftliche Entscheidungsspur.

In einem Satz:

Eine Person plus aSPARK arbeitet wie ein ganzes Team — und der Unterschied zeigt sich nicht darin, wie schnell du baust, sondern darin, was du faengst, bevor du baust.

Feedback, Issues und Pull Requests sind herzlich willkommen.
