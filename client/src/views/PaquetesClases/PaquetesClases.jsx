import React from "react";
import CardPaquete from "../../components/CardPaqueteClase/CardPaqueteClase";
import EjemploPC from "./ejemplopaquetesclases.json"



const PaqueteClases = () => {
    return (
        <div>
            <br/>
            <h1>Paquetes de Clases</h1>
            <br/>
            <br/>
            <div>
                {EjemploPC.map((p, index) => {
                    return ( 
                        <CardPaquete
                            key={index}
                            id={p.id}
                            clases={p.clases}
                            title={p.title}
                            price={p.price}
                        />
                    ) 
                })}
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
};

export default PaqueteClases;