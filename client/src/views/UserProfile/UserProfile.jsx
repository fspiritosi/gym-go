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
   <section>
    {user ? (
       <>

    <div class=" min-h-screen py-4 bg-black text-white">
    <div className=" pt-24 mx-8 lg:items-center">
          <div className=" pb-10">
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
          <div class=" min-h-screen rounded-lg bg-gray-dark">          
           <FaUserCircle className=" mx-auto mb-10 mt-24 w-24 h-24"/>      
          <span class=" mt-2 text-2xl font-semibold">{user.username}</span>

          <div class=" my-14 py-10 px-10">
            <div className="text-lg font-semibold mr-2 mb-10">Creditos disponibles: {user.credits}</div>   
         <div className=" rounded-xl h-10 items-center  pt-2 pb-10 hover:bg-green.claro bg-green-neon">
         <Link to='/prices'>
         <span class="text-lg font-semibold mr-3 text-black">Comprar más</span>
          <button>
            <SiShopee color="black" className="h-6 w-6 "/> 
          </button>
          </Link>
          </div>

         </div>
         </div>

         <div class=" min-h-screen rounded-lg bg-gray-dark lg:col-span-2">
         <div class=" mt-4 mb-4 items-center">
         <span class="text-xl font-semibold mr-2 ">Mis Reservas</span> 
        <button>
          <BsFillBookmarkStarFill color="white" className="h-6 w-6"/>           
        </button>               
      </div>
      <div className=" bg-black rounded-lg min-h-screen mx-4 my-4 px-2 py-3">
      <div class="flex flex-wrap text-center md:text-left px-8 md:px-4 lg:px-8">
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
      </div>
         <div class=" min-h-screen rounded-lg bg-gray-dark lg:col-span-2">
         <div class=" mt-4 mb-4 items-center">
         <span class="text-xl font-semibold mr-2 ">Mis Compras</span> 
        <button>
          <MdCreditScore color="white" className="h-6 w-6"/>           
        </button>               
      </div>
      <div className=" bg-black rounded-lg min-h-screen mx-4 my-4 px-2 py-3">
      <div class="flex flex-wrap text-center md:text-left px-8 md:px-4 lg:px-8">
      {user.purchases.map((purchase) => (
                   <CardCompras
                    key={purchase.orderId}
                     description={purchase.item.description}
                     createdAt={purchase.createdAt}
                   />
                 ))
              }            
          </div>
         </div>
             </div>        
           </div>         
          </div>
        </div>
       </div>
           </>
        ) : (
           <p>Loading...</p>
      )}   
      </section>         
 )                 
};

export default UserProfile;


