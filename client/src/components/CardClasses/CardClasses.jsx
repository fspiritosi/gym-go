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

    const user = useSelector((state) => state.userLogged);

    const handleReserva = (eventId, index) => {
        if (isAuthenticated) {
            setShowModal(false);
            const event = eventQuota[index];
            const d = date[index];
            const isNotCredits = user.credits === 0;
            const suscribed = eventQuota[index].includes(user.id);

            if (event.length < quota && !suscribed) {
                if (isNotCredits) {
                    toast.error('No tienes suficientes créditos');
                } else {
                    dispatch(putEvents(eventId[index], user.id, user.email))
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
        <div className="grid grid-cols-6 ">
            <div className="flex flex-row items-center space-x-3 w-30">
                <img src={imageA} alt='' className="w-12 h-12 rounded-full" />
                <h4 className="text-m font-bold py-5">{title}</h4>
            </div>
            <div className="flex flex-row items-center space-x-3 w-30">
                <img src={imageC} alt='' className="w-12 h-12 rounded-full" />
                <h4 className="text-m font-bold py-4 ">{coachName}</h4>
            </div>
            <div className="flex flex-row items-center space-x-3 w-30">
                <h4 className="text-m font-bold mx-auto">{difficultyText}</h4>
            </div>
            <div className="flex flex-row items-center space-x-3 w-30">
                <h4 className="text-m font-bold ">{startTime} a {endTime} hrs</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {date.map((event, index) => (
                    <div key={index} className="flex flex-row items-center space-x-5 w-55">
                        {isAuthenticated ? (
                            <div className="flex flex-row items-center space-x-3 w-50">
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className={`px-6 py-2 text-black text-xs font-semibold rounded-xl shadow-lg bg-green-neon${
                                        quota - eventQuota[index].length <= 0 ? 'bg-gray-claro' : ''
                                    } whitespace-nowrap truncate`}
                                >
                                {event}{eventQuota[index].includes(user.id) && <h5 className="text-xs">Suscrito</h5>}
                                </button>
                                {/* <h4>{quota - eventQuota[index].length} lugares disponibles</h4> */}
                            </div>
                        ) : (
                            <div className="flex flex-row items-center space-x-3 w-50"> 
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className="px-6 py-2 text-black text-xs font-semibold rounded-xl shadow-lg bg-green-neon whitespace-nowrap truncate"
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
