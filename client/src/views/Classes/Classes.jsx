/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getClassess, getCoaches } from '../../redux/actions';
import CardClasses from "../../components/CardClasses/CardClasses";


// const Classes = () => {
//     const dispatch = useDispatch();
//     const activities = useSelector((state) => state.activities);
//     const coaches = useSelector((state) => state.coaches);
//     // const classes = useSelector((state) => state.classes);

//     useEffect(() => {
//         dispatch(getActivities());
//         dispatch(getClassess());
//         dispatch(getCoaches());
//     }, [dispatch]);

//     return (
//         <div>
//             <br />
//             <h1>Clases</h1>
//             <div>
//                 {activities?.map((activity) => {
//                     return activity.Classes.map((clase, index) => {
//                         const coach = coaches.find(coach => coach.id === clase.Coach.id);
//                         const coachName = coach ? `${coach.firstName} ${coach.lastName}` : '';
//                         return clase.Events.map((event, index) => (
//                             <CardClasses
//                                 key={index}
//                                 id={activity.id}
//                                 title={activity.title}
//                                 coachName={coachName}
//                                 difficulty={clase.difficulty}
//                                 date={event.date}
//                                 startTime={event.startTime}
//                                 endTime={event.endTime}
//                                 duration={event.duration}
//                                 quota={clase.quota}
//                             />
//                         ));
//                     });
//                 })}
//             </div>
//         </div>
//     )

// };

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
            <br />
            <br />
            <h1>Clases</h1>
            <br />
            {/* <div> */}
                {activities?.map((activity) => {
                    return activity.Classes.map((clase, index) => {
                        const coach = coaches.find(coach => coach.id === clase.Coach.id);
                        const coachName = coach ? `${coach.firstName} ${coach.lastName}` : '';
                        return (
                            <CardClasses
                                key={index}
                                id={activity.id}
                                title={activity.title}
                                difficulty={clase.difficulty}
                                startTime={clase.Events[0].startTime}
                                endTime={clase.Events[0].endTime}
                                duration={clase.Events[0].duration}
                                quota= {clase.quota}
                                date={clase.Events.map((d) => d.date)}
                                coachName={coachName}
                            />
                        );
                    });
                })}
            </div>
        // </div>
    )
};


export default Classes;