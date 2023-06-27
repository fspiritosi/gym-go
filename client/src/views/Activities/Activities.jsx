import React from 'react';
import CardActivitie from '../../components/CardActivitie/CardActivitie';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from '../../redux/actions'; 

const Activities = () => {
    
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    return(
        <div>
            <h1>Activities</h1>
            <div>
                {activities?.map((a,index) => {
                    return (
            <CardActivitie
                key={index}
                image={a.image}
                name={a.name}
                difficulty={a.difficulty}
                Goals={a.Goals}
            />
            )
            })}
            </div>
        </div>
    )
};

export default Activities;