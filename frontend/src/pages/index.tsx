import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home } from "./home";
import { Main } from "./Main";
import { Landing } from "./Landing";
import { NotFound } from "./not-found";
import GroupList from "./groupList/GroupList";
import GroupDetails from "./GroupDetails/GroupDetails";
import { Expenses } from "./expenses";

// Separar las rutas públicas de las protegidas
const publicRoutes = [
  { path: "/", Page: Landing },
];

const protectedRoutes = [
  { path: "/Main", Page: Main },
  { path: "/home", Page: Home },
  { path: "/expenses", Page: Expenses },
  { path: "/group-list", Page: GroupList },
  { path: "/group-details/:groupId", Page: GroupDetails },
  { path: "/*", Page: NotFound },
];

interface RoutingProps {
  isAuthenticated: boolean;
}

function Routing({ isAuthenticated }: RoutingProps) {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Rutas públicas */}
      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}

      {/* Rutas protegidas */}
      {protectedRoutes.map(({ path, Page }) => (
        <Route
          key={path}
          path={path}
          element={
            isAuthenticated ? <Page /> : <Navigate to="/" replace />
          }
        />
      ))}
    </Routes>
  );
}

export { Routing };