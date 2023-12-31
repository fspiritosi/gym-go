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

    if (selectedClassesNames.length > 0) {
      dispatch(filterByTitle(selectedClassesNames));
    } else {
      console.log('No se seleccionaron actividades válidas.');
    }
  };

  const handleCoachNameFilter = () => {
    const selectedCoachNames = selectedCoach.map((c) => c.value);

    if (selectedCoachNames.length > 0) {
      dispatch(filterByCoachName(selectedCoachNames));
    } else {
      console.log('No se seleccionaron entrenadores válidos.');
    }
  };

  const handleStartTimeFilter = () => {
    const selectedClasseStartTime = selectedStartTime.map((c) => c.value);

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

  //Para que no se repitan las etiquetas de actividades en el select
  const uniqueTitles = Array.from(new Set(allClasse.map((classItem) => classItem.Activity.title)));
  const options = uniqueTitles.map((title) => ({ value: title, label: title }));

  //Para que no se repitan las etiquetas de coaches en el select
  const uniqueCoachNames = Array.from(new Set(allClasse.map((classItem) => classItem.Coach.firstName + " " + classItem.Coach.lastName)));
  const optionsCoaches = uniqueCoachNames.map((coachName) => ({ value: coachName, label: coachName }));

  <Select
    className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${!open && "scale-0"} origin-left duration-200`}
    multi
    options={options}
    onChange={(values) => {
      setSelectedCoach(values);
    }}
    value={selectedCoach}
  />


  return (
    <div className="flex min-h-screen flex-col md:flex-row h-max ">
      <div className={`duration-300 h-90 p-10 pt-10 bg-gray-dark rounded-xl gap-9`}>
        <div className=" flex gap-x-4 mx-12 items-center ">
          <img src={filtro}
            className={`cursor-pointer rounded-full duration-500 w-16 my-2}`}
            alt='' />
          <h1 className={` text-white origin-left font-medium text-xl duration-200 my-2`}>Filtros</h1>
        </div>
        <div className={`w-60 h-11 my-2 mx-auto`} >
          <SearchBarClasses />
        </div>
        <div className={` w-70 h-15 `}>
          <div className="inline-flex">            
            <img src={Actividad} className={`w-11 h-10 rounded-full duration-500 mr-4 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md 
            origin-left duration-200 `}
              multi
              options={options}
              onChange={(values) => {
                setSelectedClasse(values);
              }}
              values={selectedClasse}
              placeholder="Actividad"
            />
          </div>
          <div className="inline-flex">
            <img src={Profesor} className={`w-11 h-10 rounded-full duration-500 mr-4 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md
              origin-left duration-200`}
              multi
              options={optionsCoaches}
              onChange={(values) => {
                setSelectedCoach(values);
              }}
              value={selectedCoach}
              placeholder="Profesor "
            />
          </div>

          <div className="inline-flex">
            <img src={Calendario} className={`w-11 h-10 rounded-full duration-500 mr-4 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md
                origin-left duration-200`}
              multi options={allClasse.map((classItem) => ({ value: classItem.startDate, label: classItem.startDate }))}
              onChange={(values) => {
                setSelectedStartDate(values);
              }}
              values={selectedStartDate}
              placeholder="Fecha    "
            />
          </div>
          <div className=" inline-flex">
            <img src={Reloj} className={`w-11 h-10 rounded-full duration-500 mr-4 shadow-lg`} alt="" />
            <Select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md origin-left duration-200`}
              multi
              options={allClasse.map((classItem) => ({ value: classItem.startTime, label: classItem.startTime }))}
              onChange={(values) => {
                setSelectedStartTime(values);
              }}
              values={selectedStartTime}
              placeholder="Horario  "
            />
          </div>
          <div className={` w-70 h-11 flex items-center justify-center`}>
            <button className="bg-green-neon hover:bg-green text-black text-sm rounded-md font-semibold py-1 px-4"
              onClick={handleButtonClick}>Filtrar</button>
          </div>
          <div className={`w-70 h-11 flex items-center justify-center`}>
            <button className="bg-green-neon hover:bg-green text-black text-sm rounded-md font-semibold py-2 px-5"
              onClick={handleClearFilters}>Limpiar Filtros</button>
          </div>
          <div className={` w-50 h-16 text-white flex items-center justify-center`}>
            <h1 className="text-m font-semibold flex items-center justify-center">Selecciona la Dificultad</h1>
          </div>
          <div className={`w-70 h-11 text-sm text-white font-semibold space-x-2 flex items-center justify-center`}>
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
        </div>
      </div >
    </div>
  )
}

export default Sidebar;
