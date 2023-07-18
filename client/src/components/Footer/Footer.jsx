import React from 'react';
import 'tailwindcss/tailwind.css';
import Logo from '../../Assets/Logos/Logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  
  return(
    <footer class="bg-black pb-1 pt-1 items-center h-10">
    <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="flex justify-center text-teal-300 sm:justify-start">
      <Link to='/'>
        <img className=" pl-8 flex justify-between w-40 cursor-pointer" src={Logo} alt="logo"/>
        </Link>
      </div>

      <p class="mt-4 text-sm text-center text-white lg:text-right lg:mt-0">
        T&C &nbsp; Developers &nbsp; Privacy & Policy &nbsp;
      </p>
    </div>
    </div>
     </footer>
  )
} 

export default Footer;
