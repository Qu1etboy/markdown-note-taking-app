import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthContext } from "../contexts/AuthContext";
import { createUser } from "../api/createUser";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (provider) => {
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      dispatch({ type: "LOGIN", payload: user });
      // add user to database
      createUser(user);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return { login };
};
