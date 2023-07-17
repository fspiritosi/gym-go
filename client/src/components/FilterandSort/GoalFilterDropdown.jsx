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
    <div className="bg-green.claro mb-2 w-auto mt-8 mx-auto md:w-2/3 py-3 px-2 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
        <Select
          multi
          options={goals.map((goal) => ({ value: goal.name, label: goal.name }))}
          onChange={(values) => {
            console.log('Valores seleccionados:', values);
            setSelectedGoals(values);
          }}
          values={selectedGoals}
        />
        <button
          className="bg-gray hover:bg-gray-light hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleFilter}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default GoalFilterDropdown;

