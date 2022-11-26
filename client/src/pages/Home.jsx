import { useLogout } from "../hooks/useLogout";
const Home = ({ user }) => {
  const { logout } = useLogout();

  return (
    <>
      <h1 className="text-3xl">Hello, {user.displayName}</h1>
      <h2 className="text-lg">
        You are sign in from {user.providerData[0].providerId}
      </h2>
      <button
        className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

export default Home;
