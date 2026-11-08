---
title: "Ein Bilderrahmen, der in Videocalls Gespräche startet"
description: Wie aus einem Waveshare ESP32-S3 RLCD-4.2 an zwei Abenden ein Bilderrahmen hinter meinem Schreibtisch wurde, der live die GitHub-Zahlen von aSPARK und Tokibot zeigt. Gebaut zusammen mit Claude Code, ohne dass ich vorher je einen ESP32 geflasht hatte.
date: 2026-10-18
draft: false
translationKey: github-picture-frame
image:
  path: ../../../../public/img/blog/github-bilderrahmen.jpg
  alt: "Der fertige Rahmen auf dem Regal: eine Octocat vor einem Nachthimmel, darunter das Display mit 451 Installs von aSPARK und 93 Downloads von Tokibot."
tags:
  - claude-code
  - hardware
  - open-source
---
**Hinter mir im Homeoffice steht seit Kurzem ein Bilderrahmen auf dem Regal. Auf den ersten Blick ist es ein Nachthimmel mit einer Octocat. Wer genauer hinschaut, sieht darunter zwei große Zahlen, die sich ab und zu ändern. Genau das war der Plan: etwas, das im Videocall auffällt und eine Frage provoziert. „Was ist das da hinter dir?“ ist ein deutlich besserer Gesprächseinstieg als das Wetter.**

## Die Hardware

Herz des Ganzen ist das **Waveshare ESP32-S3 RLCD-4.2**: ein ESP32-S3 mit einem 4,2-Zoll-Display mit 400 × 300 Pixeln in Schwarzweiß. Der Clou ist das „R“ in RLCD. Das Display ist *reflektierend* und hat keine Hintergrundbeleuchtung. Es sieht deshalb eher aus wie ein gedrucktes Bild als wie ein Bildschirm, und es flimmert nicht in der Webcam. Für einen Bilderrahmen ist das ideal.

Angesteuert wird das Display von einem ST7305-Controller. Ein tiefer Bilderrahmen mit Passepartout, ein selbst gestaltetes Hintergrundbild und ein blauer LED-Streifen im Rahmen machen den Rest. Das Display sitzt dabei wie ein Schild direkt unter der Octocat.

## Die Idee: GitHub-Zahlen als Gesprächsanlass

Ursprünglich hatte ich nur „irgendwas, das zu Gesprächen anregt“ im Kopf. Im Brainstorming standen Ideen wie eine Frage des Tages, generative Pixelkunst oder eine Raumklima-Anzeige mit Persönlichkeit. Hängen geblieben bin ich bei etwas Persönlicherem: meinen eigenen Open-Source-Projekten.

Der Rahmen zeigt zwei davon:

