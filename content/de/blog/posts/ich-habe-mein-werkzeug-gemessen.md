---
title: "Ich habe mein eigenes Werkzeug gemessen"
description: "Ich habe einen Wissensgraphen für Coding-Agenten gebaut und ihn dann in echten Läufen beobachtet. Die Agenten haben ihn nicht benutzt. Was ich daraus über Agenten, Kosten und Kontrolle gelernt habe."
date: 2026-11-13
draft: false
translationKey: measured-my-own-tool
tags:
  - claude-code
  - agenten
  - aspark
---
Ich baue seit einigen Monaten an einer kleinen Familie von Werkzeugen für Coding-Agenten. Eines davon ist ein Graph. Er verbindet den Code eines Projekts mit seinen Anforderungen: mit den Stories, den Akzeptanzkriterien, den Reviews. Die Idee ist einfach. Ändert ein Agent eine Datei, soll er vorher sehen können, welche Anforderungen daran hängen. Auch die aus anderen Features, an die er gerade gar nicht denkt.

Ich war von der Idee überzeugt. Sie klingt so vernünftig, dass ich lange nicht auf den Gedanken kam, sie zu prüfen.

Vor zwei Wochen habe ich es dann getan. Ich wollte für einen Text belegen, dass der Graph wirkt. Also habe ich meine eigene Software-Fabrik dieselben Aufgaben mehrfach bearbeiten lassen. Einmal mit Graph, einmal ohne, und einmal als einzelne Session ohne jeden Prozess. Jeder Lauf wurde aufgezeichnet, jeder Werkzeugaufruf, jedes Token.

## Der Graph war da

Der Aufbau war sauber. Der Graph lief als Werkzeug in jeder Session, verbunden und einsatzbereit. Im Auftrag an den Agenten stand sogar ausdrücklich, er solle ihn nutzen, bevor er im Code sucht.

Dann habe ich die Aufzeichnungen gelesen. In der ersten Messreihe hat in keinem Lauf mit Graph ein Agent ihn aufgerufen. Nicht ein einziges Mal.

Das war unangenehm. Es war mein Werkzeug, und ich hatte es für selbstverständlich nützlich gehalten. Meine erste Vermutung war ein technischer Fehler. Es gab keinen. Der Graph war erreichbar, er wurde nur ignoriert.

## Warum ihn niemand benutzt hat

Die Ursachen lagen nicht im Graphen. Sie lagen im Ablauf um ihn herum.

Der Prozess, nach dem meine Agenten arbeiten, verteilt die Arbeit auf Rollen. Eine Rolle plant, eine prüft, eine testet. Genau diese Rollen hatten den Graphen gar nicht in ihrer Werkzeugliste. Der Hinweis im Auftrag erreichte nur den Haupt-Agenten. Und der hatte etwas Wichtigeres vor: Er fing an zu programmieren.

Das war die zweite Überraschung. Mein Prozess sieht vor, dass erst eine Spezifikation entsteht, dann ein Plan, dann der Code. In den Aufzeichnungen sah ich etwas anderes. Der Agent schrieb meist schon in der ersten Minute Code. Spezifikation und Plan kamen danach. Sie dokumentierten eine Entscheidung, die schon getroffen war.

Der Hinweis stand im Auftrag. Die Reihenfolge stand im Prozess. Beides war eine Empfehlung, und beides wurde übergangen.

## Was erzwungen ist, passiert

Also habe ich aufgehört zu empfehlen. Die Fabrik, die die Agenten startet, setzt die Regeln jetzt selbst durch. Erst läuft eine eigene Planungssitzung, dann darf Code entstehen. Jede Rolle, die plant, prüft oder testet, bekommt beim Start eine feste Anweisung zum Graphen. Und die Fabrik fragt den Graphen selbst. Das Ergebnis legt sie dem Agenten vor: Diese Stories anderer Features hängen an den Dateien, die du ändern willst.

Danach sah das Bild anders aus. Der Plan stand vor dem Code, in jedem Lauf. Die prüfenden Rollen fragten den Graphen meist vor ihrer Arbeit. In einem Lauf bekam der Tester die Liste der fremden Anforderungen. Er hat jede einzeln geprüft und dokumentiert. Das hatte vorher kein Agent getan.

Das ist für mich die wichtigste Erkenntnis dieser Tage. Was ich einem Agenten empfehle, ist ein Wunsch. Was ich erzwinge, passiert. Ein gutes Werkzeug neben einem Agenten ist wertlos, solange er selbst entscheidet, ob er es nimmt.

