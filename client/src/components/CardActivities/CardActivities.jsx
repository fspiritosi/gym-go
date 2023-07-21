import React from 'react';
import { Link } from 'react-router-dom';


const CardActivities = (props) => {

  // console.log(props); 
  
   return (    
      <div class=" w-4/5 mx-auto rounded-lg shadow bg-gray-dark overflow-hidden">
        
        <div>
        <img  src={props.image} alt='' className='h-1/2 mx-auto rounded-t-lg'/>
        <h2 class=" text-xl text-white mt-2 font-bold">{props.title}</h2>
        </div>
        <div className="w-full h-full object-cover">     
       <p className="text-l text-white">{props.goals?.join(" - ")}</p>
      <br/>
      <Link to={`/activity-detail/${props.id}`}
          >
          <button className="bg-green-neon hover:bg-gray-claro text-black px-2 py-2 mb-3 rounded-xl">
            Más Información
          </button>
        </Link>
       </div>       
      </div> 
  );
};

export default CardActivities


