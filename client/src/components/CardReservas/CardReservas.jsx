import React from "react";

const CardReservas = (props) => {
  return (
    <div className="cardReserva">
      <h1>{props.activityTitle}</h1>
      <h2>{props.coachFirstName}</h2> <h2>{props.coachLastName}</h2>
      <h3>{props.difficulty}</h3>
      <p>{props.date}</p> <p>{props.startTime}</p> - <p>{props.endTime}</p>
    </div>
  );
};

export default CardReservas;
