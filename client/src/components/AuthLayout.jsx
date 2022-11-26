import { useOutlet } from "react-router-dom";
import AuthContextProvider from "../contexts/AuthContext";

export const AuthLayout = () => {
  const outlet = useOutlet();

  return <AuthContextProvider>{outlet}</AuthContextProvider>;
};
