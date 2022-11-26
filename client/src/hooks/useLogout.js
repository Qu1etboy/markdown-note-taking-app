import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthContext } from "../contexts/AuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      console.log("User logged out");
    } catch (error) {
      console.error(error);
    }
  };

  return { logout };
};
