import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchActivitieName } from "../../redux/actions";


const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
            
    const handlerInputChange = (e) =>{ 
        e.preventDefault()
        setTitle(e.target.value)
        console.log(setTitle);
    }
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        setTitle("")
        dispatch(searchActivitieName(title))
    }

    return(
        <div>
            <button type="submit" onClick={handlerSubmit}>Search</button>
                <input type="text" value={title} placeholder="Search Activitie" onChange={handlerInputChange}/>
            </div>
    )
}


export default SearchBar;