import { useAuthContext } from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <nav className="container w-full flex justify-between items-center border-b border-b-black pb-3 mb-5 relative">
      <div>
        <Link to="/" className="text-xl font-bold">
          Markdown Note Taking App
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={user.photoURL}
            alt="userProfileImg"
            className="rounded-full w-[50px] cursor-pointer hover:drop-shadow-md"
            onClick={() => setToggleDropDown(!toggleDropDown)}
          />
          {toggleDropDown && (
            <div
              id="dropdown"
              className="z-10 w-44 rounded right-0 divide-y divide-gray-500 shadow dark:bg-gray-700 absolute mt-3"
            >
              <div className="py-4 px-4"> {user.displayName}</div>
              <ul
                className="py-1 text-md text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={logout}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
