import React from 'react';
import { useState } from 'react';
import styles from './CardProfesores.module.css'


const Card = ({ id, firstName, profilePicture, description, lastName }) => {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleFlip}>
            <div className={styles.cardfront}>
            <h2>{firstName}{lastName}</h2>
            <img src={profilePicture} alt='' className={styles.profile} />
            </div>
            <div className={styles.cardback}>
            <p>{description}</p>
            </div>
        </div>
    );
};

export default Card;