import {
  HashRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import Calendar from "./pages/Calendar/Calendar";
import { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";
import CreateNewUser from "./pages/CreateNewUser/CreateNewUser";
import Profile from "./pages/Profile/Profile";
import Connections from "./pages/Connections/Connections";
import UsersList from "./pages/UsersList/UsersList";
import ConnectionRequests from "./pages/ConnectionRequests/ConnectionRequests";

type ProtectedRouteProps = {
  children?: JSX.Element;
  isAllowed: boolean;
  fallbackPath?: string;
};

const ProtectedRoute = ({
  children,
  isAllowed,
  fallbackPath = "/",
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={fallbackPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const ROUTE_NAMES = {
  login: "/",
  create_new_user: "/create_new_user",
  calendar: "/app/calendar",
  profile: "/app/profile",
  connections: "/app/connections",
  connection_requests: "/app/connection_requests",
  users_list: "/app/users_list",
};

//PATTERN: application controller
export default function App() {
  const { auth } = useContext(GlobalContext);

  return (
    <Router>
      <Routes>
        <Route path={ROUTE_NAMES.login} element={<Login />} />
        <Route path={ROUTE_NAMES.create_new_user} element={<CreateNewUser />} />
        <Route element={<ProtectedRoute isAllowed={!!auth.token} />}>
          <Route path={ROUTE_NAMES.calendar} element={<Calendar />} />
          <Route path={ROUTE_NAMES.profile} element={<Profile />} />
          <Route path={ROUTE_NAMES.connections} element={<Connections />} />
          <Route
            path={ROUTE_NAMES.connection_requests}
            element={<ConnectionRequests />}
          />
          <Route path={ROUTE_NAMES.users_list} element={<UsersList />} />
        </Route>
      </Routes>
    </Router>
  );
}
