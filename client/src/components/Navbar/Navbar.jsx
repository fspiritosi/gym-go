import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

export const NavBar  = () => {

const[isMobile, setIsMovile] = useState(false);
    return (
        <nav className="Navbar">
            <h1 className="text-center">GYM GO</h1>
            <h3 className="logo">Logo</h3>
            <ul className={isMobile ? "nav-links-mobile" : "nav-links"}
            onClick={()=>setIsMovile(false)}
            >
                <Link to="/" className="activities">
                    <li>Activities</li>
                </Link>
                <Link to="/createclasses/" className="createclasses">
                    <li>Create Classes</li>
                </Link>         
            </ul>
            <button className="mobile-menu-icon"
                onClick={()=> setIsMovile(!isMobile)}
            >
                {isMobile ? 
                (<i className="fas fa-times"></i>
                ):(
                <i className="fas fa-bars"></i>
                )}
            </button>
            
        </nav>
    )

}

export default NavBar

