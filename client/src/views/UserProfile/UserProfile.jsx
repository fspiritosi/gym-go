import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CardReservas from "../../components/CardReservas/CardReservas";
import CardCompras from "../../components/CardCompras/CardCompras";
import {MdCreditScore} from 'react-icons/md'
import {BsFillBookmarkStarFill} from 'react-icons/bs'
import {SiShopee} from 'react-icons/si'
import { FaUserCircle } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const UserProfile = () => {
  const user = useSelector((state) => state.userLogged);
  

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (    
    
    <div class=" min-h-screen flex flex-col bg-black">
      {user ? (
       <>
            
    <div class="bg-green mt-24 shadow-lg pb-3 rounded-b-3xl">
    <div class="rounded-b-3xl bg-black text-white font-semibold space-y-5 items-center py-7">
      <FaUserCircle className=" mx-auto w-24 h-24"/>
      
        <span class="text-xl font-semibold">{user.username}</span>
      
      <div class="ml-3 mr-8 flex justify-end  items-center">      
         <Link to='/prices'>
         <span class="text-l font-semibold mr-3 text-white">Comprar más</span>
          <button class="tr-300">
            <SiShopee color="white" className="h-8 w-8 "/>    
          </button>
          </Link>              
      </div>       
    </div>
    
    <div class="grid px-7 py-2 items-center justify-around grid-cols-2 gap-4 divide-x divide-solid">
      <div class="col-span-1 flex flex-col items-center">
      <button>
          <BsFillBookmarkStarFill className="h-10 w-10 text-black"/>           
        </button>
        <span class="text-2xl font-bold ">Mis Reservas</span>        
      </div>
      <div class="col-span-1 px-3 flex flex-col items-center">
       <button
          class="tr-300">
          <MdCreditScore className="h-10 w-10 text-black"/>                
       </button>
        <span class="text-2xl font-bold">Mis Creditos</span>        
      </div>      
    </div>
  </div>

  <div class="grid mb-10 pb-4 rounded-2xl divide-x divide-dashed hover:divide-solid justify-evenly bg-gray gap-4 m-3 mt-10 grid-cols-2">
    <div class="col-span-1 bg-gray h-80 p-3">
      <div class="flex flex-col items-center mt-1">        
                    
          {user.Events.map((event) => (
                  <CardReservas
                    key={event.id}
                    date={event.date}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    difficulty={event.Class.difficulty}
                    activityTitle={event.Class.Activity.title}
                    coachFirstName={event.Class.Coach.firstName}
                    coachLastName={event.Class.Coach.lastName}
                  />
                ))}    
      </div>
    </div>
      <div class="col-span-1 bg-gray h-80  p-3">
         <div class="flex flex-col items-center ">
          <CardCompras/>
            
            {user.purchases.map((purchase) => (
                   <CardCompras
                    key={purchase.orderId}
                     description={purchase.item.description}
                     createdAt={purchase.item.createdAt}
                   />
                 ))
              }
          </div>
        </div>       
        </div>
        </>
         ) : (
         <p>Loading...</p>
         )}
        

          </div>      
 )                 
};

export default UserProfile;
