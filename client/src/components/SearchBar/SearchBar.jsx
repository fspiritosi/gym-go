import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchActivitieName } from "../../redux/actions";
import styles from "./SearchBar.module.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
            
    const handlerInputChange = (e) =>{ 
        e.preventDefault()
        setTitle(e.target.value)
    }
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        setTitle("")
        dispatch(searchActivitieName(title))
    }

    return(
        <div className={styles.searchbar}>
            <button type="submit" onClick={handlerSubmit}>Search</button>
            <input type="text" value={title} placeholder="Search Activity" onChange={handlerInputChange}/>
            <ToastContainer
            position="top-center"   
            autoClose={2000}
            theme="dark"
            />
        </div>
    )
}


export default SearchBar;