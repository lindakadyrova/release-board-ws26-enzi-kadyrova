# Release Board · Lesson 01

Continuous Delivery · MSD24 · WS 2026/27 · 06.10.2026

Das Release Board ist im ersten Abschnitt ein kleiner JSON-Webdienst in Node.js. `GET /api/release` liefert Dienstname, Version und die vereinbarte Nachricht `Ready for delivery`; `GET /health` meldet `{"status":"ok"}`. Unbekannte Routen liefern 404, nicht unterstützte HTTP-Methoden 405. Eine grafische Oberfläche, Datenbank oder Anmeldung ist in diesem Stand nicht enthalten.

## Einstieg

1. Lesen Sie [Lesson 01: Das Release Board verstehen](docs/lesson-01/README.md). Die Einführung erklärt Funktionen, API-Beispiele, Konfiguration, Tests, Build und Pipeline ausführlich.
2. Prüfen Sie das [Mindestausgangsszenario](docs/lessons/01_2026-10-06.md).
3. Legen Sie ein [gemeinsames GitHub-Repository](docs/00-github-gemeinsam.md) an und laden Sie die zweite Person ein.
4. Bearbeiten Sie die [Git Delivery Challenge](docs/lesson-01/02_Git_Delivery_Challenge.md).
5. Zeigen Sie [Fehler und Reparatur in GitHub Actions](docs/00-start-und-rot-gruen.md) und halten Sie die [Reflexion](docs/lesson-01/03_Reflexion.md) fest.

## Start, Tests und Artefakt

Sie benötigen Git, Node.js 24 und npm. Arbeiten Sie im Verzeichnis mit package.json:

```sh
npm ci
npm run check
npm test
npm run test:ci
npm run build
npm start
```

Öffnen Sie http://localhost:3000/api/release und http://localhost:3000/health. Die Standardversion lautet 1.0.0. Mit Strg+C stoppen Sie den Server; ein erneutes `npm start` startet ihn wieder. Der Dienst speichert keine Daten, hat keine Migrationen und schreibt seine Startmeldung ins Terminal.

`npm test` führt drei Testfälle aus: das genaue Release-Objekt, ungültige Versionswerte und ausgewählte Antworten eines echten HTTP-Servers. Der HTTP-Test startet und beendet seinen Server selbst; ein parallel gestarteter Anwendungsserver ist dafür nicht nötig. `npm run test:ci` erzeugt zusätzlich reports/junit.xml. Die drei Tests decken ausgewählte Anforderungen ab und sind kein vollständiger Qualitätsnachweis für beliebige spätere Änderungen.

`npm run build` kopiert Laufzeitdateien und Paketdateien nach dist/ und ergänzt build.json. Der Build führt selbst keine Tests aus; diese laufen vorher. Stoppen Sie den bisherigen Server und starten Sie das Artefakt mit `node dist/src/server.js`. Lokal trägt dessen Commit-Feld bewusst `local`; im Workflow stammt es aus der dortigen Commit-Kennung.

Für andere Werte starten Sie in Git Bash beispielsweise mit `APP_VERSION=1.2.3 PORT=3001 npm start`. Die Anwendung liest keine .env-Datei automatisch. Weitere Beispiele und die Grenzen des Healthchecks stehen in der Einführung.

## Zusammenarbeit und Umfang

Jede Person verwendet ein eigenes Konto, einen eigenen Clone und kurze Branches im gemeinsamen GitHub-Repository. Prüfen Sie Diff und Tests im Pull Request. `release.txt` ist ausschließlich das Git-Übungsblatt; die Anwendung verwendet src/release.js. Ein grüner Anwendungstest prüft daher nicht automatisch die Konfliktauflösung in release.txt.

Der GitHub-Workflow prüft den Stand und stellt ein Artefakt bereit. Er deployt noch keinen öffentlichen Dienst. `npm run demo:red` demonstriert den Fehler mit Reparatur in einer temporären Kopie; Ihr Arbeitsstand bleibt unverändert. Halten Sie lokale Ergebnisse und tatsächlich ausgeführte Remote-Läufe getrennt fest.

Dieser Studierendenstand enthält ausschließlich Lesson 01. Container, Terraform, Ansible und Sprachvarianten folgen später aus der vollständigen Kursreferenz. Der direkte Node-Start macht hier den Git- und Testablauf sichtbar; Containerisierung ist das Lernziel einer späteren Lesson.

[Lessons-Übersicht](docs/lessons/README.md) · [Vollständige Kursreferenz](https://gitlab.itplus.fh-joanneum.at/courses/msd/contdel/delivery-pipeline-example) · [Moodle](https://moodle.fh-joanneum.at/course/view.php?id=13808)
