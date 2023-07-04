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
        <h3 className={styles.text}>Ordenamiento</h3>
        <select className={styles.select} onChange={handlerSort}>
          <option value="all">All</option>
          <option value="a">A - Z</option>
          <option value="z">Z - A</option>
        </select>
      </div>
      <div className={styles.filterSection}>
        <h3 className={styles.text}>¡Selecciona la dificultad y muestra tu determinación!</h3>
        <select className={styles.select} onChange={handlerFilterDifficulty}>
          <option value="diff">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className={styles.filterSection}>
        <h3 className={styles.text}>Encuentra actividades diseñadas para cada objetivo</h3>
        <select className={styles.select} onChange={handlerFilterGoals}>
          <option value="all">All</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterandSort;
