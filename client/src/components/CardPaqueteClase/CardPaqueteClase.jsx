/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import style from "./CardPaquete.module.css";
import MercadoPago from '../MercadoPago/MercadoPago';
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify'; //toastify
import 'react-toastify/dist/ReactToastify.css'; //toastify
import LoginButton from '../../components/Login/LoginButton';

Modal.setAppElement('#root');

const CardPaquete = ({ title, clases, price, comprar }) => {
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
        <div className={style.cardContainer}>
            <br />
            <h2>{title}</h2>
            <h2>${price}</h2>
            <br />
            <button
                className={style.comprar}
                onClick={handleBuy}
            >Comprar</button>
            {showMercadoPago && <MercadoPago orderData={orderData} />}
            <Modal 
            isOpen={showModal} 
            onRequestClose={closeModal}
            className={`${style.modalContent} ${style.modalOverlay}`}
            >
                <h2>Debes iniciar sesión o Registrarte para realizar la compra</h2>
                <button onClick={handleModalLogin} className={style.modalButton}>Iniciar sesión</button>
                <button onClick={handleModalLogin} className={style.modalButton}>Registrarse</button>
                <button onClick={closeModal} className={style.modalButton}>Cerrar</button>
            </Modal>
            <br />
        </div>
    );
};

export default CardPaquete;