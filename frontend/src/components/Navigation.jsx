import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">

      <Link to="/buecher">
        Bücher
      </Link>

      <Link to="/buch-hinzufuegen">
        Buch hinzufügen
      </Link>

    </nav>
  );
}

export default Navigation;