import { Link } from 'react-router-dom';
import styles from './logo.module.scss';
import logoImage from './Logo.png';

function Logo() {
  return (
    <Link to="/" className={styles.link}>
      <img src="./Logo.png" alt="Logo" className={styles.logo} />
    </Link>
  );
}

export { Logo };
