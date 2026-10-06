# Gemeinsames GitHub-Repository für die erste Einheit

**06.10.2026 · Zweiergruppen · Git Bash**

Sie arbeiten gemeinsam in **einem GitHub-Repository pro Zweiergruppe**, jeweils mit einem eigenen Konto und einer eigenen lokalen Arbeitskopie. Die GitLab-Kursreferenz liefert die Materialien. Der erste gemeinsame Remote-Workflow wird auf GitHub durchgeführt; der Transfer nach GitLab folgt in Einheit 04.

## 1 Voraussetzungen und Startvorlage

Prüfen Sie Git, Node.js 24 und npm. Melden Sie sich mit Ihrem eigenen GitHub-Konto an. Verwenden Sie zur HTTPS-Anmeldung den Git Credential Manager beziehungsweise eine vorhandene sichere Anmeldung. GitHub-Kennwörter gehören nicht in Terminalbefehle; Zugangsdaten werden nicht geteilt.

```sh
git --version
node --version
npm --version
git config user.name
git config user.email
```

Falls die beiden letzten Werte fehlen, setzen Sie im neuen Übungsordner mit `git config user.name "Ihr Name"` und `git config user.email "Ihre Commit-Adresse"` Ihre eigenen Angaben. Keine Daten der anderen Person übernehmen.

Person A lädt die **Startvorlage Einheit 01** aus Moodle herunter und entpackt sie in einen neuen Ordner. Wechseln Sie in den Ordner mit `package.json`. Die ZIP enthält bewusst keinen `.git`-Ordner. Kontrollieren Sie, dass `.github/workflows/ci.yml` mit entpackt wurde. Die zweite Person wartet auf den ersten Push und klont dann dasselbe Remote-Repository.

## 2 Leeres Repository anlegen und Mitarbeit einladen

Person A öffnet GitHub und wählt **New repository**. Verwenden Sie beispielsweise `release-board-ws26-team01`. Vereinbaren Sie die Sichtbarkeit mit der Lehrperson; veröffentlichen Sie keine persönlichen oder vertraulichen Inhalte. Legen Sie **kein zusätzliches README, keine Lizenz und keine .gitignore** in GitHub an, da die Startvorlage bereits Dateien enthält.

Öffnen Sie **Settings → Collaborators → Add people** und laden Sie Person B mit deren GitHub-Benutzernamen ein. Person B nimmt die Einladung mit dem eigenen Konto an. Prüfen Sie vor dem Weiterarbeiten, dass beide Personen das Repository sehen und Schreibrechte besitzen. Die Bezeichnungen können bei Organisationsrepositories leicht abweichen.

Quelle: [Repository anlegen](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository), [Mitarbeitende einladen](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository).

## 3 Person A: Startstand prüfen und hochladen

Ersetzen Sie `OWNER/REPOSITORY` durch den tatsächlichen GitHub-Namen. Diese Platzhalter sind keine bereits angelegten Repositories.

```sh
npm ci
npm run check
npm test
git init -b main
git add README.md .gitignore package.json package-lock.json release.txt src test scripts docs .github
git commit -m "feat: add the release board starter"
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

Erwartung: drei Tests bestehen. In GitHub ist unter **Actions** ein Lauf von **Release Board CI** zu sehen. Ist Actions im Repository deaktiviert, klären Sie die Freigabe mit der Lehrperson. Ein vorhandener Workflow ohne ausgeführten Lauf ist noch kein CI-Nachweis.

Alternative zur ZIP: Wenn Sie den freigeschalteten Studierendenstand bereits mit Git geklont haben, überspringen Sie `git init`, `git add` und den Initialcommit. Benennen Sie dessen vorhandenes `origin` mit `git remote rename origin upstream` um und fügen Sie anschließend das neue GitHub-Repository als `origin` hinzu. Prüfen Sie vorher `git remote -v`; führen Sie die Umbenennung nur aus, wenn das bestehende Remote tatsächlich auf die Studierendenquelle verweist.

## 4 Person B: Gemeinsamen Stand klonen

```sh
git clone https://github.com/OWNER/REPOSITORY.git
cd REPOSITORY
npm ci
npm test
git remote -v
```

Beide Arbeitskopien müssen auf dasselbe GitHub-Repository zeigen. Person B legt **kein zweites unabhängiges Remote-Repository** an. Führen Sie nun gemeinsam die [Git Delivery Challenge](lesson-01/02_Git_Delivery_Challenge.md) durch. Beide Personen erstellen ihren Branch, bevor der erste Pull Request integriert wird.

## 5 Gemeinsame Arbeitsweise

Beginnen Sie mit aktuellem `main`: `git switch main`, dann `git pull --ff-only`. Legen Sie einen kurzen eigenen Branch an, ändern Sie gezielt Dateien, prüfen Sie das Ergebnis, committen und pushen Sie Ihren Branch. Öffnen Sie einen **Pull Request** nach `main`. Die andere Person liest den Diff und die Prüfergebnisse. Integrieren Sie erst nach der gemeinsamen Kontrolle; die Übung setzt keine kostenpflichtige Schutzregel voraus.

Ein Merge aktualisiert den lokalen Branch der anderen Person nicht automatisch. Holen Sie den neuen Stand mit `git switch main` und `git pull --ff-only`. Verwenden Sie keine Force-Pushes. Nach der Challenge folgt [Fehler und Reparatur in GitHub Actions](00-start-und-rot-gruen.md).

## Ersatzweg bei fehlendem Zugang

Arbeiten Sie paarweise an einer lokalen Kopie. Zeigen Sie mit `npm run demo:red` einen echten Testfehler und die Reparatur. Für Branches und den Konflikt kann die Lehrperson zwei lokale Branches vom selben Startcommit vorführen. Dokumentieren Sie ausdrücklich, dass Einladung, Remote-Push, Review und Actions-Lauf noch nachzuholen sind. Lokale Tests ersetzen diese Remote-Nachweise nicht.
