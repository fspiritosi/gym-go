import React from 'react';

const Card = ({ name, image }) => {

    return (
        <div>
            <div>
            <h5>{image}</h5>
            <h2>{name}</h2>
            <button>Detail</button>
            </div>
        </div>
    );
};

export default Card;