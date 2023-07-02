import React from 'react';
import { useState } from 'react';
import style from './CardProfesores.module.css'


const Card = ({ id, firstName, profilePicture, description, lastName }) => {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={style.cardContainer}>
            <div className={`${style.card} ${isFlipped ? style.flipped : ''}`} onClick={handleFlip}>
                <div className={style.front}>
                    <h3>{firstName}{lastName}</h3>
                    <img src={profilePicture} alt='' className={style.profile} />
                </div>
                <div className={style.back}>
                {/* <h3>{firstName}{lastName}</h3> */}
                <br/>
                    <h5>{description}</h5>
                </div>
            </div>
        </div>
    );
};

export default Card;