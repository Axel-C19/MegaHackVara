import { Logo } from "./logo";
import { Wallet } from "@gear-js/wallet-connect";
import { useLocation } from "react-router-dom";
import styles from "./header.module.scss";
import clsx from "clsx"; // Instala esta librería opcionalmente para combinar clases dinámicas

interface Props {
  isAccountVisible: boolean;
}

let displayBalance = true;

export function Header({ isAccountVisible }: Props) {
  const location = useLocation();

  // Determina si estás en la ruta "/"
  const isHome = location.pathname === "/";

  return (
    <header
      className={clsx(styles.header, {
        [styles.homeHeader]: isHome,
        [styles.defaultHeader]: !isHome,
      })}
    >
      <Logo />
      {isAccountVisible && (
        <Wallet theme="vara" displayBalance={displayBalance} />
      )}
    </header>
  );
}
