import React, { useState } from 'react';
import GoalFilterDropdown from './GoalFilterDropdown';
import FilterandSort from './FilterandSort';
import {GrFilter} from 'react-icons/gr'
import 'tailwindcss/tailwind.css';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button onClick={handleSidebarToggle} className=" text-l font-poppins ml-1 bg-green-neon hover:bg-yellow border-2 hover:border-2-black">
        <GrFilter className='w-6 h-6 inline-block'/>
        Filtrar y Ordenar
      </button>
      {isSidebarOpen && (
        <div className="bg-white top-0 h-48 w-96 p-4 shadow">
          <h2 className="text-m font-poppins mb-2">Filtra tus objetivos</h2>
          <GoalFilterDropdown />
          <h2 className="text-m mt-2 font-poppins mb-2">Ordena y busca por actividad</h2>
          <FilterandSort />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
