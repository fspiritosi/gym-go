/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassess, getEvents,getUsers } from '../../redux/actions';
import CardClasses from "../../components/CardClasses/CardClasses";
import { ToastContainer } from 'react-toastify';

const Classes = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes);

    useEffect(() => {
        dispatch(getClassess());
        dispatch(getUsers());
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Nuestras Clases</h1>
            <br />
            {classes?.map((clase,index) => {
                if (clase.isActive === false) {
                    return null; // No mostrar la clase si isActive es false
                }
                
                return (
                    <CardClasses
                    key={index}
                    title={clase.Activity.title}
                    difficulty={clase.difficulty} //classes
                    startTime={clase.Events[0].startTime} //classes
                    endTime={clase.Events[0].endTime} //classes
                    quota={clase.quota}
                    coachName={clase.Coach.firstName}
                    imageA={clase.Activity.image[0]}
                    imageC={clase.Coach.profilePicture}
                    eventQuota={clase.Events.map((q) => q.eventQuota)}
                    date={clase.Events.map((d) => d.date)}
                    eventId={clase.Events.map((i) => i.id)}
                />
                );
            })}
            <ToastContainer autoClose={2000} theme="dark" />
        </div>
    )
};


export default Classes;