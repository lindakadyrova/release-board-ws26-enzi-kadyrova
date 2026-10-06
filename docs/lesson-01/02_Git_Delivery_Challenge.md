# Git Delivery Challenge mit gemeinsamem GitHub-Repository

**06.10.2026 · 35 Minuten einschließlich Einrichtung · Zweiergruppen**

Planen Sie etwa 10 Minuten für [Repository und Einladung](../00-github-gemeinsam.md), 15 Minuten für zwei Beiträge und 10 Minuten für Integration und Konflikt. Die Datei `release.txt` ist ein separates Git-Übungsblatt und wird von der Anwendung nicht eingelesen. Die automatisierten Anwendungstests prüfen `src/release.js`; sie sichern den Inhalt von `release.txt` nicht ab.

## 1 Derselbe Ausgangspunkt

Beide Personen haben den gemeinsamen Startstand auf `main`. Die Zeile lautet `Release message: Ready for delivery`. Beide erstellen ihre folgenden Branches **vor dem ersten Merge**.

Person A:

```sh
git switch -c feature/version
printf 'Release message: Ready for delivery v1.0.0\n' > release.txt
git add release.txt
git commit -m "feat: show the release version"
git push -u origin feature/version
```

Person B, in der eigenen Arbeitskopie vom selben Startstand:

```sh
git switch -c feature/german-message
printf 'Release message: Bereit zur Auslieferung\n' > release.txt
git add release.txt
git commit -m "feat: translate the release message"
git push -u origin feature/german-message
```

## 2 Pull Requests und gemeinsamer Konflikt

Öffnen Sie für beide Branches einen Pull Request nach `main`. Prüfen Sie gemeinsam den Diff von `feature/version`, warten Sie den grünen Lauf ab und integrieren Sie diesen ersten Pull Request. Beim zweiten Pull Request ist nun ein Konflikt zu erwarten, weil dieselbe Ausgangszeile unterschiedlich geändert wurde. Person B holt den neuen Hauptbranch und führt ihn in den eigenen Branch zusammen:

```sh
git fetch origin
git switch feature/german-message
git merge origin/main
```

## 3 Fachlich richtige Auflösung

Öffnen Sie `release.txt` und erläutern Sie die Marker `<<<<<<<`, `=======` und `>>>>>>>`. Beide Anforderungen müssen erhalten bleiben: deutsche Nachricht und Version 1.0.0. Ersetzen Sie den Konfliktblock durch:

```text
Release message: Bereit zur Auslieferung v1.0.0
```

```sh
git add release.txt
git commit -m "fix: combine translated message and version"
npm test
git push
```

Person A kontrolliert die Ergebniszeile und den Pull Request. Nach grünen Prüfungen integrieren Sie den zweiten Pull Request. Beide holen den gemeinsamen Stand:

```sh
git switch main
git pull --ff-only
git status
git log --oneline --graph --all -8
```

Wenn ein Merge noch offen ist und Sie abbrechen müssen, erlaubt `git merge --abort` die Rückkehr zum Zustand vor diesem Merge. Sichern Sie eigene andere Änderungen vorher; verwenden Sie kein pauschales Zurücksetzen.

## 4 Nachweis und Übertragung

Notieren Sie den Repository-Link, beide Pull Requests und den Integrationscommit. Prüfen Sie gegenseitig, dass die Nachricht beide Anforderungen erfüllt. Ein grüner Testlauf allein würde den Verlust der Version in `release.txt` nicht erkennen, denn diese Datei gehört nicht zum Anwendungstest.

Im folgenden [roten/grünen Anwendungstest](../00-start-und-rot-gruen.md) ändern Sie stattdessen `src/release.js`. Dort existiert ein expliziter Vertragstest. Erklären Sie den Unterschied zwischen textueller Integration, manueller fachlicher Prüfung und automatisiertem Vertrag.

**Bei Zeitknappheit:** Beide Personen liefern je einen Branch und einen Pull Request; die Lehrperson demonstriert den Konflikt am vorbereiteten Paar. Die eigene Konfliktauflösung und der Remote-Nachweis werden bis 19.10.2026 vervollständigt.
