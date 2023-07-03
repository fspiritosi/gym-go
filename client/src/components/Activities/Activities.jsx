import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getGoals } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';
import CardActivities from '../CardActivities/CardActivities'
import FilterandSort from '../FilterandSort/FilterandSort';
import styles from './Activities.module.css';

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.title}>
        <h1>Actividades</h1>
        <p>Bienvenido a las actividades de nuestro gimnasio. ¡Aquí puedes explorar y encontrar varias actividades físicas para mantenerte en forma y divertirte!</p>
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <div className={styles.filterContainer}>
          <h2>DIVERSIDAD PARA TU ENTRENAMIENTO </h2>
          <h3>Utiliza los distintos filtros y descubre nuevas formas de ponerte en forma</h3>
          <FilterandSort />
        </div>
      </div>
      <div className={styles.activitiesContainer}>
        {activities?.map((a, index) => {
          return (
            <CardActivities
              key={index}
              id={a.id}
              image={a.image}
              title={a.title}
              difficulty={a.difficulty}
              goals={a.Goals}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
