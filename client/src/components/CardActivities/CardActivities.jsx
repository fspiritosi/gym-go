import React from 'react';
import { Link } from 'react-router-dom';


const CardActivities = ({ id, title, image, goals,}) => {
  
   return (    
      <div class=" max-w-sm block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-green-neon hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
        
        <div>
        <img  src={image} alt='' className='inline-block rounded-t-lg p-3'/>
        <h2 class="mt-2 font-bold">{title}</h2>
        </div>
        
        <div >       
          <h3 class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600"> Objetivos </h3>          
          {goals?.map((g, index) => (
                    <li key={index}>{g}</li>
                ))}
                
          <br/>
        <Link to={`/activity-detail/${id}`}>
        <button className='bg-green-neon hover:bg-gray-claro text-white px-2 py-1  rounded-xl'> Más Información </button>
        </Link>
        </div>
      </div>    
  );
};

export default CardActivities;


