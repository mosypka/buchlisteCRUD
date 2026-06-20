import './BuchListe.css';
import { request, gql } from 'graphql-request';
import { useEffect, useState } from 'react';
import BuchKarte from './BuchKarte';

const QUERY = gql`
  query {
    buecher {
      id
      titel
      autor
      erscheinungsjahr
      beschreibung
    }
  }
`;

function BuchListe() {
  const [buecher, setBuecher] = useState([]);
  const [sortierung, setSortierung] = useState('titel');

  useEffect(() => {
    request('http://localhost:3000/graphql', QUERY)
      .then(data => setBuecher(data.buecher))
      .catch(err => console.error(err));
  }, []);


  const sortierteBuecher = [...buecher].sort((a, b) => {

    if (sortierung === 'titel') {
      return a.titel.localeCompare(b.titel);
    }

    if (sortierung === 'autor') {
      return a.autor.localeCompare(b.autor);
    }

    if (sortierung === 'jahr') {
      return (a.erscheinungsjahr ?? 0) - (b.erscheinungsjahr ?? 0);
    }

    return 0;
  });


  return (
    <>
      <div className="sortierung">

        <label htmlFor="sortieren">
          Sortieren nach:
        </label>

        <select
          id="sortieren"
          value={sortierung}
          onChange={(e) => setSortierung(e.target.value)}
        >
          <option value="titel">
            Titel
          </option>

          <option value="autor">
            Autor
          </option>

          <option value="jahr">
            Erscheinungsjahr
          </option>

        </select>

      </div>


      <div className="buch-grid">

        {sortierteBuecher.map(b => (

          <BuchKarte

            key={b.id}

            id={b.id}

            titel={b.titel}

            autor={b.autor}

            erscheinungsjahr={b.erscheinungsjahr}

            beschreibung={b.beschreibung}

          />

        ))}

      </div>
    </>
  );
}

export default BuchListe;