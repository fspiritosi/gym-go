import React from "react";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import "tailwindcss/tailwind.css";

const CardReservas = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <h3 class="text-xl bg-green.claro text-black px-2 font-bold mt-2">
        Actividad:{" "}
        <span class=" text-lg font-medium">{props.activityTitle}</span>
      </h3>
      <h3 class="text-xl bg-green.claro text-black px-2 font-bold mt-2">
        Profesor:{" "}
        <span class=" text-lg font-medium">{props.coachFirstName}</span>{" "}
        <span class=" text-lg font-medium">{props.coachLastName}</span>
      </h3>
      <h3 class="text-xl bg-green.claro text-black font-bold mt-2">
        Dificultad: <span class=" text-lg font-medium">{props.difficulty}</span>
      </h3>
      <h3 class="text-xl bg-green.claro text-black font-bold mt-2">
        Fecha Reserva: <span class=" text-lg font-medium">{props.date}</span>
      </h3>
      <h3 class="text-xl bg-green.claro text-black font-bold mt-2">
        Fecha inicio:{" "}
        <span class=" text-lg font-medium">{props.startTime}</span>
      </h3>
      <h3 class="text-xl bg-green.claro text-black font-bold mt-2">
        Fecha cierre: <span class=" text-lg font-medium">{props.endTime}</span>
      </h3>
      <button onClick={() => setIsModalOpen(true)}>Calificar</button>
      <div>
        <Modal
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
