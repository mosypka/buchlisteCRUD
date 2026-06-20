import { useState } from 'react';
import { request, gql } from 'graphql-request';
import './BuchHinzufuegen.css';

const MUTATION = gql`
  mutation BuchHinzufuegen(
    $titel: String!
    $autor: String!
    $erscheinungsjahr: Int
    $beschreibung: String
  ) {
    buchHinzufuegen(
      titel: $titel
      autor: $autor
      erscheinungsjahr: $erscheinungsjahr
      beschreibung: $beschreibung
    ) {
      id
      titel
      autor
      erscheinungsjahr
      beschreibung
    }
  }
`;

function BuchHinzufuegen() {

  const [titel, setTitel] = useState('');
  const [autor, setAutor] = useState('');
  const [erscheinungsjahr, setErscheinungsjahr] = useState('');
  const [beschreibung, setBeschreibung] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await request(
        'http://localhost:3000/graphql',
        MUTATION,
        {
          titel,
          autor,
          erscheinungsjahr: erscheinungsjahr
            ? Number(erscheinungsjahr)
            : null,
          beschreibung
        }
      );

      console.log('Buch gespeichert:', data);

      // Formular zurücksetzen
      setTitel('');
      setAutor('');
      setErscheinungsjahr('');
      setBeschreibung('');

    } catch (err) {
      console.error('Fehler beim Speichern:', err);
    }
  };


  return (
    <div className="buch-hinzufuegen">

      <h1>Buch hinzufügen</h1>
      <h2>Neues Buch in die Datenbank aufnehmen</h2>

      <div className="buch-formular">

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Titel"
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Erscheinungsjahr"
            value={erscheinungsjahr}
            onChange={(e) => setErscheinungsjahr(e.target.value)}
          />

          <textarea
            placeholder="Beschreibung"
            value={beschreibung}
            onChange={(e) => setBeschreibung(e.target.value)}
          />

          <button type="submit">
            Buch speichern
          </button>

        </form>

      </div>

    </div>
  );
}

export default BuchHinzufuegen;