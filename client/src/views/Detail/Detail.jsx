import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Classes from '../../components/Classes/Classes';
import axios from 'axios';
import styles from './Detail.module.css';

const Detail = () => {
  const {id} = useParams();
  const [activityDetail, setActivityDetail] = useState(null);

  useEffect(() => {
    const getActivityDetail = async () => {
      const response = await axios.get(`/activities/${id}`);
      setActivityDetail(response.data);
    };
    getActivityDetail();
  }, [id]);

  
  return (
    <div>
      <Link to='/activities'> <button className={styles.btn}><span>Volver</span></button></Link>
      <div>
        {activityDetail ? (
          <div className={styles.containerDetail}>
            <h1 className={styles.title}>{activityDetail.title}</h1>
            <img className={styles.image} src={activityDetail.image} alt={activityDetail.title}/>
            <h3 className={styles.text}>{activityDetail.description}</h3>
            <h3>Dificultad: {activityDetail.difficulty}</h3>
            <h3>Objetivos: </h3>
            <ul>
              {activityDetail.Goals.map(goal => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
            <Classes/>
            {/* <h3>Image: {activityDetail.image}</h3> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Detail
