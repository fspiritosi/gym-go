import React from "react";

const CardCompras = (props) => {
  return (
    <div className="cardCompra">
      <h1>{props.description}</h1>
      <h2>{props.createdAt}</h2>
    </div>
  );
};

export default CardCompras;
