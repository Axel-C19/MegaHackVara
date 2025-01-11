import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./home";
import { Main } from "./Main";
import { Landing } from "./Landing";
import { NotFound } from "./not-found";
import GroupList from "./groupList/GroupList";
import GroupDetails from "./GroupDetails/GroupDetails";
import { Expenses } from "./expenses";

const routes = [
  { path: "/", Page: Landing },
  { path: "/Main", Page: Main },
  { path: "/home", Page: Home },
  { path: "/*", Page: NotFound },
  { path: "/expenses", Page: Expenses },
  { path: "/group-list", Page: GroupList },
  { path: "/group-details/:groupId", Page: GroupDetails },
];

function Routing() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {routes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
}

export { Routing };
