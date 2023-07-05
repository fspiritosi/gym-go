import React from "react";
import logo from '../../Assets/Logos/Logo.ico'
import backgroundImage from '../../Assets/backgraund/Fondo2.jpg';
import landing from '../../Assets/backgraund/landing.jpg'
import { Link } from "react-router-dom";
import 'tailwindcss/tailwind.css';


const Landing = () => {
  
  return (
    <div className="container min-w-full min-h-screen bg-center bg-cover px-8 grid place-items-left relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav className=" md:flex md:items-center justify-between w-full fixed top-0 left-0">
        <img className=" flex justify-between w-40 cursor-pointer" src={logo} alt="logo"/>
        
        <ul className=" md:flex md:items-center ">
          <li className="list-none inline-block px-4">
            <Link className="  text-white text-xl px-2" to='/home'>Inicio</Link>
          </li>
          <li className="list-none inline-block px-5">
            <Link className=" text-white text-xl px-2" to='/Abaut'>Nosotros</Link>
          </li>
          <li className="list-none inline-block px-5">
            <Link className=" text-white text-xl px-2" to='/Abaut'>Inicia sesión</Link>
          </li>
        </ul>        
      </nav>
      
      <div className=" text-white mt-48 max-w-lg">
        <h1 className=" font-semibold text-5xl leading-normal">Tu tiempo, tu poder: entrena a tu ritmo en el horario que elijas</h1>
        <p className=" mt-1" >¡Bienvenido al gimnasio que te lleva a lo más alto en salud y bienestar!
              Descubre un oasis de alta calidad, donde nuestros servicios excepcionales
              se combinan con precios accesibles!</p>
              <Link to='/activities'>       
            <button className="bg-green-neon hover:bg-gray-claro text-white px-4 py-2 mb-3 rounded-xl border-4 mt-9 border-white">
              START
            </button>
              </Link>      
      </div>
      <img className=' w-full xl:w-1/2 xl:absolute bottom-16 right-20' src={landing} alt="image"></img>
    </div>
  )
};

export default Landing;
