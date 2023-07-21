import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { getUserLogged } from "../../redux/actions";
import { FaUserCircle } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserLogged(user.email, user.nickname));
    } else {
      return
    }
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {isAuthenticated ? (
        <>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={user.picture}
              alt="usuario"
            />
          </button>
          {isOpen && (
            <div
              className=" origin-top-right absolute mt-2 z-10 top-10 right-0 text-gray-dark bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div className="px-4 py-3 text-sm text-gray-dark">
                <div>{user.name}</div>
                <div className=" font-poppins truncate">{user.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-dark"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray">
                    Mi perfil
                  </Link>
                </li>
                {/* <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray">
                    Próximos eventos
                  </a>
                </li> */}
              </ul>
              <div className="py-1">
                <button
                  onClick={() => logout()}
                  className=" bg-green.claro text-right text-black cursor-pointer rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray"
                  role="menuitem"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <FaUserCircle
          onClick={() => loginWithRedirect()}
          className="w-8 h-8 cursor-pointer"
        />
      )}
    </div>
  );
};
export default Profile;
