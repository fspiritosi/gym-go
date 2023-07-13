/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { getEvents, putEvents } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './CardClasses.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

Modal.setAppElement('#root');

const CardClasses = ({ id, title, difficulty, date, startTime, endTime, image, eventQuota, quota, coachName }) => {
    const allEvents = useSelector((state) => state.allEvents);

    const [showModal, setShowModal] = useState(false);
    const [isClassReserved, setIsClassReserved] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const dispatch = useDispatch();

    const handleReserva = (index) => {
        // if (isAuthenticated) {
        // setShowModal(false);
        const event = eventQuota[index]
        console.log(event);
        if (event.length < quota) {
            toast.success('Registro a Evento Exitoso✅');
            // dispatch(putEvents('33c96dbf-5c9f-4585-bc53-335ff066d74',['66ad9b29-4d57-43eb-9208-602c928bcab1']))
            axios.put(`http://localhost:3001/events/${id}`, {
                userId: '66ad9b29-4d57-43eb-9208-602c928bcab1'
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            toast.error('Cupo lleno');
        }
        // } else {
        //     setShowModal(true);
        //}
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
                        <h4>{event}</h4>
                        <h4>Espacios ocupados: {eventQuota[index].length}</h4>
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
