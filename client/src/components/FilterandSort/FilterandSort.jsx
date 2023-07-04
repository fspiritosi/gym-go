import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderByName, filterByDifficulty, filterByGoals } from '../../redux/actions';
import styles from './FilterandSort.module.css';

const FilterandSort = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);

  const handlerSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };

  const handlerFilterDifficulty = (e) => {
    e.preventDefault();
    dispatch(filterByDifficulty(e.target.value));
  };

  const handlerFilterGoals = (e) => {
    e.preventDefault();
    dispatch(filterByGoals(e.target.value));
  };

  return (
    <div>
      <div className={styles.filterSection}>
        {/* <h3 className={styles.text}>Ordenamiento</h3> */}
        <select className={styles.select} onChange={handlerSort}>
          <option value="all">Ordenamiento</option>
          <option value="a">A - Z</option>
          <option value="z">Z - A</option>
        </select>
      </div>
      <div className={styles.filterSection}>
        {/* <h3 className={styles.text}>¡Selecciona la dificultad y muestra tu determinación!</h3> */}
        <select className={styles.select} onChange={handlerFilterDifficulty}>
          <option value="diff">¡Selecciona la dificultad y muestra tu determinación!</option>
          <option value="easy">Facil</option>
          <option value="medium">Medio</option>
          <option value="hard">Avanzado</option>
        </select>
      </div>
      <div className={styles.filterSection}>
        {/* <h3 className={styles.text}>Encuentra actividades diseñadas para cada objetivo</h3> */}
        <select className={styles.select} onChange={handlerFilterGoals}>
          <option value="all">Encuentra actividades diseñadas para cada objetivo</option>
          {goals?.map((goal, index) => (
            <option key={index} value={goal.name}> 
            {/* Aqui habia un eror en key y value de estaba llamando por id  */}
              {goal.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterandSort;
