import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Sidenav from "./Sidenav";
import Layout from "./Layout";

export const ProtectedLayout = ({ children }) => {
  const { user, authIsReady } = useAuthContext();
  // console.log("protectedRoute user = " + user);
  // need to wait for firebase to process the authentication
  if (authIsReady) {
    if (user == null) {
      // user is not authenticated
      return <Navigate to="/" />;
    }
    return (
      <div className="flex">
        <Sidenav />
        <Outlet />
      </div>
    );
  } else {
    return null;
  }
};
