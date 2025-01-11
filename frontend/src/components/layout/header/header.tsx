import { Logo } from "./logo";
import { Wallet } from "@gear-js/wallet-connect";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./header.module.scss";
import clsx from "clsx";
import { useAccount } from "@gear-js/react-hooks";

interface Props {
  isAccountVisible: boolean;
}

let displayBalance = true;

export function Header({ isAccountVisible }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { account } = useAccount();

  // Determina si estás en la ruta "/"
  const isHome = location.pathname === "/";

  // Efecto para manejar la redirección cuando la cuenta se conecta
  useEffect(() => {
    if (account && location.pathname === "/") {
      navigate("/group-list");
    }
  }, [account, location.pathname, navigate]);

  return (
    <header
      className={clsx(styles.header, {
        [styles.homeHeader]: isHome,
        [styles.defaultHeader]: !isHome,
      })}
    >
      <Logo />
      {isAccountVisible && (
        <Wallet 
          theme="vara" 
          displayBalance={displayBalance}
        />
      )}
    </header>
  );
}