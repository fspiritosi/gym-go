import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByGoals } from '../../redux/actions';
import 'tailwindcss/tailwind.css';
import Select from 'react-dropdown-select';

const GoalFilterDropdown = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleFilter = () => {
    // Extraer solo los nombres de los objetivos del array seleccionado
    const selectedGoalsNames = selectedGoals.map((goal) => goal.value);
  
    // Verificar si hay objetivos válidos seleccionados antes de llamar a la acción
    if (selectedGoalsNames.length > 0) {
      dispatch(filterByGoals(selectedGoalsNames));
    } else {
      console.log('No se seleccionaron objetivos válidos.');
    }
  };

  
  

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-4 mx-8">
        <Select className='rounded-md bg-gray-light mt-3'

          multi
          options={goals.map((goal) => ({ value: goal.name, label: goal.name }))}
          onChange={(values) => {
            console.log('Valores seleccionados:', values);
            setSelectedGoals(values);
          }}
          values={selectedGoals}
        />
        <button
          className="bg-green-neon hover:bg-green.claro text-black text-sm rounded-md font-poppins p-2 mt-3"
          onClick={handleFilter}
        >
          Filtra tu objetivo
        </button>
      </div>
    </div>
  );
};

export default GoalFilterDropdown;

