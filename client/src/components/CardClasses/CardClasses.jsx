/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { getEvents, putEvents } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import styles from './CardClasses.module.css';

Modal.setAppElement('#root');

const CardClasses = ({ eventId, title, difficulty, date, startTime, endTime, image, eventQuota, quota, coachName}) => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const handleReserva = (eventId, index) => {
        if (isAuthenticated) {
        // setShowModal(false);
        // const d = date[index]
        // console.log(d);
        const event = eventQuota[index]
        // console.log(event);

        console.log(eventId[index]);
        if (event.length < quota) {
            toast.success('Registro a Evento Exitoso✅');
            dispatch(putEvents(eventId[index], {userId: '37085418-97cd-4287-b672-33d7b7c5e77c' }));
        } else {
            toast.error('Cupo lleno');
        }
        } else {
            setShowModal(true);
        }
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
            <h4>Cupo: {quota} espacios por evento</h4>
            {/* <h4>Duracion: {duration} hora(s)</h4> */}
            <h1>Eventos</h1>
            <div className={styles.cardContainer}>
                {date.map((event, index) => (
                    <div key={index}>
                        {/* <h4>{event}</h4> */}
                        <button onClick={() => handleReserva(eventId,index)} className={styles.eventButton}>{event}</button>
                        <h4>Espacios disponibles: {quota - eventQuota[index].length}</h4>
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
