import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderByName} from '../../redux/actions';
import 'tailwindcss/tailwind.css';
import SearchBar from '../SearchBar/SearchBar';

const FilterandSort = () => {
  const dispatch = useDispatch();
  
  const handlerSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };  

  return (
    <div>
	
	  <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-2 mx-8 my-3"> 

    <select class="px-1 py-1 w-full rounded-md text-sm" onChange={handlerSort}>
      <option value="all">Ordena</option>
      <option value="a">A - Z</option>
      <option value="z">Z - A</option>
		</select>   
    <div>
      <SearchBar/>	  
	  </div>
	  </div>
	</div>
  
    
  );
};

export default FilterandSort;

