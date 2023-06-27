import React from 'react';
import CardActivities from '../CardActivities/CardActivities';
import SearchBar from '../SearchBar/SearchBar';
import FilterandSort from '../FilterandSort/FilterandSort';
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
                <SearchBar />
                <FilterandSort />
                {activities?.map((a,index) => {
                    return (
            <CardActivities
                key={index}
                id={a.id}
                image={a.image}
                title={a.title}
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