import { useLocation } from 'react-router-dom'; // Para verificar la ruta actual
import { Logo } from './logo';
import { Wallet } from '@gear-js/wallet-connect';
import { FaSearch } from "react-icons/fa"; // Icono de búsqueda
import styles from './header.module.scss';
import clsx from 'clsx'; // Para combinar clases condicionalmente

interface Props {
  isAccountVisible: boolean;
}

let displayBalance = false;

export function Header({ isAccountVisible }: Props) {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const isHome = location.pathname === '/'; // Verificar si está en "/"

  return (
    <header
      className={clsx(styles.header, { [styles.header_alt]: !isHome })}
    >
      {/* Logo con padding a la izquierda */}
      <div className={styles.header__logo}>
        <Logo />
      </div>

      {/* Barra de búsqueda centrada */}
      {!isHome && (
        <div className={styles.header__search}>
          <FaSearch className={styles.header__searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.header__searchInput}
          />
        </div>
      )}

      {/* Wallet con padding a la derecha */}
      {isAccountVisible && (
          <div className="wallet-wrapper">
          <Wallet displayBalance={true}/>
          </div>
      )}
    </header>
  );
}
