import { useAuthContext } from "./contexts/AuthContext";
import SignInButton from "./components/SignInButton";
import Home from "./pages/Home";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
      {authIsReady ? (
        <>{user == null ? <SignInButton /> : <Home user={user} />}</>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;
