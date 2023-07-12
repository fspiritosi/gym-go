import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getGoals } from '../../redux/actions';
import 'tailwindcss/tailwind.css';
import CardActivities from '../CardActivities/CardActivities';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
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
  }, [dispatch]);

  return (
    <div className="max-w-screen-xl min-h-screen mt-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      
        <div className=" pt-9 lg:items-center">
          <div className=" pb-10">
            <h2 className="text-3xl font-bold sm:text-4xl">Encuentra tu pasión por el fitness en nuestras diversas actividades</h2>
          </div>
          
          <div>
            <Slider {...settings}              
            >
              {activities?.map((a, index) => (
                <CardActivities
                  key={index}
                  id={a.id}
                  image={a.image}
                  title={a.title}
                  goals={a.Goals}
                  description={a.description}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>    
  );
};

export default Activities;








