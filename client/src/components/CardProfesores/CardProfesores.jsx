import React from 'react';
import styles from './CardProfesores.module.css'


const Card = ({ id, firstName, profilePicture, description, lastName }) => {

    return (
        <div>
            <h2>{firstName}{lastName}</h2>
            <img src={profilePicture} alt='' className={styles.profile}/>
            <p>{description}</p>
        </div>
    );
};

export default Card;