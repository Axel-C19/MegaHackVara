import { Link } from 'react-router-dom';
import './logo.module.scss';
import logoImage from './Logo.png'; // Asegúrate de que la ruta sea correcta

function Logo() {
  return (
    <Link to="/">
      <h1>Logo</h1>
    </Link>
  );
}

export { Logo };
