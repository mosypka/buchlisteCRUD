import BuchListe from '../components/BuchListe';
import './BuecherSeite.css';

function BuecherSeite() {
  return (
    <div className="buecher-seite">
      <h1>Mosypka's lesenswerter Stuff</h1>
      <h2>Hier findest du eine Auswahl meiner Lieblingsbücher:</h2>
      <BuchListe />
    </div>
  );
}

export default BuecherSeite;