import React, { useState, useEffect } from "react";
import CardPaquete from "../../components/CardPaqueteClase/CardPaqueteClase";
import EjemploPC from "./ejemplopaquetesclases.json";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const PaqueteClases = () => {
	const { user, isAuthenticated } = useAuth0();
	const [userId, setUserId] = useState(null);
	const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get('payment_id');
  const status = queryParams.get('status');
  const externalReference = queryParams.get('external_reference');
	const merchantOrderId = queryParams.get('merchant_order_id');
	const purchase = {
		paymentId,
		status,
		externalReference,
		merchantOrderId
	}

	useEffect(() => {
		const putPurchaseToUser = async (id, purchase) => {
			await axios
				.put(`/users/${id}`, purchase)
				.then((response) => {
					console.log(purchase);
					alert("créditos cargados exitosamente");
				})
				.catch((error) => {
					alert("hubo un error en la request", error);
				})
		};
		const fetchUser = async (email) => {
      await axios
        .get(`/users?email=${email}`)
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log("User in DB not found", error);
        });
    };
		if (user)
    	fetchUser(user.email);
		if (paymentId && userId) {
			console.log(userId)
			putPurchaseToUser(userId, purchase);
		}
	}, [user, userId]);
	
	// payment_id=1316582277
	// status=approved
	// external_reference=null
	// merchant_order_id=10438912953

  return (
    <div>
      <br />
      <h1>Paquetes de Clases</h1>
      <br />
      <br />
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
          );
        })}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PaqueteClases;
