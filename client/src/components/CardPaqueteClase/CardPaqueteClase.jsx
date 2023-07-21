/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MercadoPago from '../MercadoPago/MercadoPago';
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-toastify/dist/ReactToastify.css'; //toastify
import backgroundImage from '../../Assets/backgraund/cardgymgo.jpg'
import card from '../../Assets/backgraund/Fondo1.jpg'
import Logo from "../../Assets/Logos/Logo.svg";
import {FaWindowClose} from 'react-icons/fa'


Modal.setAppElement("#root");

const CardPaquete = ({ title, clases, price, comprar, description }) => {
    const [orderData, setOrderData] = useState({ description: title, price: Number(price), quantity: 1 });
    const [showMercadoPago, setShowMercadoPago] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, loginWithRedirect, signupWithRedirect } = useAuth0();

  //Con toastify
  // const handleBuy = () => {
  //     if (isAuthenticated) {
  //     setShowMercadoPago(true);
  // } else {
  //     toast.error('Debes iniciar sesión para realizar la compra');
  // }
  // };

  const handleBuy = () => {
    if (isAuthenticated) {
      setShowMercadoPago(true);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModalLogin = () => {
    loginWithRedirect(); // Redirige al usuario a la página de auth0
  };
  

    return (
       
        <div class="flex justify-end items-center bg-cover aspect-video  bg-gray hover:shadow-gray-claro rounded-lg shadow-md" style={{ backgroundImage: `url(${backgroundImage})` }}>
                  <div class="mr-16">
                    <p class="  text-3xl font-semibold text-black">{title}</p>
                    <h4 class="mt-2 text-black text-4xl font-semibol"> <span className=' font-bold text-5xl text-green'>$</span>{price} <span class="text-base font-normal text-black dark:text-gray-40">/ Año </span></h4>
                   <button onClick={handleBuy} class=" text-sm w-40 mt-6 text-black bg-green-neon hover:bg-green focus:ring-4 focus:ring-green-neon font-medium rounded-lg text-s px-5 py-2.5 text-center" type="button" data-modal-toggle="authentication-modal">
                        Elegir
                    </button>
                    {showMercadoPago && <MercadoPago orderData={orderData} />}
                    </div>

                    
                    
                    <div class="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
                        
                    <Modal
                                        
                     isOpen={showModal} 
                     onRequestClose={closeModal}                                           
                        >                          
                   <div class=" w bg-cover items-center justify-center rounded-t-md border-b-2 border-gray border-opacity-100 p-4 mt-16 h-96 grid " style={{ backgroundImage: `url(${card})` }}>                  
                                     
                   <img
                         className=" ml-1 flex justify-between w-40"
                         src={Logo}
                         alt="logo"
                             />
                   
                   <h1 className='text-4xl font-semibold leading-normal text-white'>Debes iniciar sesión o Registrarte para realizar la compra</h1>
                   <button  class="rounded-xl w-64 mx-auto inline-block bg-green-neon px-6 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-green hover:border-2 hover:border-white active:bg-gray"
                   onClick={handleModalLogin} >Iniciar sesión</button>
                   <button class="rounded-xl w-64 mx-auto inline-block bg-green-neon px-6 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-green hover:border-2 hover:border-white active:bg-gray" onClick={handleModalLogin}>Registrarse</button>
                   <button onClick={closeModal} className= 'mx-auto box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'>
                    <FaWindowClose color='white' className='w-8 h-8'/>
                   </button>
                  </div>
             </Modal>         
              </div>                                          
        </div>  
        
  );
};

export default CardPaquete;




