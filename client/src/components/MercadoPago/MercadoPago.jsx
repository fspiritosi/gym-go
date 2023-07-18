/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useAuth0 } from '@auth0/auth0-react';
initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY);

const MercadoPago = ({ orderData }) => {
  const { user } = useAuth0();
  const [preferenceId, setPreferenceId] = useState(null);
  const preferenceCretaedRef = useRef(false);

  useEffect(() => {
    if (preferenceCretaedRef.current) return;
    const getPreferenceId = async () => {
      await axios
        .post("/mercadopago/create-preference", orderData)
        .then( async (response) => {
          console.log(response.data.id);
          setPreferenceId(response.data.id);
          await axios.post("/orders", {
            preferenceId: response.data.id,
            checkout: response.data.init_point,
            item: response.data.items.map((item) => ({
              description: item.title,
              price: item.unit_price,
              quantity: item.quantity
            }))[0],
            operationType: response.data.operation_type,
            userEmail: user.email
          })
        });
    };
    getPreferenceId();
    preferenceCretaedRef.current = true;
  }, [orderData]);
  //Se quito preferenceId por que estaba generando un loop cuando se renderizaba el boton de mercado pago en CardPaquetes

  return <>{preferenceId && <Wallet initialization={{ preferenceId }} />}</>;
};

export default MercadoPago;
