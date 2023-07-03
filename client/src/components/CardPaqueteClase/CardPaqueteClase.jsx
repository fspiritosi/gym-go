import React from 'react';

const CardPaquete = ({ title, clases, price, comprar }) => {
    
    return (
        <div>
            <h1>{title}</h1>
            <button>Comprar</button>
        </div>
    );
};

export default CardPaquete;