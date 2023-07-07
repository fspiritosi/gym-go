/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getClassess, getCoaches } from '../../redux/actions';
import CardClasses from "../../components/CardClasses/CardClasses";


const Classes = () => {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);
    // const classes = useSelector((state) => state.classes);
    // const coaches = useSelector((state) => state.coaches);

    useEffect(() => {
        dispatch(getActivities());
        // dispatch(getClassess());
        // dispatch(getCoaches());
    }, [dispatch]);

    return (
        <div>
            <br />
            <h1>Clases</h1>
            <div>
                {activities?.map((c, index) => {
                    return (
                        <CardClasses
                            key={index}
                            id={c.id}
                            difficulty={c.Classes.difficulty} 
                            title={c.title} 
                            CoachId={c.Classes.CoachId} 
                            date={c.Classes.Events.date} 
                            startTime={c.Classes.Events[0].startTime} 
                            endTime={c.Classes.Events[0].endTime} 
                            duration={c.Classes.Events[0].duration}
                            quota={c.Classes.quota}
                            eventQuot={c.Classes.Events[0].eventQuota.length}
                        />
                    );
                })}
            </div>
            
        </div>
    )

};


export default Classes;