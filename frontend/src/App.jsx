import { Routes, Route } from 'react-router-dom';
import BuecherSeite from './routes/BuecherSeite';
import BuchHinzufuegen from './routes/BuchHinzufuegen';
import Navigation from './components/Navigation';
import { Navigate } from 'react-router-dom';


function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/buecher" />}
        />
        <Route
          path="/buecher"
          element={<BuecherSeite />}
        />

        <Route
          path="/buch-hinzufuegen"
          element={<BuchHinzufuegen />}
        />

      </Routes>
    </>
  );
}

export default App;