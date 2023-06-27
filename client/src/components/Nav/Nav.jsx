import React, { useState } from 'react'
import { Link} from "react-router-dom";
import Logo from '../../views/Landing/image/logo.png'
import "./Navbar.css"

const Nav = () => {

  const[isMobile, setIsMovile] = useState(false);
    return (
      <nav className="navbar">
        {/* <h1 className="text-center">GYM GO</h1> */}
        <div className='nav-container'>

        <img src={Logo} alt='logo' className="logo" />
        <ul
          //   className={isMobile ? "nav-links-mobile" : "nav-links"}
          className="nav-links"
          onClick={() => setIsMovile(false)}
        >
          <Link to="/activities" className="activities">
            <li>Activities</li>
          </Link>
          <Link to="/create-activity/" className="create-activity">
            <li>Create Classes</li>
          </Link>
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
}

export default Nav