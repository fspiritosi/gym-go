import React from "react";
import CardProfesores from '../../components/CardProfesores/CardProfesores'
// import { getCoaches } from '../../redux/actions';
import Ejemplos from './ejemploprofesores.json'

const Profesores = () => {
    return (
        <div>
            <h1>Profesores</h1>
            <br/>
            <div>
                {Ejemplos.map((c, index) => {
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