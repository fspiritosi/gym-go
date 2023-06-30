import React from 'react';

const Card = ({ id, firstName, profilePicture, description, lastName }) => {

    return (
        <div>
            <h1>{firstName}{lastName}</h1>
            <img src={profilePicture} alt='' />
            <p>{description}</p>
        </div>
    );
};

export default Card;