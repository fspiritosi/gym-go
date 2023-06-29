import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchActivitieName } from "../../redux/actions";
import styles from "./SearchBar.module.css"


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
        </div>
    )
}


export default SearchBar;