import React from "react";
import backgroundImage from '../../assets/backgraund/Fondo2.jpg';
import landing from '../../assets/backgraund/fitnes.png'
import coaches  from '../../assets/Cards/profesores.jpg'
import activities from '../../assets/Cards/actividades.jpg'
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";


const Landing = () => {
  
  return (

   <section>
   
   <div className="container min-w-full min-h-screen bg-center bg-cover px-8 grid place-items-left relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Nav/>
       <div className=" text-white mt-40 max-w-lg">
        <h1 className=" font-semibold  text-5xl leading-normal">Tu tiempo, tu poder: entrena a tu ritmo en el horario que elijas</h1>
        <p className=" mt-4" >¡Bienvenido al gimnasio que te lleva a lo más alto en salud y bienestar!
              Descubre un oasis de alta calidad, donde nuestros servicios excepcionales
              se combinan con precios accesibles!</p>
              <img className=' w-full xl:w-1/2 xl:absolute bottom-0 right-20' src={landing} alt="img"></img>       
       </div>                  
    </div>
    
    <div class="container mx-auto px-6 py-10">
        <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">Conócenos</h1>

        <p class="mt-4 text-center text-gray-500 dark:text-gray-300">Sumérgete en un ambiente motivador y contagioso que te impulsará a superar tus límites.</p>

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-12">
         <div>
          <Link to='/activities'>
            <img class="h-96 w-full rounded-lg object-cover" src={activities} alt="" />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-white">ACTIVIDADES</h2>
            </Link>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">No importa tu nivel de condición física, nuestras clases están diseñadas para desafiar y motivar a todos.</p>
        </div>
        <div>
          <Link to='/coaches'>
            <img class="h-96 w-full rounded-lg object-cover" src={coaches} alt="" />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-white">PROFESORES</h2>
            </Link>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">Los maestros de la transformación física: nuestro equipo de profesionales apasionados te guiará en cada paso de tu viaje fitness hacia el éxito</p>
        </div>
        </div>
    </div>
    <Footer/>    
    </section>    
  )
};

export default Landing;
