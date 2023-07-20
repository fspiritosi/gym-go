import React from "react";
import "tailwindcss/tailwind.css";

const CardCompras = (props) => {
  return (
    <div className="cardCompra">
      <h3 class="text-xl rounded-md bg-green.claro text-black px-2 font-bold mt-2">Compra: <span class=" text-lg font-medium">{props.description}</span></h3>
      
      <h3 class="text-xl rounded-md bg-green.claro text-black px-2 font-bold mt-2">Fecha: <span class=" text-lg font-medium">{props.createdAt}</span></h3>
    </div>
  );
};

export default CardCompras;
