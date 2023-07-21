//NO MOVER NADA DE LA LOGICA DE ESTE COMPONENTE 
//NO MOVER NADA DE LA LOGICA DE ESTE COMPONENTE 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putEvents } from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import {FaWindowClose} from 'react-icons/fa'
import backgroundImage from '../../Assets/backgraund/Fondo2.jpg'
import Logo from "../../Assets/Logos/Logo.svg";

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
        <div className="px-6 py-0 md:grid grid-cols-6 bg-gray-claro rounded-xl">
            <div className="flex md:flex-row items-center space-x-2 ">
                <img src={imageA} alt='' className="w-12 h-12 rounded-full" />
                <h4 className="text-sm font-bold py-3 ">{title}</h4>
            </div>
            <div className="flex md:flex-row items-center space-x-2">
                <img src={imageC} alt='' className="w-12 h-12 rounded-full" />
                <h4 className="text-sm font-bold py-4 ">{coachName}</h4>
            </div>
            <div className="flex md:flex-row items-center space-x-2">
                <h4 className="text-sm font-bold mx-auto">{difficultyText}</h4>
            </div>
            <div className="flex md:flex-row items-center space-x-2">
                <h4 className="text-sm font-bold ">{startTime} a {endTime} hrs</h4>
            </div>
            <div className="px-0.6 py-5 grid gap-2 grid-cols-3 w-72">
                {date.map((event, index) => (
                    <div key={index} className="flex md:flex-row items-center">
                        {isAuthenticated ? (
                            <div className="flex md:flex-row items-center">
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className={`px-3 py-2 text-black text-xs font-semibold rounded-xl shadow-lg bg-green-neon hover:bg-green whitespace-nowrap truncate ${
                                    quota - eventQuota[index].length <= 0 ? 'bg-white hover:bg-white shadow-lg' : '' } `}
                                >
                                {event}{eventQuota[index].includes(user.id) && <h5 className="text-xs bg-gray-claro rounded-xl ">Suscrito</h5>}
                                </button>
                                {/* <h4>{quota - eventQuota[index].length} lugares disponibles</h4> */}
                            </div>
                        ) : (
                            <div className="flex md:flex-row items-center space-x-3">
                                <button
                                    onClick={() => handleReserva(eventId, index)}
                                    className="px-3 py-2 text-black text-xs font-semibold rounded-xl shadow-lg bg-green-neon hover:bg-green whitespace-nowrap truncate"
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
            >
            <div class=" w bg-cover items-center justify-center rounded-t-md border-b-2 border-gray border-opacity-100 p-4 mt-16 h-96 grid " style={{ backgroundImage: `url(${backgroundImage})` }}> 
            <img
                className=" ml-1 flex justify-between w-40"
                src={Logo}
                alt="logo"
            />
                <h1 className='text-4xl font-semibold leading-normal text-white'>Debes iniciar sesión o registrarte para suscribirte a este evento</h1>
                <button class="rounded-xl w-96 inline-block bg-green-neon px-6 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-green hover:border-2 hover:border-white active:bg-gray" 
                onClick={handleModalLogin}>Iniciar sesión</button>
                <button  class="rounded-xl w-96 inline-block bg-green-neon px-6 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-green hover:border-2 hover:border-white active:bg-gray" 
                onClick={handleModalLogin}>Registrarse</button>
                <button onClick={closeModal} className= ' ml-44 box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'>
                <FaWindowClose color='white' className='w-8 h-8'/>
                </button>
                </div>
            </Modal>
        </div>
    );
};

export default CardClasses;
