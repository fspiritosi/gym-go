import React from "react";
import CardProfesores from "../../components/CardProfesores/CardProfesores";
import { getCoaches } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "tailwindcss/tailwind.css";

const Profesores = () => {

    const dispatch = useDispatch();
    const coaches = useSelector((state) => state.coaches);

    useEffect(() => {
        dispatch(getCoaches());
    }, [dispatch]);

   return(
    
       
   <section>
	<div class=" min-h-screen py-4 bg-black text-white">

		<div class="mx-auto mt-10 flex flex-col md:flex-row">
			<div class="flex flex-col w-full p-8">
				<h1 class=" font-semibold text-2xl md:text-4xl text-green-neon my-4 leading-relaxed md:leading-snug">El Cross-Training del Desarrollo Web
				</h1>
				<div class="font-sans text-sm md:text-lg my-2"> <br></br>
					<p>
               Al igual que un entrenamiento de crossfit, combinamos diferentes disciplinas para alcanzar el éxito. 
               <br/>Nos especializamos en levantar bases de datos y hacer sentadillas con HTML y CSS. <br/> Con nosotros, tu sitio web estará en la mejor forma.
               </p>
               
               <p className=" mt-3">¡Equipo GYMGO!</p>
				</div>
			</div>
		</div>


		<div class="flex text-center md:text-left px-8 md:px-4 lg:px-8">
        {coaches.map((c, index) => {
           if (c.isActive === false) {

              return null; //no muestra los profesores si esta en false
            }
            return (
              <CardProfesores
                key={index}
                id={c.id}
                profilePicture={c.profilePicture}
                firstName={c.firstName}
                lastName={c.lastName}
                description={c.description}
                reviews={c.Reviews}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Profesores;
