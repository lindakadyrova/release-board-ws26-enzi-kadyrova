# Lesson 01 · Das Release Board verstehen

**Continuous Delivery · MSD24 · WS 2026/27 · 06.10.2026**

## Worum geht es im Beispiel?

Eine Änderung soll gemeinsam integriert, automatisch geprüft und als startbares Ergebnis bereitgestellt werden. Dafür verwenden Sie das **Release Board**, einen kleinen HTTP-Dienst in Node.js. Seine Aufgabe ist bewusst überschaubar: Er gibt Auskunft darüber, welche Version des Dienstes läuft und welche Release-Nachricht dafür vereinbart ist. So können Sie jede Station zwischen Quelltext, Test und Artefakt am selben Beispiel nachvollziehen.

Der erste Stand ist eine **JSON-API**. Er enthält noch keine grafische Benutzeroberfläche, keine Datenbank, keine Benutzeranmeldung und keine Liste historischer Releases. Es werden keine Daten dauerhaft gespeichert. Ein Browser zeigt die JSON-Antwort direkt an. Beim Aufruf der Adresse ohne Pfad, also nur `http://localhost:3000`, erscheint daher eine Fehlermeldung für die unbekannte Route; das ist im ersten Stand vorgesehen.

Nach dieser Lesson können Sie den Dienst starten, seine Antworten erklären, einen absichtlichen Fehler über einen Test nachweisen und dessen Reparatur in einer gemeinsamen GitHub-Pipeline nachvollziehen. Ein grüner Merge, ein bestandener Test und ein gesunder HTTP-Dienst liefern dabei jeweils unterschiedliche Informationen.

## Was kann die Anwendung?

Der Standardport ist **3000**, die Standardversion **1.0.0**. Für alle Antworten wird JSON verwendet.

| Aufruf | HTTP-Status | Bedeutung und Antwort |
|---|---|---|
| `GET /api/release` | 200 | Liefert Dienstname, Version und vereinbarte Nachricht. |
| `GET /health` | 200 | Liefert `{"status":"ok"}` als einfachen technischen Lebensnachweis. |
| `GET /missing` oder `GET /` | 404 | Liefert `{"error":"Not found"}` für eine unbekannte Route. |
| Beispielsweise `POST /health` | 405 | Liefert `{"error":"Method not allowed"}` und den Header `Allow: GET`. |

Die Release-Antwort im unveränderten Startstand lautet:

```json
{
  "service": "release-board",
  "version": "1.0.0",
  "message": "Ready for delivery"
}
```

Die Version wird beim Erzeugen des Servers festgelegt. Sie muss im Format `major.minor.patch` mit drei durch Punkte getrennten Zifferngruppen vorliegen, etwa `1.2.3`. Die einfache Validierung erlaubt in diesem Beispiel keine Zusätze wie `-beta`. Ein ungültiger Wert führt beim Start zu einem Fehler. Diese Versionsangabe ersetzt keinen Nachweis darüber, aus welchem Commit ein Artefakt gebaut wurde.

## Welche Dateien erfüllen welche Aufgabe?

| Datei oder Ordner | Aufgabe im ersten Stand |
|---|---|
| `src/release.js` | Erstellt das Release-Objekt und validiert das Versionsformat. Hier verändern Sie später gezielt die Nachricht. |
| `src/server.js` | Stellt den HTTP-Server mit den Routen, Statuscodes und Start-/Stop-Verhalten bereit. |
| `test/release.test.js` | Prüft den fachlichen Vertrag des Release-Objekts und ungültige Versionswerte. |
| `test/server.test.js` | Startet einen echten lokalen HTTP-Server und prüft ausgewählte Antworten. |
| `scripts/test-ci.js` | Führt die Tests aus, schreibt den JUnit-Bericht und gibt einen Fehlerstatus weiter. |
| `scripts/build.js` | Kopiert Laufzeitdateien nach `dist/` und schreibt `dist/build.json`. |
| `scripts/red-green.js` | Demonstriert Fehler und Reparatur in einer temporären Kopie. |
| `.github/workflows/ci.yml` | Führt die Prüf- und Build-Schritte bei Push und Pull Request in GitHub Actions aus. |
| `release.txt` | Separates Übungsblatt für Branches und Merge-Konflikte. Die Anwendung liest diese Datei nicht. |
| `docs/lesson-01/` | Einführung, Diskussionsfälle, Git-Challenge und Reflexion der ersten Lesson. |
| `docs/lessons/` | Mindeststand, Startprüfung und Abschlusscheckliste je Lesson. |

