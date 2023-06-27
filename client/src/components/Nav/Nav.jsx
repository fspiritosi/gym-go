import React, { useState } from 'react'
import { Link} from "react-router-dom";
import gymgo from "../Nav/images/gymgo.svg";
import "./Navbar.css"

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/activities">
        <img src={gymgo} alt="Logo" />
        </Link>
      </div>
      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/activities">Home</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-create-class">
        <Link to="/reate-activity">Crear Clase</Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Nav;