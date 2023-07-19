//NO MOVER NADA DE LA LOGICA DE ESTE COMPONENTE 
//NO MOVER NADA DE LA LOGICA DE ESTE COMPONENTE 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putEvents } from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import styles from './CardClasses.module.css';

Modal.setAppElement('#root');

const CardClasses = ({ eventId, title, difficulty, date, startTime, endTime, eventQuota, quota, coachName, imageA, imageC, handleUpdateClasses }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    // const userId = '455f1467-b3b5-494d-b975-3a6c45bcfc8a'; // Ejemplo de userID

    const user = useSelector((state) => state.userLogged);
    const userm = user.flatMap((u) => u.id);
    const userId = userm.id;
    console.log(user);

    const handleReserva = (eventId, index) => {
        if (isAuthenticated) {
            setShowModal(false);
            const event = eventQuota[index];
            const d = date[index];
            const isNotCredits = userm.find((s) => s.id === userId && s.credits === 0) !== undefined;
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
                            handleUpdateClasses(); // Llamada a la función de actualización del componente padre
                            toast.success(`Registro a evento ${d} exitoso✅`);
                        })
                        .catch((error) => {
                            toast.error('Ocurrió un error, vuelve a intentarlo');
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

    const closeModal = () => {
        setShowModal(false);
    };

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
                        {isAuthenticated ? (
                            <div>
                                {eventQuota[index].includes(userId) && <p>Suscrito</p>}
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className={`${styles.eventButton} ${quota - eventQuota[index].length <= 0 ? styles.disabledButton : ''}`}
                                >
                                    {event}
                                </button>
                                <h4>{quota - eventQuota[index].length} lugares disponibles</h4>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className={styles.eventButton}
                                >
                                    {event}
                                </button>
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
