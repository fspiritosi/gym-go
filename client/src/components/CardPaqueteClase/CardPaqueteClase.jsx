/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MercadoPago from '../MercadoPago/MercadoPago';
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify'; //toastify
import 'react-toastify/dist/ReactToastify.css'; //toastify
import LoginButton from '../../components/Login/LoginButton';

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
       
        <div class=" bg-gray-claro border-2 border-gray px-6 py-4  rounded-lg hover:bg-gray hover:border-black hover:border-2 shadow-xl dark:hover:bg-gray-700">
                    <p class="text-lg font-medium text-gray-800 dark:text-gray-100">{title}</p>
                    <h4 class="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">${price} <span class="text-base font-normal text-gray-600 dark:text-gray-400">/ Año </span></h4>
                    <p class="mt-4 text-gray-500 dark:text-gray-300">{description}</p>

                   <button onClick={handleBuy} class=" w-full px-4 py-2 mt-10 font-semibold text-white capitalize bg-green-neon rounded-md hover:bg-green.claro focus:outline-none focus:bg-blue-600">
                        Elegir
                    </button>
                    {showMercadoPago && <MercadoPago orderData={orderData} />}
                    <Modal 
                       isOpen={showModal} 
                       onRequestClose={closeModal}
                       
                       >
                <h2>Debes iniciar sesión o Registrarte para realizar la compra</h2>
                <button onClick={handleModalLogin} >Iniciar sesión</button>
                <button onClick={handleModalLogin}>Registrarse</button>
                <button onClick={closeModal} >Cerrar</button>
            </Modal>                    
        </div>  
        
  );
};

export default CardPaquete;
