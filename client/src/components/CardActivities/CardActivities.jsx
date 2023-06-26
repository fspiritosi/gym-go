import React from 'react';

const Card = ({ title, image }) => {

    return (
        <div>
            <div>
            <h5>{image}</h5>
            <h2>{title}</h2>
            <button>Detail</button>
            </div>
        </div>
    );
};

export default Card;