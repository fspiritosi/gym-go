import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import vector from "../../Assets/sidebar/Vector.png"
import filtro from "../../Assets/sidebar/filtro.png"
import Actividad from "../../Assets/sidebar/actividad.png"
import Profesor from "../../Assets/sidebar/teacher.png"
import Calendario from "../../Assets/sidebar/fecha.png"
import Reloj from "../../Assets/sidebar/hora.png"
import SearchBar from '../SearchBar/SearchBar';
import { filterByDifficulty, filterByCoach, filterByTitle, filterByStartTime, filterByDate, filterByCoachName } from "../../redux/actions"


const Sidebar = () =>{
    //const [classes, setClasses] = useState([]);
    const dispatch = useDispatch();

    const[open,setOpen] = useState(true);
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
    //const coaches = useSelector((state) => state.coaches);
    //const activities = useSelector((state) => state.activities);
    

    const handleDifficultyChange = (e) => {
        setSelectedDifficulty(e.target.value);
        dispatch(filterByDifficulty(e.target.value));
    };

    //const handleCoachFilter = (e) => {
    //    const selectedCoach = e.target.value;
    //    dispatch(filterByCoach(selectedCoach));
    //};

    const handleTitleFilter = (title) => {
        dispatch(filterByTitle(title));
      };
    
      const handleStartTimeFilter = (startTime) => {
        dispatch(filterByStartTime(startTime));
      };
    
      const handleDateFilter = (date) => {
        dispatch(filterByDate(date));
      };
    
      const handleCoachNameFilter = (coachName) => {
        dispatch(filterByCoachName(coachName));
      };
    

    return(
        <div className="flex-1">

            <div className={`${open ? "w-72" : "w-20"} duration-300 h-90 p-10 pt-10 bg-gray-claro relative gap-10`}>
                <img src={vector} 
                className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-gray-claro ${!open && 'rotate-180'} `}
                onClick={()=>setOpen(!open)}/>
                <div className=" flex gap-x-8 items-center ">
                    <img src={filtro}
                    className={`cursor-pointer rounded-full duration-500 ${open && "rotate-[360dg]"}` }
                     />
                    <h1 className={` text-white origin-left font-medium text-x1 duration-200 ${!open && "scale-0"}`}>Filtros</h1>
                </div>

                <div className={`${!open && "scale-0"} w-60 h-11 relative`} >
                    <SearchBar/>	  
	            </div>

        <div className={`${open ? "w-30" : "w-20 items-center" } flex-col  items-start gap-10 inline-flex` }>
        <div className="flex inline-flex">
            <img src={Actividad} className={`w-12 rounded-full duration-500 `} />
            <select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${
                !open && "hidden"
              } origin-left duration-200`}
              onChange={(e) => handleTitleFilter(e.target.value)}
            >
              <option value="">Nombre de la Actividad</option>
              {/* Opciones adicionales para la selección */}
            </select>
          </div>

          <div className="flex inline-flex">
            <img src={Profesor} className={`w-12  rounded-full duration-500 `} />
            <select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${
                !open && "hidden"
              } origin-left duration-200`}
              onChange={(e) => handleCoachNameFilter(e.target.value)}
            >
              <option value="">Nombre del Profesor</option>
              {/* Opciones adicionales para la selección */}
            </select>
          </div>

          <div className="flex inline-flex">
            <img src={Calendario} className={`w-12 rounded-full duration-500 `} />
            <select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${
                !open && "hidden"
              } origin-left duration-200`}
              onChange={(e) => handleDateFilter(e.target.value)}
            >
              <option value="">Fecha de Inicio</option>
              {/* Opciones adicionales para la selección */}
            </select>
          </div>

          <div className="flex inline-flex">
            <img src={Reloj} className={`w-12 rounded-full duration-500 `} />
            <select
              className={`text-black w-70 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-neon rounded-md ${
                !open && "hidden"
              } origin-left duration-200`}
              onChange={(e) => handleStartTimeFilter(e.target.value)}
            >
              <option value="">Horario de Inicio</option>
              {/* Opciones adicionales para la selección */}
            </select>
          </div>
                    
                    <div className={`${!open && "scale-0"} w-70 duration-200 p-10 pt-10 text-black relative`}>
                        <label htmlFor="difficulty">Seleccione su Dificultad</label>
                        <input
                        type="range"
                        id="difficulty"
                        min="easy"
                        max="hard"
                        value={selectedDifficulty}
                        onChange={handleDifficultyChange}
                    />
                        <div className="w-24 h-9 absolute text-center text-black text-xl font-normal">
                            <span>Easy</span>
                            <span>Medium</span>
                            <span>Hard</span>
                        </div>
                    </div>
                </div>


                
            </div > 

        </div>
    )
}

export default Sidebar
