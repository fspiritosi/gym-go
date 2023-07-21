/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchClassesByName } from "../../redux/actions";
import { useLocalStorage } from "../../redux/useLocalStotage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const SearchBarClasses = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const storedSearchTerm = window.localStorage.getItem("searchBar");
        if (storedSearchTerm) {
            setSearchTerm(storedSearchTerm);
            dispatch(searchClassesByName(storedSearchTerm));
        }
    }, [dispatch]);

    const handlerInputChange = (e) => {
        //e.preventDefault();
        setSearchTerm(e.target.value);
        window.localStorage.setItem("searchBar", e.target.value);
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(searchClassesByName(searchTerm));
    };


    return (

        <div class="max-w-2xl px-1 mr-0 sm:px-1">
            <div class="flex items-center ml-2 h-full">
                <input
                    type="text"
                    placeholder="Busca tu Actividad..."
                    class="px-2 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={searchTerm}
                    onChange={handlerInputChange}
                />
                <button class=' ml-3' type="submit" onClick={handlerSubmit}><FaSearch color="white" /></button>
            </div>
        </div>
    )
}

export default SearchBarClasses;
