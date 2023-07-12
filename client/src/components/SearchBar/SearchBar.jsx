import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchActivitieName } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import { useLocalStorage } from "../../redux/useLocalStotage";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useLocalStorage("searchTitle", "");

  useEffect(() => {
    const storedTitle = window.localStorage.getItem("searchTitle");
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, [setTitle]);

  const handlerInputChange = (e) => {
    //e.preventDefault();
    setTitle(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(searchActivitieName(title));
  };

 //useEffect(() => {
 //   window.localStorage.setItem("searchBarTitle", title);
 //}, [title]);

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        value={title}
        placeholder="Buscar Actividad"
        onChange={handlerInputChange}
      />
      <button type="submit" onClick={handlerSubmit}>
        <FaSearch />
      </button>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
      />
    </div>
  );
};

export default SearchBar;
