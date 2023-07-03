import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './CardActivities.module.css';

const CardActivities = ({ id, title, image, difficulty, goals }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
      <div className={styles.front}>
        <img src={image} alt={title} />
        <Link to={`/detail/${id}`} className={styles.cardLink}>
          <h2>{title}</h2>
        </Link>
        <button onClick={handleFlip} className={styles.button}>
          More Info
        </button>
      </div>
      <CSSTransition in={flipped} timeout={300} classNames="card-flip">
        <div className={styles.back}>
          <h3>Additional Information</h3>
          <p>Difficulty: {difficulty}</p>
          <p>Goals: {goals}</p>
          <Link to={`/activity-detail/${id}`} className={styles.cardLink}>
            <button className={styles.button}>View Details</button>
          </Link>
          <button onClick={handleFlip} className={styles.button}>
            Go Back
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default CardActivities;
