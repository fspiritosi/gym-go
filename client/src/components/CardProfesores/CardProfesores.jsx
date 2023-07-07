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
                    <img src={profilePicture} alt='' className={style.profile} />
                    <h3>{firstName} {lastName}</h3>
                </div>
                <div className={style.back}>
                {/* <h3>{firstName}{lastName}</h3> */}
                <br/>
                    <h5 className={style.text}>{description}</h5>
                </div>
            </div>
        </div>
    );
};

export default Card;