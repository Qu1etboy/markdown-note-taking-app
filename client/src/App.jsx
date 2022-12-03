import { useAuthContext } from "./contexts/AuthContext";
import SignInButton from "./components/SignInButton";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";

function App() {
  const { user, authIsReady } = useAuthContext();
  // console.log(user);
  return (
    <div>
      {authIsReady ? (
        <>{user == null ? <SignInButton /> : <Navigate to="/notes" />}</>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;
