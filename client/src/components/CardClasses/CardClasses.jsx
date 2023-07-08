/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./CardClasses.module.css";
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './CardClasses.module.css';
import LoginButton from '../../components/Login/LoginButton';

Modal.setAppElement('#root');

const CardClasses = ({ id, title, difficulty, CoachId, date, startTime, endTime, eventQuota, quota, duration, coachName }) => {
    const [showModal, setShowModal] = useState(false);
    const [isClassReserved, setIsClassReserved] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const handleReserva = () => {
        if (isAuthenticated) {
            setShowModal(false)
            setIsClassReserved(true); // Se marca la clase como reservada
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
        <div className={styles.cardContainer}>
            <br />
            <h4>Actividad: {title}</h4>
            <h4>Profesor: {coachName}</h4>
            {date && startTime && endTime && (
                <div>
                    <h4>Fecha: {date}</h4>
                    <h4>Horario: {startTime} - {endTime}</h4>
                    <h4>Dificultad: {difficulty}</h4>
                    <h4>Duracion: {duration} hora(s)</h4>
                    <h4>Cupo: {quota} espacios</h4>
                    {/* <h4>Disponibilidad: {eventQuota[index]}</h4> */}
                    <br />
                    <button onClick={handleReserva}>Suscribirse a Evento</button>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        className={`${style.modalContent} ${style.modalOverlay}`}
                    >
                        <h2>Debes iniciar sesión o Registrarte para suscribirte</h2>
                        <button onClick={handleModalLogin} className={style.modalButton}>Iniciar sesión</button>
                        <button onClick={handleModalLogin} className={style.modalButton}>Registrarse</button>
                        <button onClick={closeModal} className={style.modalButton}>Cerrar</button>
                    </Modal>
                    {isClassReserved && <p>Clase reservada</p>}
                    <br />
                </div>
            )}
        </div>
    );
};

export default CardClasses;