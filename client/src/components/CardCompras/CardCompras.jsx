import React from "react";
import "tailwindcss/tailwind.css";

const CardCompras = (props) => {
  return (
    <div class=" w-4/5 bg-green.claro mx-auto rounded-lg shadow overflow-hidden mb-5">
      <h3 class="text-lg  text-black px-3 font-bold mt-2">Compra: <span class=" text-lg font-medium">{props.description}</span></h3>
      
      <h3 class="text-lg  text-black px-3 font-bold mt-2">Fecha: <span class=" text-lg font-medium">{props.createdAt}</span></h3>
    </div>
  );
};

export default CardCompras;
