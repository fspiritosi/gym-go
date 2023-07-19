import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login/LoginButton";
import LogoutButton from "../Login/LogoutButton";
import Logo from "../../Assets/Logos/Logo.svg";
import Profile from "../Login/Profile";
import { MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Nav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <nav className="flex fixed justify-between bg-gray text-white w-screen">
      <div className="px-5 xl:px-12 py-3 flex w-full items-center">
        <Link to="/">
          <img
            className=" pl-8 flex justify-between w-40 cursor-pointer"
            src={Logo}
            alt="logo"
          />
        </Link>

        <ul
          className={`md:flex md:items-center px-6 mx-auto font-poppins font-heading z-[-1] md:z-auto md:static absolute left-0 w-full md:w-auto md:py-0 py-10 md:pl-0 pl-7 md:opacity-100  top[-400px] transition-all ease-in duration-500 ${
            open ? " bg-gray top-1 opacity-100" : " top-[-490px]"
          } md:opacity-100 opacity-0`}
        >
          <li className="mx-4 my-6 md:my-0">
            <Link
              className=" text-l hover:text-green-neon duration-500 text-white px-2"
              to="/activities"
            >
              Actividades
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link
              className=" text-l hover:text-green-neon duration-500 text-white px-2"
              to="/coaches"
            >
              Profesores
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link
              className=" text-l hover:text-green-neon duration-500 text-white px-2"
              to="/prices"
            >
              Paquetes
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link
              className=" text-l hover:text-green-neon duration-500 text-white px-2"
              to="/classes"
            >
              Clases
            </Link>
          </li>
          {isAuthenticated && 
          <li className="mx-4 my-6 md:my-0">
            <Link
              className=" text-l hover:text-green-neon duration-500 text-white px-2"
              to="/admin"
            >
              <button className=" bg-green-neon text-right text-black cursor-pointer rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-green.claro">
                Dashboard Admin
              </button>
            </Link>
          </li>
          }
        </ul>
        <div className="hidden xl:flex items-center space-x-5 hover:text-yellow">
          {isAuthenticated ? (
            <Profile />
          ) : (
            <FaUserCircle
              onClick={() => loginWithRedirect()}
              className="w-8 h-8 cursor-pointer"
            />
          )}
        </div>
      </div>

      <Link className="xl:hidden flex w-40 items-center hover:text-yellow">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <FaUserCircle
            onClick={() => loginWithRedirect()}
            className="w-8 h-8 cursor-pointer"
          />
        )}
      </Link>

      <Link
        onClick={handleClick}
        className="navbar-burger self-center mr-12 xl:hidden flex items-center"
      >
        {open ? (
          <MdClose className="w-6 h-6 hover:text-green-neon" />
        ) : (
          <MdMenu className="w-6 h-6 hover:text-green-neon" />
        )}
      </Link>
    </nav>
  );
};

export default Nav;
