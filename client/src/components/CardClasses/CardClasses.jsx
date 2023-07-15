/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { getClassess, getEvents, getUsers, putEvents } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import styles from './CardClasses.module.css';

Modal.setAppElement('#root');

const CardClasses = ({ eventId, title, difficulty, date, startTime, endTime, eventQuota, quota, coachName, imageA, imageC }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const user = useSelector((state) => state.users);

    const handleReserva = (eventId, index) => {
        // if (isAuthenticated) {
        // setShowModal(false);
        const event = eventQuota[index]
        const d = date[index]
        const userId = 'db0736df-b1cb-42d8-ad9c-bee762cf8f21';
        // const isAlreadySubscribed = eventQuota[index].some(s => s.userId === userId);
        console.log(`fecha ${d}`);
        console.log(`evento id ${eventId[index]}`);
        console.log(`user id ${userId}`);
        console.log(`array de usuarios inscritos ${event}`);
        // console.log(isAlreadySubscribed)

        // if (event.length < quota) {
        //     if(isAlreadySubscribed){ //revisar
        //         toast.error('Ya estás suscrito a este evento');
        //     } else{
        //         toast.success(`Registro a evento ${d} exitoso✅`);
        //     dispatch(putEvents(eventId[index], userId))
        //     .then(() => {
        //         dispatch(getClassess(eventId[index])) // Obtener las classes actualizados
        //     })
        //     .catch(error => {
        //         toast.error('Ocurrió un error al suscribirte al evento. Por favor, intenta nuevamente.');
        //         console.error(error);
        //     });;
        //     }
        // } else {
        //     toast.error('Cupo lleno');
        // }
        if (event.length < quota) {
            dispatch(putEvents(eventId[index], userId))
                .then(() => {
                    dispatch(getClassess(eventId[index])); // Obtener las clases actualizadas
                    toast.success(`Registro a evento ${d} exitoso✅`);
                })
                .catch(error => {
                    toast.error('Ya estás suscrito a este evento');
                    console.error(error);
                });
        } else {
            toast.error('Cupo lleno');
        }

        // } else {
        //     setShowModal(true);
        // }
    };

    const closeModal = () => { setShowModal(false); };
    const handleModalLogin = () => {
        loginWithRedirect(); // Redirige al usuario a la página de auth0
    };

    let difficultyText = '';

    if (difficulty === 'easy') {
        difficultyText = 'Fácil';
    } else if (difficulty === 'medium') {
        difficultyText = 'Intermedio';
    } else if (difficulty === 'hard') {
        difficultyText = 'Avanzado';
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.divs}>
                <h4>{title}</h4>
                <img src={imageA} alt='' className={styles.image} />
            </div>
            <div className={styles.divs}>
                <h4>{coachName}</h4>
                <img src={imageC} alt='' className={styles.image} />
            </div>
            <div className={styles.divs}>
                <h4>{difficultyText}</h4>
            </div>
            <div className={styles.divs}>
                <h4>{startTime} - {endTime}</h4>
            </div>
            {/* <h4>Cupo: {quota} espacios por evento</h4> */}
            {/* <h4>Duracion: {duration} hora(s)</h4> */}
            <div>
                {/* <h1>Eventos</h1> */}
                <div>
                    {date.map((event, index) => (
                        <div key={index} className={styles.divbuttons}>
                            {/* <h4>{event}</h4> */}
                            <button onClick={() => handleReserva(eventId, index)} className={styles.eventButton}>{event}</button>
                            {/* {isAuthenticated && ( */}
                            <h4>Cupo {quota - eventQuota[index].length} disponibles</h4>
                            {/* )} */}
                            <br />
                        </div>
                    ))}
                </div>
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
