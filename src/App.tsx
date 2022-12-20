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
};

export default function App() {
  const { auth } = useContext(GlobalContext);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/create_new_user"} element={<CreateNewUser />} />
        <Route element={<ProtectedRoute isAllowed={!!auth.token} />}>
          <Route path={"/app/calendar"} element={<Calendar />} />
          <Route path={"/app/profile"} element={<Profile />} />
        </Route>
        {/* <Route path={"/create_new_user"} element={<CreateNewUser />} /> */}
        {/* <Route path={"/login/create_new_user"} element={<UpdatePage />} /> */}
        {/* <Route element={<ProtectedRoute isAllowed={auth.isAuthenticated} />}>
        <Route path={RoutesEnum.EMPTY} element={null} />
        <Route
          path={RoutesEnum.LOGIN_CHANGE_PASSWORD}
          element={<ChangePasswordForm />}
        />
        <Route element={<DefaultLayout />}>
          <Route path="/patients/*" element={<Patients />} />
          <Route path="/error-logs/*" element={<ErrorLogsPages />} />
          <Route
            path={RoutesEnum.CHANGE_PASSWORD}
            element={<ChangePassword />}
          />
          <Route
            path={`${RoutesEnum.ADMINISTRATORS}/*`}
            element={<Administrators />}
          />
        </Route>
      </Route> */}
      </Routes>
    </Router>
  );
}
