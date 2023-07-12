/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
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

    // const handleReserva = (index) => {
    //     if (isAuthenticated) {
    //         setShowModal(false);
    //         setIsClassReserved(index); // Se marca la clase como reservada
    //         toast.success('Registro a Evento Exitoso✅');
    //     } else {
    //         setShowModal(true);
    //     }
    // };

    const handleReserva = (index) => {
        // if (isAuthenticated) {
        setShowModal(false);
        setIsClassReserved(true); 
        const event = date[index]; 
        const eventQuota = event.eventQuota; 
        const lugaresDisponibles = event.quota - (eventQuota ? eventQuota.length : 0); 
        if (lugaresDisponibles > 0) {
            eventQuota.push("nuevo-id-quota");
            toast.success('Registro a Evento Exitoso✅');
            dispatch(putEvents(id)); 
            console.log('lugaresDisponibles:', lugaresDisponibles);
        } else {
            toast.error('Cupo lleno');
        }
    // } else {
    //     setShowModal(true);
    //     }
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
                    <div key={index}>
                        <h4>{event}</h4>
                        <button onClick={() => handleReserva(index)} className={styles.eventButton}>Reservar</button>
                        <br />
                    </div>
                ))}
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className={`${styles.modalContent} ${styles.modalOverlay}`}>
                <h2>Debes iniciar sesión o registrarte para suscribirte a este evento</h2>
                <button onClick={handleModalLogin} className={styles.modalButton}>Iniciar sesión</button>
                <button onClick={handleModalLogin} className={styles.modalButton}>Registrarse</button>
                <button onClick={closeModal} className={styles.modalButton}>Cerrar</button>
            </Modal>
        </div>
    );
};

export default CardClasses;

