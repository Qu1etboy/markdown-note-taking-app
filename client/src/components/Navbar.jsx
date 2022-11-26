import { useAuthContext } from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <nav className="container w-full flex justify-between items-center border-b border-b-black pb-3 mb-5">
      <div>
        <Link to="/" className="text-xl">
          Markdown Note Taking App
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={user.photoURL}
          alt="userProfileImg"
          className="rounded-full w-[50px]"
        />
        <button
          type="button"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
