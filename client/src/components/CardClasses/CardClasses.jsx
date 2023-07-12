/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { putEvents } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './CardClasses.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const CardClasses = ({ id, title, classes, image, difficulty, CoachId, date, startTime, endTime, eventQuota, quota, duration, coachName }) => {
    const [showModal, setShowModal] = useState(false);
    const [isClassReserved, setIsClassReserved] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const dispatch = useDispatch();

    const handleReserva = (index) => {
        // if (isAuthenticated) {
            setShowModal(false)
            setIsClassReserved(index); // Se marca la clase como reservada
            toast.success('Registro a Evento Exitoso✅');
        // } else {
        //     setShowModal(true);
        // }
    };

    const closeModal = () => { setShowModal(false); };
    const handleModalLogin = () => {
        loginWithRedirect(); // Redirige al usuario a la página de auth0
    };

    return (
        <div className={styles.cardContainer}>
            <h4>Actividad: {title}</h4>
            <h4>Profesor: {coachName}</h4>
            <h4>Dificultad: {difficulty}</h4>
            <h4>Horario: {startTime} - {endTime}</h4>
            {/* <h4>Duracion: {duration} hora(s)</h4> */}
            <h4>Cupo: {quota} espacios por evento</h4>
            <h1>Eventos</h1>
            <div className={styles.cardContainer}>
                {date.map((event, index) => (
                    <div key={event.id}>
                        <button onClick={() => handleReserva(index)} className={styles.eventButton}>{event}</button>
                        <br />
                        <Modal
                            isOpen={showModal}
                            onRequestClose={closeModal}
                            className={`${styles.modalContent} ${styles.modalOverlay}`}>
                            <h2>Debes iniciar sesión o Registrarte para suscribirte a este Evento</h2>
                            <button onClick={handleModalLogin} className={styles.modalButton}>Iniciar sesión</button>
                            <button onClick={handleModalLogin} className={styles.modalButton}>Registrarse</button>
                            <button onClick={closeModal} className={styles.modalButton}>Cerrar</button>
                        </Modal>
                        {/* {isClassReserved === index && <p>Clase reservada</p>} */}
                        <br />
                    </div>
                ))}
            </div>
                {/* <ToastContainer 
                autoClose={2000}
                theme="dark"
                /> */}
        </div>
    );
};

export default CardClasses;
