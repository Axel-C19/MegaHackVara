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
import { useLocation } from "react-router-dom"; // Import useLocation
import "./app.scss"; // Ajusta la ruta al archivo SCSS

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady, account } = useAccount();
  const { web3IsEnable } = useEnableWeb3();
  const isAppReady = isApiReady && isAccountReady && web3IsEnable;

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

  // Get current location
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-container">
      <Header isAccountVisible={isAccountReady} />
      <div className="app-layout">
        {!isHomePage && <Sidebar />}{" "}
        {/* Sidebar siempre visible si no es "/" */}
        <div style={{ flex: 1, width: "100%" }}>
          {isAppReady ? <Routing /> : <ApiLoader />}
        </div>
      </div>
    </div>
  );
}

export const App = withProviders(Component);
