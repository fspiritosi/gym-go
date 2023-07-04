import React, { useState } from 'react';
import style from "./CardPaquete.module.css";
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import MercadoPago from '../MercadoPago/MercadoPago';

// const { PUBLIC_KEY } = process.env;
initMercadoPago("TEST-7951ec00-5a14-4772-b454-928cd10f2a74");

const CardPaquete = ({ title, clases, price, comprar }) => {
    const [preferenceId, setPreferenceId] = useState(null);
    const [orderData, setOrderData] = useState({ description: title, price: Number(price), quantity: 1 });

    const handleBuy = async () => {
        try {
            const response = await axios.post("http://localhost:3001/mercadopago/create_preference", orderData);
            const id = response.data.preferenceId;
            setPreferenceId(id);
            return preferenceId;
          } catch (error) {
            alert(error);
          }
    };
    
    return (
        <div className={style.cardContainer}>
            <br/>
            {/* <h1>{clases}</h1> */}
            <h2>{title}</h2>
            <br/>
            <h2>${price}</h2>
            <br/>
            <button
                className={style.comprar}
                onClick={handleBuy}
            >Comprar</button>
            {preferenceId && <MercadoPago preferenceId={preferenceId}/>}
            <br/>
        </div>
    );
};

export default CardPaquete;