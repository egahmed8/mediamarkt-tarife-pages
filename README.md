# MediaMarkt Tarife: JSON ueberschreiben + CSV bauen

Dieses Projekt macht genau zwei Schritte:

1. Versuch, die aktuelle Tarif-JSON zu holen und `mediamarkt_offers.json` zu ueberschreiben.
2. Danach `tarife.csv` aus `payload.offers` erstellen.

## Schnellstart

- Doppelklick auf `run.bat`
- oder im Terminal:

```powershell
python script.py
```

## Wichtiger Konfigurationspunkt

In `script.py` gibt es die Konstante `OFFERS_SOURCE_URL`.

- Wenn du die exakte URL aus den DevTools kennst, dort eintragen.
- Wenn sie leer bleibt, nutzt das Skript `AUTO_SOURCE_URLS` als Fallback.

## Nur lokale JSON nutzen

```powershell
python script.py --no-fetch
```

## Webseite (GitHub/GitLab Pages)

Es gibt jetzt eine statische Seite in `docs/`:

- `docs/index.html`
- `docs/app.js`
- `docs/styles.css`
- `docs/tarife.csv`

Features:

- zeigt `tarife.csv` als Tabelle
- Button **CSV neu laden**
- Button **Fetch + Ueberschreiben** (erst aktiv nach Checkbox + bestaetigen)
- Download-Link, um die aktuelle Ansicht wieder als CSV zu speichern
- Sortierung per Klick auf Spaltenkoepfe

Hinweis: Der Fetch-Button probiert auf Pages zuerst direkt und dann CORS-Fallback-Proxys. Das kann funktionieren, ist aber nicht garantiert (Proxy-Limits/Blockaden moeglich). Wenn es fehlschlaegt, lokal `python script.py` ausfuehren und neue `tarife.csv` committen.

## Lokal testen

```powershell
cd C:\Users\ahmed\PyCharmMiscProject
python -m http.server 8000
```

Dann im Browser oeffnen: `http://localhost:8000/docs/`

## GitHub Pages

Workflow ist vorhanden: `.github/workflows/pages.yml`

1. Repo auf GitHub pushen
2. In GitHub unter **Settings -> Pages** als Source **GitHub Actions** waehlen
3. Push auf `main`/`master` deployed automatisch

## GitLab Pages

Pipeline ist vorhanden: `.gitlab-ci.yml`

1. Repo auf GitLab pushen
2. Push auf `main`/`master` startet den `pages` Job
3. Seite liegt danach unter der GitLab-Pages-URL des Projekts

