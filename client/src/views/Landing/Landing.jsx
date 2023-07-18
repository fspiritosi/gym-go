import React from "react";
import landing from '../../Assets/backgraund/fitnes.png'
import backgroundImage from '../../Assets/backgraund/Fondo2.jpg';
import home from '../../Assets/backgraund/home.png'
import coaches  from '../../Assets/Cards/profesores.jpg'
import activities from '../../Assets/Cards/actividades.jpg'
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";


const Landing = () => {
  
  return (
    <>
    <header >
      <Nav />
      <div className="mx-auto sm:grid-cols-2 gap-4 grid-cols-1 text-gray-claro h-auto grid items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="sm:ml-20 text-gray-50 mt-24 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">
           Tu tiempo, tu poder:<br/> entrena a tu ritmo  <br />
          en el horario que elijas.
          </h1>
          <p className="text-sm text-white inline-block sm:block">¡Bienvenido al gimnasio que te lleva a lo más alto en salud y bienestar!.</p>
          <button className=" text-gray-dark bg-green-neon border-2 border-white hover:border-2 hover:border-white hover:bg-green.claro font-poppins rounded-xl text-m px-5 py-2.5 mr-2 mb-10 mt-10">Únete ahora</button>
        </div>
        <img className='mt-14 right-20' src={home} alt="img"></img>
      </div>

      </header>
    <main class="py-16 bg-gray-light mx-auto px-6 md:px-0">
    <section>
      <h1 class="text-3xl font-bold text-gray-dark mb-10">Vive la experiencia GymGo</h1>
      <div class="grid sm:grid-cols-2 gap-4 grid-cols-1">
        <div>
          <Link to='/activities'>
          <div class=" rounded-lg bg-green.claro h-80 w-80 inline-block">
          <img class="h-full w-full border-solid border-l-8 border-t-8 border-green-neon hover:border-2 hover:border-black rounded-lg object-cover" src={activities} alt="" />
          </div>
          <h3 class="text-lg font-semibold text-gray-dark mt-2">Nuestras <span class=" text-gray">Actividades</span></h3>
          </Link>
        </div>
        <div>
          <Link to='/coaches'>
          <div class=" rounded-lg  bg-green.claro h-80 w-80 inline-block">
          <img class="h-full w-full border-solid border-l-8 border-t-8 border-green-neon hover:border-2 hover:border-black rounded-lg object-cover" src={coaches} alt="" />
          </div>
          <h3 class="text-lg font-semibold text-gray-dark mt-2">Nuestros <span class=" text-gray">Profesores</span></h3>
          </Link>
        </div>      
      </div>
      <hr class="w-40 my-14 border-4 rounded-md sm:mx-0 mx-auto" />
    </section>
    <section>
      <h1 class="inline-block text-black font-bold text-3xl">
      ¡Descubre las razones para unirte a nuestro gimnasio! <br />
      <span class=" text-sm font-poppins text-gray-dark"> Haz realidad tus metas de salud y bienestar </span>
      </h1>

      <div class="grid grid-cols-3 gap-4 mt-10">
        <div>
          <h3 class="text-lg font-semibold text-black  mt-2">1. Horario flexible</h3>
          <p class="text text-gray-400">Entendemos lo ocupada que puede ser tu vida, por eso ofrecemos un horario amplio y flexible para que puedas entrenar en el momento que mejor se adapte a ti.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-black  mt-2">2. Variedad de clases y entrenamientos</h3>
          <p class="text text-gray-400">Desde sesiones de alta intensidad hasta clases más relajantes como el yoga, tenemos una amplia variedad de opciones para que encuentres el entrenamiento perfecto que se ajuste a tus preferencias y objetivos. ¡Nunca te aburrirás de ejercitarte con nosotros!</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-black  mt-2">3. Instructores altamente calificados:</h3>
          <p class="text text-gray-400">Nuestro equipo de entrenadores está compuesto por profesionales apasionados y certificados que te brindarán el apoyo y la orientación necesaria en cada paso de tu camino hacia el éxito físico.</p>
        </div>
      </div>
    </section>
    <div class="mt-14">
      <p>No esperes más para formar parte de nuestra vibrante comunidad. El cambio que deseas comienza hoy mismo. ¡Únete a nuestro gimnasio y descubre el poder de una vida activa y saludable!</p>
    </div>
  </main>
  <Footer/>
  </>
  );
};

export default Landing;

// {/* <section>
   
//    <div className="container min-w-full min-h-screen bg-center bg-cover grid place-items-left relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <Nav/>
//        <div className=" text-white ml-3 mt-40 max-w-lg">
//         <h1 className=" font-semibold  text-5xl leading-normal">Tu tiempo, tu poder: entrena a tu ritmo en el horario que elijas</h1>
//         <p className=" font-poppins mt-4" >¡Bienvenido al gimnasio que te lleva a lo más alto en salud y bienestar!
//               Descubre un oasis de alta calidad, donde nuestros servicios excepcionales
//               se combinan con precios accesibles!</p>
//               <img className=' w-full xl:w-1/2 xl:absolute bottom-0 right-20' src={landing} alt="img"></img>       
//        </div>                  
//     </div>
    
//     <div class="container mx-auto px-6 py-10">
//         <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">Conócenos</h1>

//         <p class="mt-4 text-lg text-center text-gray-500 dark:text-gray-300">Sumérgete en un ambiente motivador y contagioso que te impulsará a superar tus límites.</p>

//         <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-12">
//          <div>
//           <Link to='/activities'>
//             <img class="h-96 w-full rounded-lg object-cover" src={activities} alt="" />
//             <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800">ACTIVIDADES</h2>
//             </Link>
//             <p class="mt-2 font-poppins text-lg uppercase tracking-wider ">No importa tu nivel de condición física, nuestras clases están diseñadas para desafiar y motivar a todos.</p>
//         </div>
//         <div>
//           <Link to='/coaches'>
//             <img class="h-96 w-full rounded-lg object-cover" src={coaches} alt="" />
//             <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-80">PROFESORES</h2>
//             </Link>
//             <p class="mt-2 font-poppins text-lg uppercase tracking-wider">Los maestros de la transformación física: nuestro equipo de profesionales apasionados te guiará en cada paso de tu viaje fitness hacia el éxito</p>
//         </div>
//         </div>
//     </div>
//     <Footer/>    
//     </section> */}
