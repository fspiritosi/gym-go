import React from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDetails} from  '../redux/actions'
import { useEffect } from 'react'

const Detail = () => {
  const activities = useSelector((state)=> state.details)
  console.log(activities)
  const dispatch= useDispatch();

  const{id} = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
   dispatch(getDetails(id));
    console.log(activities);
  }, [dispatch, id, activities]);
        



  return (
    <div>
           <Link to='/home'> <button className='btn'><span>Volver</span></button></Link>
        {
         activities.length> 0 ?   
            <div className='containerDetail'>
                <div className='imgContainer'>
                    <img src={activities[0].image} alt="Classe" width="300px" height="250px"/>
                </div>
                <div >
                    <h1>Classe {activities[0].title}</h1>
                    <h3>Description {activities[0].description}</h3>
                    <h3>Dificultad: {activities[0].dificulty} </h3>
                    <h3>Goals: {activities[0].goals} </h3>
                    <h3>Image: {activities[0].image}</h3>
                  </div>
              </div>
              :
              null
              }
    </div>
  )
}

export default Detail