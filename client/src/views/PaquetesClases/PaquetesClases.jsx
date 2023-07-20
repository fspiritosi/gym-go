import React from "react";
import CardPaquete from "../../components/CardPaqueteClase/CardPaqueteClase";
import EjemploPC from "./ejemplopaquetesclases.json"




const PaqueteClases = () => {
    return (
        
        <section >
        <div class="py-4 bg-black">
            <div class=" mt-24 items-center sm:items-center sm:justify-between mx-auto flex-col md:flex-row">
                <div>
                    <h2 class="text-4xl font-semibold text-white">¿Preparado para dar el primer paso hacia una nueva versión de ti mismo?</h2>
                    <p class="mt-4 text-white text-xl">Suscríbete hoy y descubre cómo nuestro gimnasio hará que tus objetivos sean realidad.</p>
                </div>               
            </div>

            <div class=" grid gap-6 mt-16 px-8 -mx-6 sm:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

            {EjemploPC.map((p, index) => {
                    return ( 
                        <CardPaquete
                            key={index}
                            id={p.id}
                            clases={p.clases}
                            title={p.title}
                            price={p.price}
                            description={p.description}
                        />
                    ) 
                })}          

                
                </div>
            </div>
        
    </section>   
        
    )
};

export default PaqueteClases;
