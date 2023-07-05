import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";
import Logo from '../../Assets/Logos/Logo.svg';
// import LoginButton from "../Login/LoginButton";
// import LogoutButton from "../Login/LogoutButton";
// import Profile from "../Login/Profile";
import { MdMenu, MdClose } from 'react-icons/md';


const Nav = ()=>{ 

  let [open, setOpen] = useState(false)
  
  const handleClick = () => {
    setOpen(!open);
  };
   
  return (
    <nav className='w-full fixed top-0 left-0'>
      
      <div className=' md:flex md:items-center justify-between bg-gray py-4 md:px-11 px-7'>
      
      <div className=' flex justify-between items-center cursor-pointer'>
        <Link to='/'>
          <img src={Logo} alt="icono" />
        </Link>                     
      </div>
      <div onClick={handleClick} className='text-3xl absolute right-8 top-5 cursor-pointer md:hidden'>
        {open ? <MdClose /> : <MdMenu />}
      </div>
      
      <ul className= {` md:pb-0 pb-10 md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-light  left-0
       w-full md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100  top[-400px] transition-all ease-in duration-500 ${open ? ' top-20 opacity-100' : ' top-[-490px]'} md:opacity-100 opacity-0`}>
        
        <li className=' mx-4 my-6 md:my-0'>
          <Link className='text-l hover:text-green-neon duration-500' to='/activities'> Actividades </Link>
        </li>
        <li className=' mx-4 my-6 md:my-0'>
          <Link className='text-l hover:text-green-neon duration-500' to='/coaches'> Profesores </Link>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <Link className='text-l hover:text-green-neon duration-500' to='/create-activity'> Crear Actividad </Link>
        </li>
        <button className=' bg-green-neon text-white font-serif duration-500 px-6 py-2 hover:bg-white rounded'>
          Log in
        </button>
      </ul>
      </div>         
    </nav>
    
  )
   
}

export default Nav



































































