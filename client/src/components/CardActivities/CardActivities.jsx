import React from 'react';
import { Link } from 'react-router-dom';


const CardActivities = ({ id, title, image, goals,}) => {
  
   return (    
      <div class=" w-4/5 mx-auto border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-gray-dark overflow-hidden hover:border-green-neon hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
        
        <div>
        <img  src={image} alt='' className=' w-4/5 h-1/2 mx-auto rounded-t-lg p-3'/>
        <h2 class=" text-xl mt-2 font-bold">{title}</h2>
        </div>
        <div className="w-full h-full object-cover">
      <h3 className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600"></h3>
       <p className="text-l text-gray-600">{goals?.join(" - ")}</p>
     <br/>
      <Link to={`/activity-detail/${id}`}>
     <button className="bg-green-neon hover:bg-gray-claro text-white px-2 py-2 mb-3 rounded-xl">
      Más Información
      </button>
      </Link>
       </div>     
        
      </div>  
  );
};

export default CardActivities


