import React from "react";
import "tailwindcss/tailwind.css";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";

const Card = ({ id, firstName, profilePicture, description, lastName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div class="my-4 px-1 w-1/5  md:w-1/5 lg:w-1/6 overflow-hiddden">
      <div>
        <img
          class="border-4 border-green-neon rounded-full transition duration-500 hover:border-yellow mx-auto md:mx-0 w-18 md:w-auto"
          src={profilePicture}
          alt="user-avatar"
        />
        <p class="text-lg text-yellow mt-4 md:mt-8">
          <b>
            {firstName} {lastName}
          </b>
        </p>
        <p class="text-yellow-500">{description}</p>
      </div>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Calificar</button>
        <Modal
          isOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Card;
