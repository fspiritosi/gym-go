/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import vector from "../../Assets/sidebar/Vector.png"
import filtro from "../../Assets/sidebar/filtro.png"
import Actividad from "../../Assets/sidebar/actividad.png"
import Profesor from "../../Assets/sidebar/teacher.png"
import Calendario from "../../Assets/sidebar/fecha.png"
import Reloj from "../../Assets/sidebar/hora.png"
import Select from 'react-dropdown-select';
import SearchBarClasses from "./searchbarclasses";

import { filterByDifficulty, filterByTitle, filterByStartTime, filterByDate, filterByCoachName, clearFilters } from "../../redux/actions"



const Sidebar = () => {
  const dispatch = useDispatch();
  const classe = useSelector((state) => state.classes)
  const allClasse = useSelector((state) => state.allClasses)

 

  const [open, setOpen] = useState(true);
  const [selectedClasse, setSelectedClasse] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');


  const handleFilterTitle = () => {
    const selectedClassesNames = selectedClasse.map((c) => c.value);
    console.log(selectedClassesNames);
    console.log(selectedClasse);

    if (selectedClassesNames.length > 0) {
      dispatch(filterByTitle(selectedClassesNames));
    } else {
      console.log('No se seleccionaron objetivos válidos.');
    }
  };

  const handleCoachNameFilter = () => {
    const selectedCoachNames = selectedCoach.map((c) => c.value);
    console.log('Nombres de entrenadores seleccionados:', selectedCoachNames);
    console.log(selectedCoachNames);
    console.log(selectedCoach);

    if (selectedCoachNames.length > 0) {
      dispatch(filterByCoachName(selectedCoachNames));
    } else {
      console.log('No se seleccionaron entrenadores válidos.');
    }
  };


  const handleStartTimeFilter = () => {
    const selectedClasseStartTime = selectedStartTime.map((c)=> c.value);
    console.log('Horarios de inicio seleccionados:', selectedClasseStartTime);

    if(selectedClasseStartTime.length > 0){
    dispatch(filterByStartTime(selectedClasseStartTime))
    }else{
      console.log('No se seleccionaron horarios válidos')
    }
  }
  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.checked ? e.target.value.toString() : null);
    dispatch(filterByDifficulty(e.target.checked ? e.target.value.toString() : null));
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  

  const handleDateFilter = (date) => {
    const selectedClasseStartDate = selectedStartDate.map((c)=> c.value);
    console.log('Fechas de inicio seleccionados:', selectedClasseStartDate);

    if(selectedClasseStartDate.length > 0){
    dispatch(filterByDate(selectedClasseStartDate))
    }else{
      console.log('No se seleccionaron fechas válidas')
    }
  };


  return (
    <div className="flex-1">
      <div className={`${open ? "w-72" : "w-20"} duration-300 h-90 p-10 pt-10 bg-gray-claro relative gap-10`}>
        <img src={vector}
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-gray-claro ${!open && 'rotate-180'} `}
          onClick={() => setOpen(!open)} alt='' />
        <div className=" flex gap-x-8 items-center ">
          <img src={filtro}
            className={`cursor-pointer rounded-full duration-500 ${open && "rotate-[360dg]"}`}
            alt='' />
          <h1 className={` text-white origin-left font-medium text-x1 duration-200 ${!open && "scale-0"}`}>Filtros</h1>
        </div>

        


        <div className={`${!open && "scale-0"} w-60 h-11 relative`} >
          <SearchBarClasses />
        </div>

        <div className={`${!open && "scale-0"} w-70 h-15 relative`}>
          {/* Filtra la actividad */}
          <div className="flex inline-flex">
            <img src={Actividad} className={`w-12 rounded-full duration-500 `} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"}
                 origin-left duration-200`}
              multi
              options={allClasse.map((classItem) => ({ value: classItem.Activity.title, label: classItem.Activity.title }))}
            
              onChange={(values) => {
                console.log('Valores seleccionados:', values);
                setSelectedClasse(values);
              }}
              values={selectedClasse}
            />
            <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-poppins py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleFilterTitle}>Buscar</button>
          </div>

          {/* Filtra por nombre de profesor */}
          <div className="flex inline-flex">
            <img src={Profesor} className={`w-12  rounded-full duration-500 `} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"}
                 origin-left duration-200`}
              multi
              options={allClasse.map((classItem) => ({
                value: classItem.Coach.firstName + " " + classItem.Coach.lastName,
                label: classItem.Coach.firstName + " " + classItem.Coach.lastName,
              }))}
              onChange={(values) => {
                console.log('Valores seleccionados:', values);
                setSelectedCoach(values);
              }}
              value={selectedCoach}
            />
            <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-poppins py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleCoachNameFilter}>Buscar</button>
          </div>

          <div className="flex inline-flex">
            <img src={Calendario} className={`w-12 rounded-full duration-500 `} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"}
                 origin-left duration-200`}
                multi options={classe.map((classItem) => ({ value: classItem.startDate, label: classItem.startDate }))}
                onChange={(values) => {
                  console.log('Valores seleccionados:', values);
                  setSelectedStartDate(values);
                }}
                values={selectedStartDate}
            />
            <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-poppins py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleDateFilter}>Buscar</button>
          </div>

          <div className="flex inline-flex">
            <img src={Reloj} className={`w-12 rounded-full duration-500 `} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"
                } origin-left duration-200`}
                multi options={classe.map((classItem) => ({ value: classItem.startTime, label: classItem.startTime }))}
                onChange={(values) => {
                  console.log('Valores seleccionados:', values);
                  setSelectedStartTime(values);
                }}
                values={selectedStartTime}
            />
            <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-poppins py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleStartTimeFilter}>Buscar</button>
          </div>
          
          {/* Filtra por Dificultad */}
          <div className={`${!open && "scale-0"} w-70 duration-200 p-10 pt-10 text-black relative`}>
            <label htmlFor="difficulty">Selecciona la Dificultad</label>
            <input
              type="range"
              id="difficulty"
              min="1"
              max="3"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            />
            <div className="w-24 h-8 absolute text-center text-black text-m font-normal">
              <span>Fácil</span>
              <span>Intermedio</span>
              <span>Avanzado</span>
            </div>
          </div>
      </div >

      {/* Limpiar filtros */}
      <div className={`${!open && "scale-0"} w-70 duration-200 p-10 pt-10 text-black relative`}>
      <button className="bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-poppins py-1 px-2"
        onClick={handleClearFilters}>Limpiar Filtros</button>
      </div>
        </div>
    </div>
  )
}

export default Sidebar;
