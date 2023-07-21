import React from "react";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import "tailwindcss/tailwind.css";


const CardReservas = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(props);
  
  let difficultyText = '';
    if (props.difficulty === 'easy') {
        difficultyText = 'Fácil';
    } else if (props.difficulty === 'medium') {
        difficultyText = 'Intermedio';
    } else if (props.difficulty === 'hard') {
        difficultyText = 'Avanzado';
    }

  return (
    <>

    <div class=" w-4/5 bg-green.claro mx-auto rounded-lg shadow overflow-hidden mb-5">
       <h3 class="text-xl text-center text-black px-3 font-bold mt-2">{props.activityTitle} -<span class="text-xl text-black px-3 font-bold mt-2">{difficultyText}</span></h3> 
       <h3 class="text-lg text-center text-black px-3 font-bold mt-2">{props.coachFirstName} {props.coachLastName} </h3>       
       <h3 class="text-lg text-center text-black px-3 font-bold mt-2">{props.date} <span>{props.startTime}</span> - <span>{props.endTime}</span></h3>
       <button className="rounded-xl mx-24 mb-3 mt-3 inline-block bg-green-neon px-6 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-green" onClick={() => setIsModalOpen(true)}>Calificar</button> 
     </div>
      
      
      <div>
        <Modal
          eventId={props.eventId}
          isOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);            
          }}
        />
      </div>
    </>

  );
};

export default CardReservas;