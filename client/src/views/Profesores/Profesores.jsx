import React from "react";
import CardProfesores from '../../components/CardProfesores/CardProfesores'
import { getCoaches } from '../../redux/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Ejemplos from './ejemploprofesores.json'

const Profesores = () => {

const dispatch = useDispatch();
const coaches= useSelector((state) => state.coaches);

useEffect(() => {
    dispatch(getCoaches());
}, [dispatch]);

    return (
        <div>
            <br/>
            <h1>Nuestros Profesores</h1>
            <br/>
            <div>
                {coaches.map((c, index) => {
                    return ( 
                        <CardProfesores
                            key={index}
                            id={c.id}
                            profilePicture={c.profilePicture}
                            firstName={c.firstName}
                            lastName={c.lastName}
                            description={c.description}
                        />
                    ) 
                })}
            </div>
        <br/>
        </div>
    )
};

export default Profesores;