import React from 'react';
import { Link } from 'react-router-dom'

const Card = ({id, title, image, difficulty, Goals }) => {

    return (
        <div>
            <div>
            <Link to={`/activity-detail/${id}`}>
            <img src={image} alt='' />
            </Link>
            <h2>{title}</h2>
            {/* <h3>{difficulty}</h3> */}
            {/* <h4>{Goals}</h4> */}
            {/* {Goals?.map((g, index) => (
                <li key={index}>{g}</li>
            ))} */}
            </div>
        </div>
    );
};

export default Card;