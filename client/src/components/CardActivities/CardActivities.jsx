import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CardActivities.module.css';

const CardActivities = ({ id, title, image, difficulty, Goals, description }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} ${flipped ? styles.flipped : ''}`} onClick={handleFlip}>
        <div className={styles.front}>
        <img src={image} alt='' className={styles.profile}/>
        <h2>{title}</h2>
        </div>
        <div className={styles.back}>
        <h3>{difficulty}</h3>
        <h3>{Goals}</h3>
        <h5 className={styles.text}>{description}</h5>
        <Link to={`/activity-detail/${id}`}>
        <button className={styles.buttonI}>Informacion Adicional</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default CardActivities;
