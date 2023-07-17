import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const Profile = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {isAuthenticated ? (
        <>
          <button onClick={toggleDropdown} className="flex items-center space-x-2">
            <img className="w-8 h-8 rounded-full" src={user.picture} alt='usuario' />         
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
                  <a href="#" className="block px-4 py-2 hover:bg-gray">
                    Clases disponibles
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray">
                    Próximos eventos
                  </a>
                </li>
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
