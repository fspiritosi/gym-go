import React, { useState } from 'react';
import style from "./CardPaquete.module.css";
import MercadoPago from '../MercadoPago/MercadoPago';

const CardPaquete = ({ title, clases, price, comprar }) => {
    const [orderData, setOrderData] = useState({ description: title, price: Number(price), quantity: 1 });
    const [showMercadoPago, setShowMercadoPago] = useState(false);

    const handleBuy = () => {
        setShowMercadoPago(true);
    };
    
    return (
        <div className={style.cardContainer}>
            <br/>
            {/* <h1>{clases}</h1> */}
            <h2>{title}</h2>
            <h2>${price}</h2>
            <br/>
            <div>
            <button
                className={style.comprar}
                onClick={handleBuy}
            >Comprar</button>
            {showMercadoPago && <MercadoPago orderData={orderData} />}
            <br/>
        </div>
    );
};

export default CardPaquete;