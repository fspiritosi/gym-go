import React from "react"
import { useDispatch } from "react-redux";
import { orderByName, filterByDifficulty } from "../../redux/actions";
import styles from "./FilterandSort.module.css"


const FilterandSort = () => {

    const dispatch = useDispatch();

    const handlerSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
    }

    const handlerFilter = (e) => {
        e.preventDefault();
        dispatch(filterByDifficulty(e.target.value));
    }
    
    return(
    <div>
        <select className={styles.select} onChange={handlerSort}>
            <option value="all">Ordering</option>
            <option value="a">A - Z</option>
            <option value="z">Z - A</option>
        </select>
        <select className={styles.select} onChange={handlerFilter}>
            <option value="diff">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </div>
    )
};

export default FilterandSort;
