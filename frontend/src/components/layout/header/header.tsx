import { Logo } from "./logo";
import { Wallet } from "@gear-js/wallet-connect";
import styles from "./header.module.scss";

interface Props {
  isAccountVisible: boolean;
}

let displayBalance = true;

export function Header({ isAccountVisible }: Props) {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const isHome = location.pathname === '/'; // Verificar si está en "/"

  return (
    <header className={styles.header}>
      <Logo />
      {isAccountVisible && (
        <Wallet theme="vara" displayBalance={displayBalance} />
      )}
    </header>
  );
}
