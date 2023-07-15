/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { getClassess, getUsers, putEvents } from '../../redux/actions';
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
    const userId = 'b59cbfc1-f5f3-4c87-97b7-b3cfa3609287'; //ejemplo para userid
    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    
    const user = useSelector((state) => state.users);
    console.log(user);
    
    
    const handleReserva = (eventId, index) => {
        if (isAuthenticated) {
        setShowModal(false);
        const event = eventQuota[index]
        const d = date[index]
        // const isAlreadySubscribed = eventQuota[index].some(s => s.userId === userId);
        console.log(`fecha ${d}`);
        console.log(`evento id ${eventId[index]}`);
        console.log(`user id ${userId}`);
        console.log(`array de usuarios inscritos ${event}`);
        // console.log(isAlreadySubscribed)

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
        } else {
                setShowModal(true);
            }
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
            <div>
                <div>
                    {date.map((event, index) => (
                            <div key={index} className={styles.divbuttons}>
                                {isAuthenticated && eventQuota[index].includes(userId) ? (
                                    <div>
                                        <h4>Suscrito</h4>
                                        <button onClick={() => handleReserva(eventId, index)} className={styles.eventButton}>{event}</button>
                                        <h4>{quota - eventQuota[index].length} lugares disponibles</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => handleReserva(eventId, index)} className={styles.eventButton}>{event}</button>
                                    </div>
                                )}
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

{/* {date.map((event, index) => (
                            <div key={index} className={styles.divbuttons}>
                                <button onClick={() => handleReserva(eventId, index)} className={styles.eventButton}>{event}</button>
                                <h4>{quota - eventQuota[index].length} espacios disponibles</h4>
                                <br />
                            </div>
                        ))} */}