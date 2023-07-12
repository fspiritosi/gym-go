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
      <br/>
      <div className={styles.title}>
        {/* <h1 className={styles.title2}>Actividades</h1> */}
        <br/>
        <h1 className={styles.text}> Bienvenido a las actividades de nuestro gimnasio.</h1>
        <p className={styles.text2}>¡Aquí puedes explorar y encontrar varias actividades físicas para mantenerte en forma y divertirte!</p>
        <SearchBar /> 
      </div>
      <div>
        <div className={styles.filterContainer}>
          {/* <h3>Diversidad para tu entretenimiento</h3> */}
          <h3 className={styles.text2}>Utiliza los distintos filtros y descubre nuevas formas de ponerte en forma</h3>
          <br/>
          <FilterandSort/>
        </div>
        <br/>
        <br/>
      </div>
      <div>
        {activities?.map((a, index) => {
          return (
            <CardActivities
              key={index}
              id={a.id}
              image={a.image}
              title={a.title}
              // difficulty={a.Classes.difficulty} //Se comento de momento para no lanzar error
              goals={a.Goals}
              description={a.description}
            />
          );
        })}
      </div>
      <br/>
      <br/>
    </div>
  );
};

export default Activities;
