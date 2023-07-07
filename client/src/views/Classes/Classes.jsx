/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getClassess, getCoaches } from '../../redux/actions';
import CardClasses from "../../components/CardClasses/CardClasses";


const Classes = () => {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);
    const coaches = useSelector((state) => state.coaches);
    // const classes = useSelector((state) => state.classes);

    useEffect(() => {
        dispatch(getActivities());
        dispatch(getClassess());
        dispatch(getCoaches());
    }, [dispatch]);

    return (
        <div>
            <br />
            <h1>Clases</h1>
            <div>
                {activities?.map((activity) => {
                    return activity.Classes.map((clase, index) => {
                        const coach = coaches.find(coach => coach.id === clase.Coach.id);
                        const coachName = coach ? `${coach.firstName} ${coach.lastName}` : '';
                        return clase.Events.map((event, index) => (
                            <CardClasses
                                key={index}
                                id={activity.id}
                                difficulty={clase.difficulty}
                                title={activity.title}
                                date={event.date}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                duration={event.duration}
                                quota={clase.quota}
                                coachName={coachName}
                            />
                        ));
                    });
                })}
            </div>
        </div>
    )

};


export default Classes;