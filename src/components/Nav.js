import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { FaRegMoon } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { getCurrentUserDB } from "../services/api";

function Nav() {
  const { user, logOut, token } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const node = useRef();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUser = await getCurrentUserDB(user?.uid, token);
        setCurrentUser(getUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    document.addEventListener("mousedown", handleClickOutside);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [token, user]);

  return (
    <header className="flex justify-between py-14 items-center max-h-48 mb-14">
      <Link to="/">
        <h1 className="cursor-pointer text-3xl font-bold text-myblue">
          Eduera.
        </h1>
      </Link>
      <div>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive
              ? "text-md pb-1 mx-5 text-sky-600 font-semibold border-b-4 border-green-600"
              : "text-md pb-1 mx-5 text-sky-600 font-semibold hover:border-b-4 border-green-600"
          }
        >
          <span>Courses</span>
        </NavLink>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            isActive
              ? "text-md pb-1 mx-5 text-sky-600 font-semibold border-b-4 border-green-600"
              : "text-md pb-1 mx-5 text-sky-600 font-semibold hover:border-b-4 border-green-600"
          }
        >
          <span>FAQ</span>
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "text-md pb-1 mx-5 text-sky-600 font-semibold border-b-4 border-green-600"
              : "text-md pb-1 mx-5 text-sky-600 font-semibold hover:border-b-4 border-green-600"
          }
        >
          <span>Blog</span>
        </NavLink>
      </div>
      <div className="flex items-center" ref={node}>
        <FaRegMoon className="cursor-pointer" />
        {user ? (
          <div className="relative flex">
            <img
              onClick={() => setIsOpen(!isOpen)}
              src={user?.photoURL}
              alt=""
              title={user?.displayName}
              className="w-[50px] h-[50px] rounded-full ml-5 cursor-pointer"
            />
            {isOpen && (
              <div className="absolute top-10 right-0 mt-2 w-48 rounded-md shadow-lg">
                <div className="rounded-md bg-white shadow-xs">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  {currentUser?.role === "student" ? (
                    <Link
                      to="/studentDashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Student Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/adminDashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              </div>
            )}
            <button
              className="mx-5 rounded-md bg-myblue px-2 py-1 text-white"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="mx-5 rounded-md bg-myblue px-2 py-1 text-white">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Nav;
