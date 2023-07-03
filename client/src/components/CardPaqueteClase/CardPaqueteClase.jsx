import React from 'react';
import style from "./CardPaquete.module.css"

const CardPaquete = ({ title, clases, price, comprar }) => {
    
    return (
        <div className={style.cardContainer}>
            <br/>
            <h1>{clases}</h1>
            <h2>{title}</h2>
            <br/>
            <h2>{price}</h2>
            <br/>
            <button className={style.comprar}>Comprar</button>
            <br/>
        </div>
    );
};

export default CardPaquete;