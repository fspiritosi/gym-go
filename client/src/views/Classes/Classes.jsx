/* eslint-disable no-unused-vars */
//NO MOVER NADA DE LA LOGICA DE ESTE COMPONENTE 
//NO MOVER NADA DE LA LOGICA DE ESTE COMPONENTE 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getClassess, getEvents } from '../../redux/actions';
import CardClasses from "../../components/CardClasses/CardClasses";
import { ToastContainer } from 'react-toastify';
import Sidebar from "../../components/sidebarcoaches/sidebar2";
import 'tailwindcss/tailwind.css';

const Classes = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes);
    const [updateClasses, setUpdateClasses] = useState(false);

    useEffect(() => {
        dispatch(getClassess());
        dispatch(getEvents());
    }, [dispatch, updateClasses]);

    const handleUpdateClasses = () => {
        setUpdateClasses(prevState => !prevState);
    };

    const sortedClasses = classes
    .filter((clase) => clase.isActive === true)
    .map((clase) => {
        const sortedEvents = clase.Events.sort((a, b) => a.date.localeCompare(b.date));
        return {
            ...clase,
            Events: sortedEvents,
        };
    });


    return (
        <div class="flex flex-col md:flex-row">
            <div class="md:w-1/4 px-0 py-12">
            <Sidebar/>
            </div>
            <div class="md:w-3/4 px-4 py-4">
            <h1 class="md:w-3/8 px-5 py-10 text-2xl font-bold mb-5">Nuestras Clases</h1>
            {sortedClasses?.map((clase, index) => {
            if (clase.isActive === false) {
                    return null; // No mostrar la clase si isActive es false REVISAR 
                }
                return (
                    <CardClasses
                        key={index}
                        title={clase.Activity.title}
                        difficulty={clase.difficulty}
                        startTime={clase.Events[0].startTime}
                        endTime={clase.Events[0].endTime}
                        quota={clase.quota}
                        coachName={`${clase.Coach.firstName} ${clase.Coach.lastName}`}
                        imageA={clase.Activity.image[0]}
                        imageC={clase.Coach.profilePicture}
                        eventQuota={clase.Events.map((q) => q.eventQuota)}
                        date={clase.Events.map((d) => d.date)}
                        eventId={clase.Events.map((i) => i.id)}
                        handleUpdateClasses={handleUpdateClasses}
                    />
                );
                })}
                <ToastContainer autoClose={2000} theme="dark" />
                </div>
        </div>
    )
};

export default Classes;