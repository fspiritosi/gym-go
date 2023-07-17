import React, { useState } from 'react';
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
    const userId = 'b59cbfc1-f5f3-4c87-97b7-b3cfa3609287'; //ejemplo para userid

    const user = useSelector((state) => state.users);
    const userm = user.flatMap((u) => u);

    const handleReserva = (eventId, index) => {
        if (isAuthenticated) {
            dispatch(getClassess(eventId[index]))
            dispatch(getEvents())
            dispatch(getUsers())
            setShowModal(false);
            const event = eventQuota[index];
            const d = date[index];
            // const isNotCredits = userm.some(s => s.credits === 0);
            const isNotCredits = userm.find(s => s.id === userId && s.credits === 0) !== undefined;
            const suscribed = eventQuota[index].includes(userId);

            console.log(`fecha ${d}`);
            console.log(`evento id ${eventId[index]}`);
            console.log(`user id ${userId}`);
            console.log(`array de usuarios inscritos ${event}`);
            console.log(isNotCredits);
            console.log(suscribed);

            if (event.length < quota && !suscribed) {
                if (isNotCredits) {
                    toast.error('No tienes suficientes créditos');
                } else {
                    dispatch(putEvents(eventId[index], userId))
                        .then(() => {
                            dispatch(getClassess(eventId[index])); // Obtener las clases actualizadas
                            dispatch(getUsers())
                            dispatch(getEvents())
                            toast.success(`Registro a evento ${d} exitoso✅`);
                        })
                        .catch(error => {
                            toast.error('Ocurrio un error vuelve a intentar');
                            // dispatch(getEvents())
                            // dispatch(getUsers())
                        });
                }
            } else if (suscribed) {
                toast.error('Ya estás suscrito a este evento');
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
                {date.map((event, index) => (
                    <div key={index} className={styles.divbuttons}>
                        {isAuthenticated && eventQuota[index].includes(userId) ? (
                            <div>
                                <h4>Suscrito</h4>
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className={`${styles.eventButton} ${quota - eventQuota[index].length <= 0 ? styles.disabledButton : ''}`}
                                    disabled={quota - eventQuota[index].length <= 0}
                                >{event}</button>
                                {/* <h4>{quota - eventQuota[index].length} lugares disponibles</h4> */}
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className={`${styles.eventButton} ${quota - eventQuota[index].length <= 0 ? styles.disabledButton : ''}`}
                                    disabled={quota - eventQuota[index].length <= 0}
                                >{event}</button>
                                {/* <h4>{quota - eventQuota[index].length} lugares disponibles</h4> */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className={`${styles.modalContent} ${styles.modalOverlay}`}
            >
                <h2>Debes iniciar sesión o registrarte para suscribirte a este evento</h2>
                <button onClick={handleModalLogin} className={styles.modalButton}>Iniciar sesión</button>
                <button onClick={handleModalLogin} className={styles.modalButton}>Registrarse</button>
                <button onClick={closeModal} className={styles.modalButton}>Cerrar</button>
            </Modal>
        </div>
    );
};

export default CardClasses;
