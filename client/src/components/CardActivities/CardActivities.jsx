import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardActivities.module.css'

const Card = ({ id, title, image, difficulty, goals }) => {

    return (
        <div className={styles.card}>
            <img src={image} alt={title} />
            <Link to={`/activity-detail/${id}`} key={id} className={styles.cardLink}>
                <h2>{title}</h2>
            </Link>
            {/* <p>{difficulty}</p>
            <ul>
                {goals.map(goal => (
                    <li key={goal}>{goal}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default Card;