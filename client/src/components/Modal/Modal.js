import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
const Modal = ({ isOpen, closeModal }) => {
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
    // dispatch(
    //   postReview({
    //     userId: user.id,
    //     eventId: event.id,
    //     rate: rate ? rate : 3,
    //   })
    // );
  };
  return (
    <div>
      <AiOutlineClose
        size={30}
        color="#000"
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
          POST
        </button>
      </div>
    </div>
  );
};

export default Modal;
