import React, { useState } from "react";
import GoalFilterDropdown from "./GoalFilterDropdown";
import FilterandSort from "./FilterandSort";
import "tailwindcss/tailwind.css";

const Sidebar = () => {

  return (
    <div>
      <div className="top-0 left-0 right-0 mx-auto mt-5 bg-white h-48 w-96 p-4 shadow">
        <h2 className="text-m font-poppins mb-2">Filtra tus objetivos</h2>
        <GoalFilterDropdown />
        <h2 className="text-m mt-2 font-poppins mb-2">
          Ordena y busca por actividad
        </h2>
        <FilterandSort />
      </div>
    </div>
  );
};

export default Sidebar;
