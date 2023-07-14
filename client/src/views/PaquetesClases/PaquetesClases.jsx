import React, { useEffect } from "react";
import CardPaquete from "../../components/CardPaqueteClase/CardPaqueteClase";
import EjemploPC from "./ejemplopaquetesclases.json";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const PaqueteClases = () => {
	const { user, isAuthenticated } = useAuth0();
	const { payment_id, status, external_reference, merchant_order_id } = useParams();
	const purchase = { payment_id, status, external_reference, merchant_order_id };

	useEffect(() => {
		const updateUser = async (id, purchase) => {
			await axios.put(`/users/${id}`, purchase);
		};
		updateUser(user.id, purchase);
	}, []);
	

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