## Und dann wirkte er trotzdem nicht

Jetzt wurde der Graph benutzt. Also wollte ich wissen, ob er etwas besser macht. Dafür brauchte ich eine Aufgabe, an der eine einzelne Session scheitert. Die ersten Aufgaben taugten nicht. Die einzelne Session löste sie genauso gut wie der volle Prozess.

Die dritte Aufgabe hatte 23 verdeckte Tests. Sie verlangten Wissen, das nur in alten Projektakten stand. Die einzelne Session verfehlte in jedem Lauf drei Tests. Der volle Prozess verfehlte drei, einen und keinen.

Ich habe lange auf diese drei Zahlen geschaut. Die Streuung hing an genau einer Entscheidung, und die fiel in der Spezifikation. Die Spezifikation war in jedem Lauf geschrieben, bevor irgendein Agent den Graphen fragte. Der Graph kam zu spät, um noch etwas zu entscheiden. Einen Effekt konnte ich nicht nachweisen.

Ich habe die Messung an dieser Stelle beendet. Weitere Läufe hätten nur die Streuung genauer beschrieben.

## Was ein gründlicher Prozess kostet

Die Aufzeichnungen zeigten noch etwas, nach dem ich nicht gesucht hatte: den Preis.

Eine einzelne Session löste eine Aufgabe in rund einer Minute, mit wenigen tausend Tokens. Der volle Prozess mit Planung, Review und Test brauchte eine Viertelstunde bis eine halbe Stunde. Er verbrauchte das Fünfundzwanzig- bis Zweiundvierzigfache an Tokens. Ein großer Teil davon floss in die teuersten Modelle, die ich für Planung und Review fest eingestellt hatte. Mehrere Läufe brachen ab, weil das Nutzungskontingent erschöpft war.

Eine Einschränkung gehört dazu. Drei Läufe, die als voller Prozess eingestellt waren, haben gar keine Rollen gestartet. Sie waren so billig wie die einzelne Session. Auch das habe ich erst in den Aufzeichnungen gesehen.

Ich will den Prozess deshalb nicht schlechtreden. Das Review hat in mehreren Läufen echte Fehler gefunden, die danach behoben wurden. Aber ich habe für jede kleine Änderung den vollen Aufwand bezahlt. Das passe ich jetzt an. Kleine Änderungen bekommen einen leichten Weg: Die Spezifikation bleibt, der Rest wird kürzer. Die Rollen laufen standardmäßig auf einem günstigeren Modell. Die Zahl der Review-Runden ist begrenzt.

## Agenten erzählen nicht, was passiert ist

Ein Befund hat mich mehr beschäftigt als die Kosten. Am Ende jedes Laufs fasst der Agent zusammen, was er getan hat. Ich habe diese Zusammenfassungen mit den Aufzeichnungen verglichen.

Sie stimmten meistens nicht. Ein Agent schrieb, Review und Test seien ausgelassen worden. Die Aufzeichnung zeigte, dass beide gelaufen waren und Dokumente hinterlassen hatten. Ein anderer meldete, er habe die langsamen Tests nicht ausgeführt. Er hatte sie ausgeführt.

Die Agenten haben nicht gelogen. Sie haben aus dem Gedächtnis zusammengefasst, und ihr Gedächtnis war ungenau. Für mich folgt daraus etwas Einfaches. Den Abschluss eines Laufs schreibe ich nicht mehr aus dem, was der Agent glaubt. Ich lese ihn aus den Dateien, die tatsächlich entstanden sind.

## Was ich mitnehme

Ich wollte belegen, dass mein Werkzeug wirkt. Das ist mir nicht gelungen. Herausgekommen ist etwas anderes, und ich halte es für wertvoller.

Ein Agent folgt keinem Prozess, nur weil er beschrieben ist. Er folgt ihm, wenn etwas außerhalb des Modells ihn dazu bringt. Werkzeuge werden nicht benutzt, weil sie da sind. Sie werden benutzt, wenn der Ablauf sie an die richtige Stelle setzt. Und was ein Agent über seine eigene Arbeit sagt, prüfe ich gegen das, was er hinterlassen hat.

Ob der Graph hilft, wenn er schon vor der Spezifikation gefragt wird, weiß ich noch nicht. Ich werde es genauso prüfen wie diesmal: mit Aufzeichnungen statt mit Überzeugung. Diesmal habe ich gelernt, wie leicht ich mich von einer guten Idee überzeugen lasse, wenn es meine eigene ist.
