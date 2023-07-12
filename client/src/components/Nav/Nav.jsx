import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Logo from '../../assets/Logos/Logo.svg';
import LoginButton from "../Login/LoginButton";
import LogoutButton from "../Login/LogoutButton";
import Profile from "../Login/Profile";
import { MdMenu, MdClose } from 'react-icons/md';

const Nav = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <nav className=" bg-gray md:flex md:items-center md:mb-2 w-full fixed pt-4 pb-4 top-0 left-0">
        <Link to='/'>
        <img className=" pl-8 flex justify-between w-40 cursor-pointer" src={Logo} alt="logo"/>
        </Link>

        <div
          onClick={handleClick}
          className='text-3xl absolute right-8 top-1 cursor-pointer md:hidden'
        >
          {open ? <MdClose color='white' /> : <MdMenu color='white' />}
        </div>
        
        <ul className={`md:pb-0 pb-10 md:flex md:items-center z-[-1] md:z-auto md:static  absolute left-0
            w-full md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100  top[-400px] transition-all ease-in duration-500 ${
            open ? ' bg-gray-dark top-15 opacity-100' : ' top-[-490px]'
          } md:opacity-100 opacity-0`}>
          <li className='mx-4 my-6 md:my-0'>
            <Link className=" text-l hover:text-green-neon duration-500 text-white px-2" to='/'>Inicio</Link>
          </li>
          <li className='mx-4 my-6 md:my-0'>
            <Link className=" text-l hover:text-green-neon duration-500 text-white px-2" to='/activities'>Actividades</Link>
          </li>
          <li className='mx-4 my-6 md:my-0'>
            <Link className=" text-l hover:text-green-neon duration-500 text-white px-2" to='/coaches'>Profesores</Link>
          </li>
          <li className='mx-4 my-6 md:my-0'>           
          {/* <div className="md:items-center mx-4 my-6 md:my-0"> */} 
          {/* Se comento este div por que causaba conflicto */}
            <Link className=" text-l hover:text-green-neon duration-500 text-white px-2" to='/prices'>Paquetes</Link>
            {/* Se cambio la ruta a la vista Paquetes ya que no la mostraba */}
          </li>          
        </ul>
        <div className=" items-center ml-auto mr-8 mb-4 md:mb-0">
        {isAuthenticated ? (
          <>
            <Profile user={user} />
            <LogoutButton logout={logout} />
          </>
        ) : (
          <LoginButton loginWithRedirect={loginWithRedirect} />
        )}
        </div> 
        {/* </ul> */} 
        {/* Se comento este ul por que causaba error              */}
      </nav>
  );
};

export default Nav;










































































