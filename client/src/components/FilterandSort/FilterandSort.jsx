import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderByName, filterByGoals } from '../../redux/actions';
import 'tailwindcss/tailwind.css';
import SearchBar from '../SearchBar/SearchBar';

const FilterandSort = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);

  const handlerSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };  

  const handlerFilterGoals = (e) => {
    e.preventDefault();
    dispatch(filterByGoals(e.target.value));
  };

  return (
    <div class="mb-2 w-full md:w-2/3 py-3 px-2 rounded-lg">
	
	  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">    

    <select class="px-1 py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" onChange={handlerSort}>
      <option value="all">Ordena</option>
      <option value="a">A - Z</option>
      <option value="z">Z - A</option>
		</select>

		<select class="px-1 py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" onChange={handlerFilterGoals}>
       <option value="all">Elige tu actividad </option>
          {goals?.map((goal, index) => (
          <option key={index} value={goal.name}>            
            {goal.name}
          </option>
         ))}
		</select>
    
    <div>
      <SearchBar/>	  
	  </div>
	  </div>
	</div>
  
    
  );
};

export default FilterandSort;

