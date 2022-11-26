import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const ProtectedLayout = ({ children }) => {
  const { user, authIsReady } = useAuthContext();
  // console.log("protectedRoute user = " + user);
  // need to wait for firebase to process the authentication
  if (authIsReady) {
    if (user == null) {
      // user is not authenticated
      return <Navigate to="/" />;
    }
    return <Outlet />;
  } else {
    return null;
  }
};
