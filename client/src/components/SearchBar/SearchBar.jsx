import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchActivitieName } from "../../redux/actions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

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
        
        <div class= "max-w-2xl px-1 mr-0 sm:px-1">	     
        <div class="flex items-center ml-2 h-full">
        <input type="text" placeholder="Busca tu Actividad..." class="px-2 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" onChange={handlerInputChange}/>
          <button class=' ml-3' type="submit" onClick={handlerSubmit}><FaSearch /></button>
            <ToastContainer
            position="top-center"   
            autoClose={2000}
            theme="dark"
            />	  
	    </div>
	   
      </div>        
    )
}


export default SearchBar;

