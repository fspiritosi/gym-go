import React from "react";
import "tailwindcss/tailwind.css";

const Card = ({
  id,
  firstName,
  profilePicture,
  description,
  lastName,
  reviews,
}) => {
  const sumRates = reviews.reduce(
    (accumulator, review) => accumulator + review.rate,
    0
  );
  const avgRate = (sumRates / reviews.length).toFixed(2);

    return (
        <div class="my-4 px-1 w-1/5  md:w-1/5 lg:w-1/6 overflow-hiddden">
        <div>
            <img class="border-4 border-green-neon rounded-full transition duration-500 hover:border-yellow mx-auto md:mx-0 w-18 md:w-auto"
                src={profilePicture}
                alt="user-avatar"/>
            <p class="text-lg text-center text-yellow mt-4 md:mt-8"><b>{firstName} {lastName}</b></p>            
            <p class="text-white text-center">{description}</p>
        </div>
    </div>
  );
};

export default Card;
