import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useDispatch } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Modal = ({ isOpen, closeModal, eventId }) => {
  const user = useSelector((state) => state.userLogged);
  const event = user.Events.find((e) => e.id === eventId);
  const coachId = event.Class.Coach.id;
  console.log(coachId);

  const [input, setInput] = useState({
    rate: "",
  });
  if (!isOpen) return null;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "rate") {
      setInput({
        ...input,
        [name]: parseInt(value),
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rate } = input;

    await axios.post("/reviews", {
      rate: rate ? rate : 3,
      eventId,
      coachId,
      userId: user.id,
    });
    closeModal();
    alert("Calificación enviada");
  };
  return (
    <div className=" mx-8 mb-2">
      <AiOutlineClose
        size={20}
        color="#fff"
        onClick={closeModal}
        cursor={"pointer"}
      />
      <div>
        <span>⭐</span>
        <input
          type="range"
          max="5"
          min="1"
          name="rate"
          value={input.rate}
          onChange={handleOnChange}
        />
        <span>⭐⭐⭐⭐⭐</span>
      </div>
      <div>
        <button
          colorScheme="teal"
          paddingRight={10}
          variant="solid"
          size="lg"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Modal;