Node.js bringt den verwendeten HTTP-Server, Test-Runner und die Assertions bereits mit. Das Projekt benötigt im ersten Stand keine zusätzlichen npm-Pakete. `package.json` beschreibt die Befehle, `package-lock.json` gehört zum reproduzierbaren Ausgangsstand.

## Lokal starten und beobachten

Sie benötigen Git, Node.js 24, npm und einen Editor. Wechseln Sie in den Ordner mit `package.json` und führen Sie aus:

```sh
npm ci
npm run check
npm test
npm start
```

`npm ci` verwendet das vorhandene Lockfile. `npm run check` prüft die Syntax der beiden Quelldateien; dieser Befehl ist noch kein Verhaltenstest. `npm test` führt die drei unten beschriebenen Tests aus. Nach `npm start` bleibt das Terminal mit dem laufenden Server belegt. Die Meldung `Release Board listening on 3000` zeigt den gestarteten Prozess an. Beenden Sie ihn mit **Strg+C**.

Öffnen Sie `http://localhost:3000/api/release` und `http://localhost:3000/health` im Browser. Alternativ prüfen Sie in einem zweiten Terminal in **Git Bash** auch die Statuscodes:

```sh
curl -i http://localhost:3000/api/release
curl -i http://localhost:3000/health
curl -i http://localhost:3000/missing
curl -i -X POST http://localhost:3000/health
```

Sie müssen 200, 200, 404 und 405 erhalten. Ein HTTP-Status 200 am Healthcheck prüft weder die richtige Release-Nachricht noch eine vollständige Auslieferung. Der Healthcheck enthält in dieser Anwendung keine Datenbank- oder Fremdsystemprüfung.

## Version und Port konfigurieren

`APP_VERSION` und `PORT` werden aus der Prozessumgebung gelesen. Stoppen Sie den bisherigen Server, bevor Sie ihn mit geänderten Werten erneut starten. Beispiel für **Git Bash**:

```sh
APP_VERSION=1.2.3 PORT=3001 npm start
```

Unter `http://localhost:3001/api/release` muss nun die Version `1.2.3` erscheinen. Die Nachricht bleibt unverändert. Die Präfixe im Befehl gelten für diesen Prozess und verändern keine Repository-Datei. Der Starter lädt keine `.env`-Datei automatisch. Ein neuer normaler Aufruf von `npm start` verwendet wieder die Standardwerte, sofern in Ihrer Umgebung keine anderen Werte gesetzt sind.

Der Dienst speichert keine Daten und benötigt keine Migrationen. Für einen Neustart genügt Strg+C und ein erneuter Start. Bei `EADDRINUSE` ist der Port bereits belegt: Beenden Sie Ihren anderen Übungsserver oder wählen Sie einen anderen Port. Ein `curl`-Verbindungsfehler bedeutet, dass am gewählten Ziel kein erreichbarer Server antwortet; er ist kein fachlicher Testfehler.

## Wie wird getestet?

`npm test` verwendet den eingebauten Node.js-Test-Runner. Der Ausgangsstand enthält **drei Testfälle**, innerhalb derer mehrere Assertions ausgeführt werden:

| Testfall | Tatsächlich geprüfte Erwartung |
|---|---|
| `release exposes the approved message and version` | `releaseInfo('1.2.3')` liefert exakt den Dienstnamen, die Version `1.2.3` und die Nachricht `Ready for delivery`. |
| `invalid versions are rejected` | Die Werte leere Zeichenfolge, `latest`, `1.0` und `1.0.0"` lösen jeweils einen Versionsfehler aus. |
| `HTTP release, health, missing route and unsupported method` | Ein echter HTTP-Server liefert die Version `1.2.3`, die Health-Antwort `{"status":"ok"}`, 404 für `/missing` und 405 für `POST /health`. |

Die ersten beiden Testfälle prüfen die Funktion ohne Netzwerk. Der dritte Test startet selbst einen Server auf einem freien lokalen Port und beendet ihn anschließend. Sie brauchen dafür **kein vorheriges `npm start`**. Alle drei Tests müssen bestehen; ein Lauf ohne gefundene Tests wäre kein gleichwertiger Nachweis.

Die Tests prüfen ausgewählte Erwartungen. Der HTTP-Test prüft zum Beispiel die Version der Release-Antwort, aber noch nicht deren gesamten Inhalt oder den `Allow`-Header. Das exakte Release-Objekt wird separat auf Funktionsebene geprüft. Nicht geprüft werden eine Benutzeroberfläche, Lastverhalten, ein Produktivdeployment oder der Inhalt von `release.txt`. In späteren Lessons ergänzen Sie begründete weitere Prüfungen.

## Derselbe Testlauf mit Bericht

```sh
npm run test:ci
```

