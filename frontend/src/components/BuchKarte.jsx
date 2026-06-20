import { useState } from 'react';
import './BuchKarte.css';
import BuchLoeschen from './BuchLoeschen';
import BuchBearbeiten from './BuchBearbeiten';

function BuchKarte({ 
  id, 
  titel, 
  autor, 
  erscheinungsjahr, 
  beschreibung 
}) {

  const [bearbeiten, setBearbeiten] = useState(false);


  return (
    <div className="buch-karte">

      {!bearbeiten ? (

        <>
          <h3>{titel}</h3>

          <p>{autor}</p>

          <p>{erscheinungsjahr}</p>

          <p>{beschreibung}</p>


          <div className="buch-aktionen">

            <button
              className="bearbeiten-button"
              onClick={() => setBearbeiten(true)}
            >
              Bearbeiten
            </button>


            <BuchLoeschen
              id={id}
              titel={titel}
            />

          </div>
        </>


      ) : (

        <BuchBearbeiten
          buch={{
            id,
            titel,
            autor,
            erscheinungsjahr,
            beschreibung
          }}
          abbrechen={() => setBearbeiten(false)}
        />

      )}

    </div>
  );
}

export default BuchKarte;