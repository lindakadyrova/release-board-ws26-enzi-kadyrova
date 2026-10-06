# Zwei Diskussionsfälle und eine optionale Zusatzfrage

**06.10.2026 · 15 Minuten Gruppenarbeit und 5 Minuten Sicherung einschließlich optionaler Zusatzfrage**

Bearbeiten Sie in Ihrer Gruppe Fall A oder Fall B. Halten Sie Ihre Entscheidung, eine Begründung und einen möglichen Fehler fest. Mehrere Gruppen dürfen denselben Fall bearbeiten. Fall C wird erst nach der Besprechung von Fall B spontan im Plenum ergänzt; er ist kein dritter Gruppenauftrag.

## Fall A: Zwei fertige Funktionen passen nicht zusammen

Zwei Personen arbeiten eine Woche lang getrennt. Auf beiden Rechnern laufen die Funktionen. Erst kurz vor der Abgabe werden die Branches zusammengeführt. Der gemeinsame Build scheitert; außerdem verwenden die Funktionen verschiedene Formate für eine Versionsnummer.

1. An welchem früheren Zeitpunkt hätte das Team den Widerspruch bemerken können?
2. Welche Prüfung soll bei jeder integrierten Änderung automatisch laufen?
3. Reicht es, den Merge-Konflikt ohne Fehlermeldung aufzulösen? Welcher zusätzliche Nachweis fehlt?
4. Wer übernimmt Verantwortung, wenn der gemeinsame Hauptbranch rot ist? Was sollte als Nächstes passieren?
5. Welche Änderung an Branch-Größe und Integrationshäufigkeit würden Sie vereinbaren?

## Fall B: Die neue Version ist fertig, aber darf erst morgen live gehen

Die Anwendung ist gebaut und getestet. Die Fachabteilung möchte die neue Funktion erst nach einer Schulung aktivieren. Bisher baut eine Person die Anwendung auf ihrem Laptop und kopiert sie manuell auf den Server. Niemand weiß sicher, ob das getestete Paket identisch mit dem später bereitgestellten Paket ist.

1. Welche Schritte bis zu einer bereitstellbaren Version sollten automatisiert sein?
2. Wie belegen Sie, dass Test und spätere Bereitstellung dasselbe Artefakt verwenden?
3. Wo soll die bewusste Freigabe stattfinden und welche Informationen braucht die verantwortliche Person?
4. Können technische Bereitstellung und Nutzungsfreigabe zu unterschiedlichen Zeitpunkten passieren? Nennen Sie ein Beispiel.
5. Welchen vorherigen Stand und welche Konfiguration müssen Sie für eine Rückkehr aufbewahren?

## Zusatz nach der Besprechung von Fall B: Fall C Jede geprüfte Änderung erreicht automatisch die Nutzer

Ein Team betreibt einen kleinen Webdienst. Nach jeder integrierten Änderung laufen Tests, ein Image wird gebaut und automatisch ausgerollt. Niemand klickt vor der Produktion auf eine Freigabe. Eine Version antwortet technisch korrekt, zeigt aber fachlich eine falsche Nachricht.

1. Welcher Freigabeschritt unterscheidet diesen Ablauf von Fall B?
2. Welche Prüfungen braucht das Team vor und nach der Bereitstellung?
3. Warum reicht ein HTTP-Status 200 oder ein grüner Healthcheck für diesen Fehler nicht aus?
4. Woran erkennt das Team den fachlichen Fehler und wie kann es den alten Stand wiederherstellen?
5. Für welche Art von Änderung würden Sie trotz Automatisierung eine menschliche Freigabe vorsehen?

## Gemeinsames Ergebnis

Eine Person berichtet pro bearbeitetem Fall A oder B in höchstens einer Minute: vorgeschlagener Ablauf, entscheidende Prüfung und verbleibendes Risiko. Ergänzen Sie danach den passenden Begriff. Es geht um begründete Entscheidungen, nicht um auswendig gelernte Definitionen.

**Zusatz C bei verbleibender Zeit:** Beantworten Sie zunächst nur Frage 1 spontan. Ergänzen Sie danach Frage 3. Die übrigen Fragen dienen der Vertiefung und müssen im ersten Termin nicht vollständig ausgearbeitet werden.
