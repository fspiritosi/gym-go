/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../components/Login/LoginButton';

Modal.setAppElement('#root');

const CardClasses = ({id, difficulty, recurringPattern, startDate, startTime, endTime, quota, duration }) => {
    // const duration = classes.data[0].Events[0].duration
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();


    const closeModal = () => {
        setShowModal(false);
    };

    const handleModalLogin = () => {
        loginWithRedirect(); // Redirige al usuario a la página de auth0
    };

    return (
        <div >
            <br />
            {/* <h4>Dificultad: {difficulty}</h4> */}
            <h4>Recurrecncia: {recurringPattern}</h4>
            <h4>Fecha: {startDate}</h4>
            <h4>Horario: {startTime} - {endTime}</h4>
            <h4>Duracion: {duration} hora(s)</h4>
            <h4>Cupo: {quota} espacios</h4>

            <br />
            <button>Reservar Clase</button>
            <Modal 
            isOpen={showModal} 
            onRequestClose={closeModal}
            // className={`${style.modalContent} ${style.modalOverlay}`}
            >
                <h2>Debes iniciar sesión o Registrarte para realizar la compra</h2>
                {/* <button onClick={handleModalLogin} className={style.modalButton}>Iniciar sesión</button>
                <button onClick={handleModalLogin} className={style.modalButton}>Registrarse</button>
                <button onClick={closeModal} className={style.modalButton}>Cerrar</button> */}
            </Modal>
            <br />
        </div>
    );
};

export default CardClasses;