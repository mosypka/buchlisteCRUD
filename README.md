# 📚 Buchladen – GraphQL/Apollo Übungsprojekt

Ein vollständiges CRUD-Projekt zur Übung des Stacks **React (Vite) + Express + Apollo Server + GraphQL + Mongoose + MongoDB**.

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Frontend | React, Vite, React Router |
| API-Layer | GraphQL, Apollo Server |
| Backend | Node.js, Express |
| Datenbank | MongoDB, Mongoose |
| HTTP-Client (Frontend) | graphql-request |

## Projektstruktur

```
buchladen-vite/
├── backend/
│   ├── server.js          # Express + Apollo Server + Mongoose Setup
│   ├── package.json
│   └── node_modules/
└── frontend/
    ├── src/
    │   ├── App.jsx          # React Router Konfiguration
    │   ├── main.jsx         # Einstiegspunkt, BrowserRouter
    │   ├── routes/
    │   │   ├── BuecherSeite.jsx
    │   │   ├── BuecherSeite.css
    │   │   └── BuchHinzufuegen.jsx   # Formular für Create-Mutation, eigene Route
    │   └── components/
    │       ├── Navigation.jsx    # Globale Navigation, außerhalb von <Routes>
    │       ├── Navigation.css
    │       ├── BuchListe.jsx     # Holt Daten via GraphQL, hält State, Sortierung
    │       ├── BuchListe.css
    │       ├── BuchKarte.jsx     # Zeigt einzelnes Buch (Props), togglet Bearbeiten-Modus
    │       ├── BuchKarte.css
    │       ├── BuchBearbeiten.jsx # Formular für Update-Mutation
    │       └── BuchLoeschen.jsx   # Button für Delete-Mutation
    ├── package.json
    └── node_modules/
```

## Architektur-Prinzip: Separation of Concerns

- **`routes/`** → ganze Seiten/Views (verknüpft mit einer URL über React Router)
- **`components/`** → wiederverwendbare UI-Bausteine
- **State** lebt dort, wo Daten geholt/verändert werden (`BuchListe`)
- **Props** fließen von oben nach unten zu reinen Anzeige-Komponenten (`BuchKarte`)

## Setup

### Voraussetzungen

- Node.js
- MongoDB läuft lokal (z. B. als `systemd`-Service: `systemctl status mongod`)

### 1. Backend

```bash
cd backend
npm install
node server.js
```

Server läuft auf `http://localhost:3000`, GraphQL-Endpunkt unter `http://localhost:3000/graphql` (Apollo Sandbox zum manuellen Testen).

> **Wichtig:** Node lädt Code-Änderungen nicht automatisch nach. Nach jeder Änderung an `server.js` (z. B. neues Schema-Feld) muss der Server neu gestartet werden (`Strg+C`, dann `node server.js`). Optional: [`nodemon`](https://www.npmjs.com/package/nodemon) für Auto-Reload installieren.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend läuft auf `http://localhost:5173`.

## Backend-Pakete

```bash
npm install express mongoose @apollo/server @as-integrations/express5 graphql cors
```

> **Versionshinweis:** Ab Apollo Server v5 ist die Express-Integration nicht mehr im Hauptpaket enthalten (`@apollo/server/express4` existiert nicht mehr). Stattdessen wird das separate Paket `@as-integrations/express5` benötigt.

## Frontend-Pakete

```bash
npm install react-router-dom graphql-request graphql
```

## Datenmodell

```js
{
  titel: String,          // Pflichtfeld
  autor: String,          // Pflichtfeld
  erscheinungsjahr: Number,
  beschreibung: String
}
```

## GraphQL-Schema (Auszug)

```graphql
type Buch {
  id: ID
  titel: String
  autor: String
  erscheinungsjahr: Int
  beschreibung: String
}

type Query {
  buecher: [Buch]
  buch(id: ID): Buch
}

type Mutation {
  buchHinzufuegen(titel: String, autor: String, erscheinungsjahr: Int, beschreibung: String): Buch
  buchLoeschen(id: ID): Buch
  buchaendern(id: ID, titel: String, autor: String, erscheinungsjahr: Int, beschreibung: String): Buch
}
```

## Funktionen

- ✅ **Create** – neues Buch anlegen über eigene Seite `/buch-hinzufuegen` (`buchHinzufuegen`)
- ✅ **Read** – alle Bücher als Karten anzeigen (`buecher`-Query)
- ✅ **Update** – Buch bearbeiten, inline in der Karte (`buchaendern`)
- ✅ **Delete** – Buch löschen (`buchLoeschen`)
- ✅ **Sortierung** – clientseitig nach Titel, Autor oder Erscheinungsjahr (Dropdown in `BuchListe`)
- ✅ **Navigation** – globale Navigationsleiste (`react-router-dom`'s `<Link>`), außerhalb von `<Routes>` platziert, damit sie auf jeder Seite sichtbar bleibt
- ✅ **Routing** – `/` leitet automatisch auf `/buecher` weiter (`<Navigate>`)

## Gelernte Lektionen / Stolpersteine

- **CORS**: Frontend (Port 5173) und Backend (Port 3000) sind unterschiedliche Origins → `cors`-Middleware im Backend nötig, `app.use(cors())` **vor** den Routen.
- **Top-Level-Await**: Bei `require()` (CommonJS) ist `await` außerhalb einer Funktion nicht erlaubt → Apollo-Start in eine `async function start() { ... } start()`-Funktion wrappen.
- **Feld-Erweiterungen ziehen sich durch die ganze Kette**: Ein neues Datenfeld (z. B. `beschreibung`) muss konsistent ergänzt werden in:
  1. Mongoose-Schema
  2. GraphQL `typeDefs` (Type + alle betroffenen Mutations)
  3. Resolver (Argumente entgegennehmen + weiterreichen)
  4. Frontend-Query/Mutation (GraphQL fragt nur an, was explizit verlangt wird)
  5. Formular-State (bei Bearbeiten-Komponenten)
- **`node_modules` sind pro Ordner getrennt** – `npm install` im Frontend hat keinen Effekt auf das Backend und umgekehrt.
- **State nicht direkt mutieren**: Beim Sortieren wird das Array mit `[...buecher].sort(...)` kopiert statt direkt `buecher.sort(...)` aufzurufen – sonst würde React die Änderung am Original-State nicht bemerken bzw. es käme zu unvorhersehbarem Verhalten.

## Mögliche nächste Schritte

- Validierung im Bearbeiten-Formular (leere Pflichtfelder verhindern)
- Bestätigungsdialog vor dem Löschen
- `nodemon` fürs Backend einrichten
- Migration auf einen State-Manager/Cache wie Apollo Client statt `graphql-request`
- Detailseite pro Buch (`/buecher/:id` via `useParams`)