Der Befehl führt dieselben drei Tests aus und erzeugt zusätzlich **`reports/junit.xml`**. Vergleichen Sie Testnamen, Anzahl und Ergebnis mit der Konsolenausgabe. Der Bericht ist maschinenlesbare Evidenz; er macht einen fehlgeschlagenen Test nicht erfolgreich. Das Skript reicht den Exitcode des Testlaufs weiter. `reports/` ist eine generierte Ausgabe und wird nicht eingecheckt.

## Was entsteht beim Build?

```sh
npm run build
node dist/src/server.js
```

Der Build kopiert `src/release.js`, `src/server.js`, `package.json` und `package-lock.json` in einen startbaren `dist/`-Ordner und ergänzt `build.json`. Er kompiliert oder transpiliert diesen JavaScript-Code nicht. **`npm run build` führt selbst keine Tests aus**; lokal prüfen Sie vorher mit `npm test`, im Workflow erzwingt die Reihenfolge den erfolgreichen Testschritt.

`build.json` enthält die beim Build verwendete Versionsangabe und eine Commit-Kennung: `CI_COMMIT_SHA` im GitLab-Kontext, andernfalls `GITHUB_SHA` im GitHub-Kontext, andernfalls `local`. Der lokale Wert `local` ist kein Git-Hash. Die beim Serverstart ausgegebene Version hängt weiterhin von `APP_VERSION` ab; `build.json` setzt diese Variable nicht automatisch.

Stoppen Sie einen bereits laufenden Quelltext-Server, bevor Sie das Artefakt am selben Port starten. Rufen Sie danach dieselben API-Adressen auf. `dist/` ist eine generierte Ausgabe und gehört nicht in den Commit. Der Build leert vorhandene zusätzliche Dateien in `dist/` nicht automatisch; für einen sauberen Reproduzierbarkeitsnachweis verwenden Sie später einen frischen Clone.

## Der erste gemeinsame Workflow

1. Lesen Sie das [Mindestausgangsszenario](../lessons/01_2026-10-06.md) und prüfen Sie den grünen lokalen Stand.
2. Legen Sie nach der [GitHub-Anleitung](../00-github-gemeinsam.md) ein gemeinsames Remote-Repository an. Person A lädt die Vorlage hoch; Person B nimmt die Einladung an und klont genau dieses Repository.
3. Bearbeiten Sie die [Git Delivery Challenge](02_Git_Delivery_Challenge.md): zwei Branches, zwei Pull Requests, ein bewusst erzeugter Konflikt und eine fachlich richtige Auflösung in `release.txt`.
4. Wechseln Sie zur [roten/grünen Anwendungspipeline](../00-start-und-rot-gruen.md). Person A ändert auf einem eigenen Branch nur die Nachricht in `src/release.js` auf `Not ready`. Die Test-Erwartung bleibt unverändert. Person B kontrolliert den Lauf und das spätere Review.
5. `npm test` muss jetzt scheitern. Nach dem Push muss auch der Testschritt in GitHub Actions scheitern. Der JUnit-Bericht wird trotzdem hochgeladen; Build und Artefakt-Upload werden übersprungen.
6. Stellen Sie die korrekte Nachricht wieder her, prüfen, committen und pushen Sie die Reparatur. Nach grünen Prüfungen und Partnerreview integrieren Sie den Stand in `main`.

Der Workflow heißt **Release Board CI** und enthält einen Job `verify`. Darin laufen Installation, Syntaxprüfung, Tests, JUnit-Upload, Build und Upload des `release-board`-Artefakts. Das heruntergeladene Artefakt enthält den Inhalt von `dist/`; sein Einstieg lautet nach dem Entpacken daher `src/server.js`.

Ein erfolgreicher Workflow baut und prüft hier ein Artefakt. Er stellt noch keinen öffentlich erreichbaren Dienst bereit. Automatisiertes Deployment und Recovery werden erst später ergänzt.

Ohne Remote-Zugang demonstriert `npm run demo:red` Fehler und Reparatur in einer temporären Kopie. Dabei bleibt Ihr Quelltext unverändert. Dieser Hilfslauf ersetzt nicht die Zusammenarbeit über GitHub oder einen tatsächlich ausgeführten Actions-Lauf.

## Ergebnis der Lesson

Sie können erklären, was die Release-Antwort bedeutet, welcher Test die falsche Nachricht erkennt und warum ein grüner Healthcheck diesen Fehler nicht aufdeckt. Halten Sie Repository-Link, eigene Beiträge, Pull Requests, roten und grünen Actions-Lauf, Testanzahl und reparierenden Commit fest. Ergänzen Sie die [Reflexion](03_Reflexion.md) und die Abschlusscheckliste unter [lessons](../lessons/01_2026-10-06.md).
