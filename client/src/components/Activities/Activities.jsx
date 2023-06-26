import React from 'react';
import CardActivities from '../CardActivities/CardActivities';
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
            <CardActivities
                key={index}
                image={a.image}
                title={a.title}
                difficulty={a.difficulty}
                />
                )
            })}
            </div>
        </div>
    )
};

export default Activities;