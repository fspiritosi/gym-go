import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
// import { imageListClasses } from '@mui/material';


const Detail = () => {
  const {id} = useParams();
  const [activityDetail, setActivityDetail] = useState(null);

  useEffect(() => {
    const getActivityDetail = async () => {
      const response = await axios.get(`/activities/${id}`);
      setActivityDetail(response.data);
    };
    getActivityDetail();
  }, [id]);

  
  return (
    <div class=' pt-9 mt-8 min-h-screen'>      
      <div class= " bg-gray-light min-w-screen min-h-screen flex items-center lg:p-10 overflow-hidden">        
    <div class=" flex w-full max-w-6xl round bg-green.claro p-10 lg:p-20 mx-auto text-gray-dark md:text-left ">
        <div class="md:flex items-center -mx-10">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div>
                {activityDetail?.image.map(img => (
                    <img class="w-full z-10 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 border-gray-dark overflow-hidden hover:border-green-neon hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring" src={img}></img>
                  ))}
                    
                </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
                <div>                    
                    <h1 class="font-bold uppercase text-3xl mb-5">{activityDetail?.title}</h1><br></br>
                    <p class=" font-bold uppercase mb-5 text-l">{activityDetail?.description}</p>
                    <Link to={'/activities'}>
                    <button button className=' bg-gray-dark hover:bg-gray-claro text-white px-6 mt-8 mx-4 py-1 rounded-xl border-4 border-white'> volver </button>
                    </Link>
                    <Link to={'/classes'}>
                    <button className=' bg-gray-dark hover:bg-gray-claro text-white px-6 mt-8 mx-4 py-1  rounded-xl border-4 border-white'> ver clases </button>
                    </Link>
                  </div>              
               </div>
            </div>
          </div>
         </div>
      </div>
);
};

export default Detail



