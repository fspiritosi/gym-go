/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getClassess, getCoaches } from '../../redux/actions';
import CardClasses from "../../components/CardClasses/CardClasses";
import { ToastContainer } from 'react-toastify';

const Classes = () => {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);
    const coaches = useSelector((state) => state.coaches);
    const classes = useSelector((state) => state.classes);

    useEffect(() => {
        dispatch(getActivities());
        dispatch(getClassess());
        dispatch(getCoaches());
    }, [dispatch]);

    return (
        <div>
            <br />
            <br />
            <br />
            <h1>Clases</h1>
            <br />
            {classes?.map((clase,index) => {
                const activity = activities.find(act => act.id === clase.ActivityId);
                const activitieName = activity ? `${activity.title}` : '';
                const coach = coaches.find((coach) => coach.id === clase.CoachId);
                const coachName = coach ? `${coach.firstName} ${coach.lastName}` : '';

                if (!clase.isActive) {
                    return null; // No mostrar la clase si isActive es false
                }

                return (
                    <CardClasses
                    key={index}
                    title={activitieName}
                    difficulty={clase.difficulty}  //classes
                    startTime={clase.Events[0].startTime} //classes
                    endTime={clase.Events[0].endTime} //classes
                    duration={clase.Events[0].duration} //classes
                    quota= {clase.quota}
                    date={clase.Events.map((d) => d.date)}
                    coachName={coachName}
                    />
                );
            })}
            <ToastContainer autoClose={2000} theme="dark" />
        </div>
    )
};


export default Classes;