- **[aSPARK](https://github.com/a-lottes/aSPARK)**, ein Plugin, das aus Claude Code ein agiles Team macht.
- **[Tokibot](https://github.com/a-lottes/tokibot)**, ein kleiner E-Paper-Begleiter für den Schreibtisch, der zeigt, was deine Coding-Agenten gerade tun. Als ich mit dem Rahmen angefangen habe, war Tokibot noch privat. Inzwischen ist er öffentlich.

## Gebaut mit Claude Code, auf meinem eigenen Mac

Ich hatte vorher noch nie etwas mit dem ESP32 gemacht und keine Toolchain installiert. Gebaut habe ich das Projekt zusammen mit Claude. Die Planung lief im Chat, die eigentliche Arbeit hat eine Claude-Code-Session direkt auf meinem Mac erledigt: PlatformIO installieren, das offizielle Waveshare-Beispiel finden, Treiber und Pins herausfinden, Firmware bauen und das Board über USB-C flashen.

Meine Rolle war vor allem die der Hände und Augen: Kabel einstecken, aufs Display schauen und sagen, ob es richtig aussieht. Der erste Stolperstein war prompt ein Klassiker. Das Board tauchte am Mac nicht auf, weil es am USB-Hub hing. Direkt eingesteckt lief der Upload sofort, ganz ohne BOOT-Taste.

Der erste Testbildschirm war bewusst simpel: ein großes „Hello aSPARK“, ein dicker Rand und eine kleine Textzeile, um zu prüfen, welche Schriftgröße in der Webcam noch lesbar ist. Spoiler: Klein ist im Videobild sehr schnell unlesbar.

## Der Tech-Stack

- **PlatformIO** mit dem **Arduino-Framework** auf dem ESP32-S3
- **U8g2** für Schrift und Grafik auf dem ST7305-Display (400 × 300, 1 Bit)
- **WLAN-Einrichtung über ein Captive Portal**: Beim ersten Start spannt das Board einen eigenen Hotspot auf, ich verbinde mich mit dem Handy und wähle dort mein WLAN aus. Das WLAN-Passwort landet so nie im Code. Wer das WLAN wechseln will, hält beim Einschalten die KEY-Taste gedrückt.
- **GitHub REST API**, direkt vom ESP32 aus abgefragt, alle fünf Minuten

Es gibt keinen Server dazwischen, keine Cloud-Funktion und keinen Raspberry Pi. Das Board holt sich seine Daten selbst.

## Was GitHub verrät und was nicht

Sterne, Forks, offene Issues und der Zeitpunkt des letzten Pushs sind einfach. Die liefert `GET /repos/{owner}/{repo}` für öffentliche Repos sogar ohne Login. Ohne Token gilt allerdings ein Limit von 60 Anfragen pro Stunde, was bei mehreren Repos und Endpunkten schnell knapp wird.

Spannender wurde es bei der Frage: **Wie viele Leute nutzen aSPARK eigentlich?**

Eine Installationszahl für Claude-Code-Plugins gibt es nicht. Anthropic bietet Plugin-Autoren dafür bisher keine Statistik an. Die beste Annäherung, die ich gefunden habe, sind die **Unique Clones** aus der Traffic-API (`GET /repos/{owner}/{repo}/traffic/clones`). Claude Code klont bei der Installation das Marketplace-Repo, also sind „verschiedene Klone in den letzten 14 Tagen“ ziemlich nah an „Installationen und Updates in den letzten 14 Tagen“. Ganz exakt ist das nicht, denn CI-Läufe und Bots zählen mit. Als Hingucker-Zahl taugt es trotzdem hervorragend.

Für Tokibot zeigt der Rahmen stattdessen die Downloads der fertigen Images aus den Releases. Die summiert das Board aus `download_count` aller Assets unter `/releases`.

## Ein Token mit möglichst wenig Rechten

Für die Traffic-Daten braucht das Board einen Token, und solange Tokibot privat war, ging es auch dort nicht ohne. Weil dieser Token dauerhaft auf einem Gerät im Regal liegt, sollte er so wenig wie möglich dürfen. Ich habe einen **fine-grained Personal Access Token** angelegt, der:

- nur Zugriff auf genau die zwei Repos hat („Only select repositories“),
- **Contents: Read-only** hat, für die Releases und damals für das private Repo,
- **Administration: Read-only** hat, weil GitHub die Traffic-API hinter dieser Berechtigung versteckt.

Mehr darf der Token nicht, insbesondere nichts schreiben. Er liegt in einer `secrets.h`, die per `.gitignore` aus dem Repository herausgehalten wird.

Lehrreich war, wie GitHub auf fehlende Rechte reagiert. Fehlt einem Token der Zugriff auf ein privates Repo, kommt kein „403 Forbidden“, sondern ein **404**: Das Repo existiert für diesen Token schlicht nicht. Fehlt nur eine einzelne Berechtigung, gibt es dagegen eine 403. Wer also beim Debuggen „Not Found“ für ein Repo bekommt, das ganz sicher existiert, sollte zuerst die Repository-Auswahl am Token prüfen.

Praktisch: Bearbeitet man einen bestehenden fine-grained Token, bleibt sein Wert gleich. Neu flashen musste ich nach dem Nachjustieren der Rechte also nicht. Die fehlenden Zahlen tauchten nach der nächsten Abfrage einfach auf.

## Gestaltung: Nachtmodus und eine große Zahl

Die erste Version zeigte sechs Felder pro Repo: Installs, Stars, Forks, Clones, Issues und letzter Push. Auf dem Schreibtisch sah das informativ aus. Im Rahmen war es zu viel, und das hellgraue Display wirkte in meinem dunklen Nachthimmel-Bild wie ein Fremdkörper.

Die jetzige Version folgt zwei Regeln:

1. **Nachtmodus**: Hell auf dunkel, damit das Display mit dem Hintergrundbild verschmilzt und wie ein Fenster in den Nachthimmel wirkt. Ganz schwarz wird ein reflektierendes Display nicht, eher dunkelgrau. Im Rahmen funktioniert das trotzdem gut.
2. **Eine Hauptzahl pro Projekt**: Riesig steht die Zahl, die eine Geschichte erzählt, darunter klein der Rest. Felder, die 0 sind, werden ausgeblendet, und die Uhrzeit der letzten Aktualisierung ist rausgeflogen. Nur wenn etwas schiefgeht, erscheint unten rechts ein kleiner Hinweis wie „kein WLAN“.

Das Foto oben zeigt das Ergebnis.

## Was ich gelernt habe

- **Für die Webcam gestalten heißt: groß, kontrastreich, wenig.** Alles unterhalb einer bestimmten Schriftgröße ist im Videobild nur ein grauer Fleck.
- **Ein reflektierendes Display ist für so ein Projekt Gold wert.** Kein Leuchten, kein Flimmern, es sieht aus wie ein Bild.
- **GitHub-Rechte sind feingranular, aber nicht immer intuitiv.** Dass Traffic-Daten „Administration: Read“ brauchen, hätte ich nicht erraten.
- **„Wie viele nutzen mein Plugin?“ bleibt eine Schätzung**, solange es keine offizielle Statistik gibt. Unique Clones sind eine brauchbare Näherung.
- **Hardware-Projekte mit einem Agenten auf dem eigenen Rechner fühlen sich anders an.** Ich habe keine Zeile Toolchain-Setup selbst getippt, war aber in jeder Entscheidung drin: welche Zahlen, welches Design, welche Rechte der Token bekommt.

## Wie es weitergeht

Ein paar Ideen liegen noch auf dem Tisch:

- **Eine Sternschnuppe**, wenn während eines Calls ein neuer GitHub-Stern reinkommt
- **Eine 14-Tage-Kurve** der Clones, gezeichnet als kleine Bergsilhouette passend zum Hintergrundbild
- **Die Tasten am Board** zum Durchblättern zwischen den Projekten

Wenn du mich also demnächst in einem Call siehst und dich fragst, was da hinter mir blau schimmert: Frag einfach. Genau dafür steht es da.
