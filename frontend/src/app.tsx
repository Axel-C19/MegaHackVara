import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { withProviders } from "@/app/hocs";
import { useEnableWeb3 } from "./app/hooks";
import { Routing } from "./pages";
import { useInitSails } from "./app/hooks";
import { CONTRACT_DATA, sponsorName, sponsorMnemonic } from "./app/consts";
import { Sidebar } from "@/components/layout";
import "@gear-js/vara-ui/dist/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./app.scss";

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady, account } = useAccount();
  const { web3IsEnable } = useEnableWeb3();
  const isAppReady = isApiReady && isAccountReady && web3IsEnable;
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Initialize Sails
  useInitSails({
    network: "wss://testnet.vara.network",
    contractId: CONTRACT_DATA.programId,
    idl: CONTRACT_DATA.idl,
    vouchersSigner: {
      sponsorName,
      sponsorMnemonic,
    },
  });

  // Efecto para manejar redirecciones basadas en el estado de la cuenta
  useEffect(() => {
    if (isAppReady) {
      if (account && location.pathname === "/") {
        navigate("/group-list");
      } else if (!account && location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [account, location.pathname, navigate, isAppReady]);

  return (
    <div className="app-container">
      <Header isAccountVisible={isAccountReady} />
      <div className="app-layout">
        {!isHomePage && <Sidebar />}
        <div style={{ flex: 1, width: "100%" }}>
          {isAppReady ? <Routing isAuthenticated={!!account} /> : <ApiLoader />}
        </div>
      </div>
    </div>
  );
}

export const App = withProviders(Component);