import React from "react";
import CardProfesores from '../../components/CardProfesores/CardProfesores'
// import { getCoaches } from '../../redux/actions';

const Profesores = () => {
    return (
        <div>
            <h1>Vista Profesores</h1>
            <div>
                {/* {coaches.map((c, index) => { */}
                    {/* return ( */}
                        <CardProfesores
                            // key={index}
                            // profilePicture={c.profilePicture}
                            // firstName={c.firstName}
                            // lastName={c.lastName}
                        />
                    {/* ) */}
                {/* })} */}
            </div>
        </div>
    )
};

export default Profesores;