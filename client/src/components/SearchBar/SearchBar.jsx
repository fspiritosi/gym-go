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
  const [searchTerm, setSearchTerm] = useState("");
  // const [title, setTitle] = useLocalStorage("searchTitle", "");

  useEffect(() => {
    const storedSearchTerm = window.localStorage.getItem("searchBar");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
      dispatch(searchActivitieName(storedSearchTerm));
    }
  }, [dispatch]);

  const handlerInputChange = (e) => {
    //e.preventDefault();
    setSearchTerm(e.target.value);
    window.localStorage.setItem("searchBar", e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(searchActivitieName(searchTerm));
  };

 //useEffect(() => {
 //   window.localStorage.setItem("searchBarTitle", title);
 //}, [title]);

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        value={searchTerm}
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
