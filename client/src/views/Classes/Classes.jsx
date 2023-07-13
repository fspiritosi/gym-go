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

    const sortedClasses = [...classes].sort(
        (a, b) => new Date(a.Events[0].date) - new Date(b.Events[0].date)
    );

    return (
        <div>
            <br />
            <br />
            <br />
            <h1>Nuestras Clases</h1>
            <br />
            {sortedClasses?.map((clase,index) => {
                const activity = activities.find(act => act.id === clase.ActivityId);
                const activitieName = activity ? `${activity.title}` : '';
                const coach = coaches.find((coach) => coach.id === clase.CoachId);
                const coachName = coach ? `${coach.firstName} ${coach.lastName}` : '';
                const imageA = activity ? activity.image : '';
                const imageC = coach ? coach.profilePicture : '';
                const sortedEventIds = clase.Events.map((e) => e.id).sort((a, b) => new Date(a) - new Date(b));
                // const sortedDates = clase.Events.map((d) => d.date).sort((a, b) => new Date(a) - new Date(b));

                if (clase.isActive === false) {
                    return null; // No mostrar la clase si isActive es false
                }
 
                return (
                    <CardClasses
                    key={index}
                    title={activitieName}
                    difficulty={clase.difficulty}  //classes
                    startTime={clase.Events[0].startTime} //classes
                    endTime={clase.Events[0].endTime} //classes
                    quota= {clase.quota}
                    coachName={coachName}
                    eventQuota={clase.Events.map((q) => q.eventQuota)}
                    date={clase.Events.map((d) => d.date)}
                    eventId={sortedEventIds}
                    imageA={imageA}
                    imageC={imageC}
                    // eventId={clase.Events.map((i) => i.id)}
                    // date={sortedDates}
                    // duration={clase.Events[0].duration} //classes
                    />
                );
            })}
            <ToastContainer autoClose={2000} theme="dark" />
        </div>
    )
};


export default Classes;