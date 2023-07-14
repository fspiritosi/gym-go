/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { getEvents, getUsers, putEvents } from '../../redux/actions';
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
    // const user = useSelector((state) => state.users);
    
    const handleReserva = (eventId, index) => {
        // if (isAuthenticated) {
        // setShowModal(false);
        const event = eventQuota[index]
        const userId = 'e905f679-7e28-48e3-ba0e-e1e95d28425c';
        const isAlreadySubscribed = event.some(subscription => subscription.userId === userId);
        // console.log(eventId[index]);
        // console.log(user);
        console.log(userId);

        if (event.length < quota) {
            if(isAlreadySubscribed){ //revisar
            toast.error('Ya estás suscrito a este evento');
            } else{
                toast.success('Registro a evento exitoso✅');
            dispatch(putEvents(eventId[index], userId )).then(() => {
                dispatch(getEvents(eventId[index])); // Obtener los eventos actualizados
            });
            }
            window.location.reload(); //mala practica 
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

    return (
        <div className={styles.cardContainer}>
            <div className={styles.divs}>
            <h4>{title}</h4>
            <img src={imageA} alt='' className={styles.image}/>
            </div>
            <div className={styles.divs}>
            <h4>{coachName}</h4>
            <img src={imageC} alt='' className={styles.image}/>
            </div>
            <div className={styles.divs}>
            <h4>{difficulty}</h4>
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
                        <button onClick={() => handleReserva(eventId,index)} className={styles.eventButton}>{event}</button>
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
