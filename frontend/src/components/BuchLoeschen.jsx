import { request, gql } from 'graphql-request';
import './BuchLoeschen.css';


const MUTATION = gql`
  mutation BuchLoeschen($id: ID!) {
    buchLoeschen(id: $id) {
      id
      titel
    }
  }
`;


function BuchLoeschen({ id, titel }) {

  const loeschen = async () => {

    const bestaetigung = window.confirm(
      `Soll "${titel}" wirklich gelöscht werden?`
    );

    if (!bestaetigung) {
      return;
    }


    try {

      const data = await request(
        'http://localhost:3000/graphql',
        MUTATION,
        {
          id
        }
      );


      console.log('Gelöscht:', data);


      // erstmal einfach aktualisieren
      window.location.reload();


    } catch (err) {

      console.error(
        'Fehler beim Löschen:',
        err
      );

    }
  };


  return (
    <button
      className="loeschen-button"
      onClick={loeschen}
    >
      Löschen
    </button>
  );
}


export default BuchLoeschen;