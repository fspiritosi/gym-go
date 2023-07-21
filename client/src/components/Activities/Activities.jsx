import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getGoals, searchActivitieName } from '../../redux/actions';
import CardActivities from '../CardActivities/CardActivities'
import 'tailwindcss/tailwind.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import GoalFilterDropdown from '../FilterandSort/GoalFilterDropdown';
import FilterandSort from '../FilterandSort/FilterandSort'
import 'tailwindcss/tailwind.css';

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", width:"32px", height: "32px" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", }}
        onClick={onClick}
      />
    );
  }

  const sliderContainerStyle = {
    position: 'relative', // Agregar posición relativa al contenedor del Slider
    zIndex: 0, // Asegurar que el Slider no tenga un valor de z-index mayor que otros elementos
  };
  
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
    const storedSearchTerm = window.localStorage.getItem('searchBar');
    if (storedSearchTerm) {
      dispatch(searchActivitieName(storedSearchTerm));
    }
  }, [dispatch]);

  return (

    <div className=" bg-black w-full min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
       <div className=" mt-10 pb-10">
            <h2 className=" font-semibold text-white text-3xl sm:text-4xl">Encuentra tu pasión por el fitness en nuestras diversas actividades</h2>
          </div>
       
       <div>
       <h1 className=' text-white'>filtra y ordena tus actividades y objetivos</h1>      
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div class=" h-14 rounded-lg bg-gray-dark">
          
          <FilterandSort/>        
        </div> 
        <div class=" h-14 rounded-lg bg-gray-dark">
          <GoalFilterDropdown/>
        </div>
        </div>    
    </div>
        <div className=" pt-9 mx-8 lg:items-center">
          
          
          <div style={sliderContainerStyle}>
            <Slider {...settings}             
            >
              {activities?.map((a, index) => {
                if (a.isActive === false) {
                  return null; // No muestra la activividad si se desactiva desde el dashboardadmin
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
            </Slider>
          </div>
        </div>
      </div>    
  );

};

export default Activities;








