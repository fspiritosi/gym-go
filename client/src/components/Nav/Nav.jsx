import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../views/Landing/image/logo.png";
import "./Navbar.css";
import LoginButton from "../Login/LoginButton";
import LogoutButton from "../Login/LogoutButton";
import Profile from "../Login/Profile";
import { useAuth0 } from "@auth0/auth0-react";


const Nav = () => {
  const [isMobile, setIsMovile] = useState(false);
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="navbar">
      {/* <h1 className="text-center">GYM GO</h1> */}
      <div className="nav-container">
        <img src={Logo} alt="logo" className="logo" />
        <ul
          //   className={isMobile ? "nav-links-mobile" : "nav-links"}
          className="nav-links"
          onClick={() => setIsMovile(false)}
        >
          <Link to="/activities" className="activities">
            <li>Actividades</li>
          </Link>
          <Link to="/coaches" className="coaches">
            <li>Profesores</li>
          </Link>
          <Link to="/create-activity/" className="create-activity">
            <li>Crear Actividades</li>
          </Link>
          <li>
            {isAuthenticated ? (
              <>
                <li>
                  <Profile />
                </li>
                <li>
                  <LogoutButton />
                </li>
              </>
            ) : (
              <LoginButton />
            )}
          </li>
        </ul>
      </div>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMovile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
};

export default Nav;
