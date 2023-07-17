/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY);

const MercadoPago = ({ orderData }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  
  useEffect(() => {
    const getPreferenceId = async () => {
      try {
        const response = await axios.post("http://localhost:3001/mercadopago/create-preference", orderData);
        console.log(response.data);
        const preferenceId = response.data.id;
        setPreferenceId(preferenceId);
        console.log(preferenceId);
        return preferenceId;
      } catch (error) {
        alert(error);
      }
    };
    getPreferenceId();
  }, [orderData]) 
  //Se quito preferenceId por que estaba generando un loop cuando se renderizaba el boton de mercado pago en CardPaquetes

  return (
    <>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </>
  )
}

export default MercadoPago