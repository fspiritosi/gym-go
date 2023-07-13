import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getGoals, searchActivitieName } from '../../redux/actions';
// import SearchBar from '../SearchBar/SearchBar';
import CardActivities from '../CardActivities/CardActivities'
import FilterandSort from '../FilterandSort/FilterandSort';
import 'tailwindcss/tailwind.css';



const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getGoals());
    const storedSearchTerm = window.localStorage.getItem("searchBar");
    if (storedSearchTerm) {
      dispatch(searchActivitieName(storedSearchTerm));
    }
  }, [dispatch]);

  return (
   
 <section>
  <div class="max-w-screen-xl  mt-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <FilterandSort/>
    <div
      class="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
    >
      <div
        class="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right"
      >
        <h2 class="text-3xl font-bold sm:text-5xl">Encuentra tu pasión por el fitness en nuestras diversas actividades</h2>

        <p class="mt-4 text-gray-600">
        En nuestro gimnasio, creemos que el movimiento es vida. Por eso, 
        ofrecemos una amplia gama de actividades diseñadas para inspirarte, 
        motivarte y llevarte más allá de tus límites. 
        Con nuestros entrenadores expertos y programas dinámicos, 
        te invitamos a descubrir un nuevo nivel de bienestar físico y mental.
        </p>        
      </div>     

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 h-96">
      {activities?.map((a, index) => {
        if (a.isActive === false) { 
          //no muestra las actividades si esta en false, revisar ya que si se busca o filtra se muestra en blanco 
          return null; 
        }
          return (
            <CardActivities
              key={index}
              id={a.id}
              image={a.image}
              title={a.title}              
              goals={a.Goals}
              description={a.description}
            />
          );
        })}       
      </div>
    </div>
  </div>
 </section>
    
)

};

export default Activities;








