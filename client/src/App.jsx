import { useAuthContext } from "./contexts/AuthContext";
import SignInButton from "./components/SignInButton";
import Home from "./pages/Home";

function App() {
  const { user, authIsReady } = useAuthContext();
  // console.log(user);
  return (
    <div className="relative w-full flex flex-col items-center p-5 gap-2">
      {authIsReady ? (
        <>{user == null ? <SignInButton /> : <Home user={user} />}</>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;
