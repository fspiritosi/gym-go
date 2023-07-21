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
  const allClasse = useSelector((state) => state.allClasses)

  const [open, setOpen] = useState(true);
  const [selectedClasse, setSelectedClasse] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);

  useEffect(() => {
    dispatch(filterByDifficulty(selectedDifficulty));
  }, [dispatch, selectedDifficulty]);


  const handleFilterTitle = () => {
    const selectedClassesNames = selectedClasse.map((c) => c.value);
    // console.log(selectedClassesNames);
    // console.log(selectedClasse);

    if (selectedClassesNames.length > 0) {
      dispatch(filterByTitle(selectedClassesNames));
    } else {
      console.log('No se seleccionaron actividades válidas.');
    }
  };

  const handleCoachNameFilter = () => {
    const selectedCoachNames = selectedCoach.map((c) => c.value);
    // console.log('Nombres de entrenadores seleccionados:', selectedCoachNames);
    // console.log(selectedCoachNames);
    // console.log(selectedCoach);

    if (selectedCoachNames.length > 0) {
      dispatch(filterByCoachName(selectedCoachNames));
    } else {
      console.log('No se seleccionaron entrenadores válidos.');
    }
  };

  const handleStartTimeFilter = () => {
    const selectedClasseStartTime = selectedStartTime.map((c) => c.value);
    // console.log('Horarios de inicio seleccionados:', selectedClasseStartTime);

    if (selectedClasseStartTime.length > 0) {
      dispatch(filterByStartTime(selectedClasseStartTime))
    } else {
      console.log('No se seleccionaron horarios válidos')
    }
  }

  const handleDifficultyFilterChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedDifficulty((prevFilter) => [...prevFilter, name]);
    }
    else {
      setSelectedDifficulty((prevFilter) => prevFilter.filter((diff) => diff !== name));
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleDateFilter = (date) => {
    const selectedClasseStartDate = selectedStartDate.map((c) => c.value);
    // console.log('Fechas de inicio seleccionados:', selectedClasseStartDate);

    if (selectedClasseStartDate.length > 0) {
      dispatch(filterByDate(selectedClasseStartDate))
    } else {
      console.log('No se seleccionaron fechas válidas')
    }
  };

  const handleButtonClick = () => {
    handleFilterTitle()
    handleCoachNameFilter()
    handleStartTimeFilter()
    handleDateFilter()
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <div className={`${open ? "w-72" : "w-20"} duration-300 h-90 p-10 pt-10 bg-gray-claro rounded-xl gap-9`}>
        <img src={vector}
          className={`absolute cursor-pointer rounded-full left-25 top-15 w-6   ${!open && 'rotate-180'} `}
          onClick={() => setOpen(!open)} alt='' />
        <div className=" flex gap-x-7 items-center ">
          <img src={filtro}
            className={`cursor-pointer rounded-full duration-500 w-20 my-2 ${open && "rotate-[360dg]"}`}
            alt='' />
          <h1 className={` text-black origin-left font-medium text-x1 duration-200 my-2 text-black ${!open && "scale-0"}`}>Filtros</h1>
          {/* Limpiar filtros */}
        </div>
        <div className={`${!open && "scale-0"} w-60 h-11 my-2`} >
          <SearchBarClasses />
        </div>

        <div className={`${!open && "scale-0"} w-70 h-15 `}>
          {/* Filtra la actividad */}
          <div className="flex inline-flex">
            <img src={Actividad} className={`w-11 h-10 rounded-full duration-500 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"}
              origin-left duration-200 `}
              multi
              options={allClasse.map((classItem) => ({ value: classItem.Activity.title, label: classItem.Activity.title }))}
              onChange={(values) => {
                // console.log('Valores seleccionados:', values);
                setSelectedClasse(values);
              }}
              values={selectedClasse}
              placeholder="Actividad"
            />
            {/* <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white 
              font-semibold py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleFilterTitle}>Buscar</button> */}
          </div>

          {/* Filtra por nombre de profesor */}
          <div className="flex inline-flex">
            <img src={Profesor} className={`w-11 h-10 rounded-full duration-500 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"}
              origin-left duration-200`}
              multi
              options={allClasse.map((classItem) => ({
                value: classItem.Coach.firstName + " " + classItem.Coach.lastName,
                label: classItem.Coach.firstName + " " + classItem.Coach.lastName,
              }))}
              onChange={(values) => {
                // console.log('Valores seleccionados:', values);
                setSelectedCoach(values);
              }}
              value={selectedCoach}
              placeholder="Profesor "
            />
            {/* <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-semibold py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleCoachNameFilter}>Buscar</button> */}
          </div>

          <div className="flex inline-flex">
            <img src={Calendario} className={`w-11 h-10 rounded-full duration-500 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"}
                origin-left duration-200`}
              multi options={allClasse.map((classItem) => ({ value: classItem.startDate, label: classItem.startDate }))}
              onChange={(values) => {
                // console.log('Valores seleccionados:', values);
                setSelectedStartDate(values);
              }}
              values={selectedStartDate}
              placeholder="Fecha    "
            />
            {/* <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-semibold py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleDateFilter}>Buscar</button> */}
          </div>

          <div className="flex inline-flex">
            <img src={Reloj} className={`w-11 h-10 rounded-full duration-500 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"
                } origin-left duration-200`}
              multi
              options={allClasse.map((classItem) => ({ value: classItem.startTime, label: classItem.startTime }))}
              onChange={(values) => {
                // console.log('Valores seleccionados:', values);
                setSelectedStartTime(values);
              }}
              values={selectedStartTime}
              placeholder="Horario  "
            />
            {/* <button
              className={`bg-gray hover:bg-gray-light hover:text-black text-sm rounded-md text-white font-semibold py-1 px-2 ${!open && "scale-0"}`}
              onClick={handleStartTimeFilter}>Buscar</button> */}
          </div>
          <div className={`${!open && "scale-0"} w-70 h-11 flex justify-end`}>
          <button className="bg-green-neon hover:bg-green text-black text-sm rounded-md font-semibold py-1 px-5"
            onClick={handleButtonClick}
          >Filtrar</button>
          </div>
          {/* Filtra por Dificultad */}
          <div className={`${!open && "scale-0"} w-70 h-20 text-black flex items-center justify-center`}>
            <label className="text-xs font-bold h-20 flex items-center justify-center">Filtar por Dificultad</label>
            <label>Fácil
              <input
                type="checkbox"
                name="easy"
                checked={selectedDifficulty.easy}
                onChange={handleDifficultyFilterChange}
              /></label>
            <label> Intermedio
              <input
                type="checkbox"
                name="medium"
                checked={selectedDifficulty.medium}
                onChange={handleDifficultyFilterChange}
              /></label>
            <label> Avanzado
              <input
                type="checkbox"
                name="hard"
                checked={selectedDifficulty.hard}
                onChange={handleDifficultyFilterChange}
              /></label>
          </div>
          <div className={`${!open && "scale-0"} w-70 h-11 flex items-center justify-center`}>
            <button className="bg-green-neon hover:bg-green text-black text-sm rounded-md font-semibold py-2 px-5"
              onClick={handleClearFilters}>Limpiar Filtros</button>
          </div>
        </div >
      </div>
    </div>
  )
}

export default Sidebar;
