import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassess } from '../../redux/actions';
import CardClasses from "../CardClasses/CardClasses";


const Classes = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes);

    useEffect(() => {
        dispatch(getClassess());
    }, [dispatch]);

    return (
        <div>
            <br/>
            <h1>Clases</h1>
            <div>
                {classes?.map((c, index) => {
                    return (
                        <CardClasses
                            key={index}
                            id={c.id}
                            difficulty={c.difficulty} 
                            recurringPattern={c.recurringPattern}
                            startDate={c.startDate} 
                            startTime={c.startTime} 
                            endTime={c.endTime}
                            duration={c.Events[0].duration}
                            quota={c.quota}
                        />
                    );
                })}
            </div>

        </div>
    )

};


export default Classes;