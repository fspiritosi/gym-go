import React from 'react';
import CardActivities from '../CardActivities/CardActivities';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from '../../redux/actions';
import styles from './Activities.module.css';

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return(
    <div>
      <h1 className={styles.title}>Actividades</h1>
        <div>
          <SearchBar />
        </div>
        <div className={styles.activitiesContainer}>
          {activities?.map((activity,index) => {
            return (
              <CardActivities
                key={index}
                id={activity.id}
                image={activity.image}
                title={activity.title}
                difficulty={activity.difficulty}
                goals={activity.Goals}
              />
            )
          })}
        </div>
    </div>
  )
};

export default Activities;