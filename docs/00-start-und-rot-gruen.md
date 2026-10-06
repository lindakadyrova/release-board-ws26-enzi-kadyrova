# 01 Erste Pipeline und roter Test

**Termin:** 06.10.2026. **Zeit:** 25 Minuten betreut, danach 30–45 Minuten zum eigenen Nachvollziehen. **Ziel:** Eine erfolgreiche Integration von einem tatsächlich geprüften Ergebnis unterscheiden. Ausgangspunkt ist das kleine Release Board: `/api/release` zeigt Version und Nachricht, `/health` den Betriebszustand. GitHub ist die gemeinsame Übungsplattform des ersten Termins; GitLab folgt als Transfer in Einheit 04; Java/Maven und Node.js sind die Hauptbeispiele. Für den ersten Termin verwenden wir Node.js ohne externe Pakete, damit die Pipeline verständlich bleibt.

Eine ausführliche Erklärung von API, Tests und Build finden Sie in der [Einführung zu Lesson 01](lesson-01/README.md).

## Vorbereitung

Sie benötigen Git, Node.js 24 und npm sowie Schreibrechte in einem eigenen Übungsrepository. Prüfen Sie `git --version`, `node --version` und `npm --version`. Verwenden Sie das gemeinsam angelegte GitHub-Repository aus der [Einrichtung](00-github-gemeinsam.md). Synchronisieren Sie nach der Challenge Ihren main-Branch mit `git pull --ff-only`. Arbeiten Sie im Stammverzeichnis mit `package.json`. Den Kursbestand nicht direkt verändern. Alle folgenden Git-Branches und Commits beziehen sich auf Ihr Übungsrepository.

**Rollen im Paar:** Person A führt die Änderungen, Commits und Pushes auf `exercise/red-green` aus. Person B prüft parallel die Ergebnisse im Browser und übernimmt das Review. Erstellen Sie nicht gleichzeitig zwei unterschiedliche lokale Stände unter demselben Remote-Branch-Namen.

## 1 Den grünen Ausgangspunkt prüfen

```sh
npm ci
npm run check
npm test
npm run test:ci
npm run build
npm start
```

Erwartung: drei Tests bestehen. `reports/junit.xml` enthält den Testbericht, `dist/` das ausführbare Artefakt. Öffnen Sie `http://localhost:3000/api/release` und `/health`. Stoppen Sie mit Strg+C. Bei belegtem Port den anderen eigenen Testserver beenden, nicht beliebige Prozesse abschießen.

## 2 Einen wirklichen Fehler einbauen

```sh
git switch -c exercise/red-green
```

Ändern Sie in `src/release.js` **nur** die zurückgegebene Nachricht von `Ready for delivery` auf `Not ready`. Der Vertrag in `test/release.test.js` bleibt unverändert. Führen Sie `npm test` aus. Erwartung: der Vertragstest scheitert mit einem Vergleich von erwartetem und tatsächlichem Text. Das ist kein Installationsfehler.

```sh
git add src/release.js
git commit -m "test: demonstrate a failing release contract"
git push -u origin exercise/red-green
```

Öffnen Sie in Ihrem GitHub-Repository **Actions → Release Board CI**. Der Job `verify` enthält alle Schritte. `npm run test:ci` muss scheitern; die späteren Schritte `npm run build` und Upload von `release-board` werden übersprungen. Der Upload des JUnit-Berichts läuft mit `if: always()` auch nach dem Testfehler. Öffnen Sie das Job-Log und laden Sie das Artefakt `junit` herunter. Ein wartender Lauf ist noch kein nachgewiesener Testfehler.

## 3 Ursache reparieren

Setzen Sie die Nachricht in `src/release.js` zurück auf `Ready for delivery`, ohne die Erwartung im Test aufzuweichen. Wiederholen Sie `npm test`, committen Sie gezielt die Datei mit `fix: restore the release contract` und pushen Sie denselben Branch. Jetzt müssen alle Schritte im Job `verify` grün sein. Öffnen Sie das Actions-Artefakt `release-board`: `src/server.js` im entpackten Artefakt ist mit Node startbar; beim lokalen Build liegt dieselbe Datei unter `dist/src/server.js`. Der fehlerhafte Lauf bleibt als Nachweis in der Pipeline-Historie.

## Ergebnis und Reflexion

Notieren Sie die beiden Pipeline-Links, die Anzahl ausgeführter Tests, die Fehlerursache und den reparierenden Commit. Erklären Sie: Warum reicht ein erfolgreicher Merge nicht als Qualitätsnachweis? Warum wäre `npm test || true` hier falsch? Welche Information liefert der Testbericht zusätzlich zum roten Status?

**Lokaler Ersatz bei Zugangsproblemen:** `npm run demo:red` führt den Fehler und die Reparatur in einer temporären Kopie aus und prüft beide Exitcodes. Der lokale Arbeitsstand bleibt unverändert. Das ersetzt den Logiknachweis, nicht den später nachzuholenden Runner-Lauf.

Öffnen Sie nach der Reparatur einen Pull Request nach `main`, lassen Sie die andere Person prüfen und integrieren Sie ausschließlich den grünen Stand. Beide Arbeitskopien werden danach aktualisiert.
