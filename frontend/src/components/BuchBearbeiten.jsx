import { useState } from 'react';
import { request, gql } from 'graphql-request';


const MUTATION = gql`
mutation Buchaendern(
  $id: ID!,
  $titel: String,
  $autor: String,
  $erscheinungsjahr: Int,
  $beschreibung: String
) {
  buchaendern(
    id: $id,
    titel: $titel,
    autor: $autor,
    erscheinungsjahr: $erscheinungsjahr,
    beschreibung: $beschreibung
  ) {
    id titel autor erscheinungsjahr beschreibung
  }
}
`;


function BuchBearbeiten({ buch, abbrechen }) {

const [titel, setTitel] = useState(buch.titel);
const [autor, setAutor] = useState(buch.autor);
const [erscheinungsjahr, setErscheinungsjahr] = useState(buch.erscheinungsjahr);
const [beschreibung, setBeschreibung] = useState(buch.beschreibung);


  async function speichern(e) {

    e.preventDefault();


    try {

      await request(
        'http://localhost:3000/graphql',
        MUTATION,
        {
          id: buch.id,
          titel,
          autor
        }
      );


      window.location.reload();


    } catch(err) {

      console.error(
        'Fehler beim Bearbeiten:',
        err
      );

    }

  }


  return (

    <form 
      className="buch-bearbeiten"
      onSubmit={speichern}
    >

      <input
        value={titel}
        onChange={(e) => setTitel(e.target.value)}
      />


      <input
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />
  
      <input
        value={erscheinungsjahr}
        onChange={(e) => setErscheinungsjahr(e.target.value)}
      />
      <input
        value={beschreibung}
        onChange={(e) => setBeschreibung(e.target.value)}
      />

      <div className="buch-aktionen">

        <button type="submit">
          Speichern
        </button>


        <button
          type="button"
          onClick={abbrechen}
        >
          Abbrechen
        </button>

      </div>

    </form>

  );
}

export default BuchBearbeiten;