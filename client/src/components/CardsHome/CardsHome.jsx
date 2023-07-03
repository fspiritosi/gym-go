import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardsHome.module.css';


const CardActivities = () => {

    return (
        <div>
            <div className={styles.CardActivities}>            
            <Link to={`/activities`}>             
                <h2 className={styles.Titulos}> ACTIVIDADES </h2>                
            </Link>
            </div>
             <div className={styles.CardProfesores}>          
                <Link>      
                <h2 className={styles.Titulos}> PROFESORES </h2> 
                </Link>                
            
             </div>
              <div className={styles.CardNosotros}>          
                <Link>      
                <h2 className={styles.Titulos}> NOSOTROS </h2>
                </Link>            
              </div>
        </div>
    );
};
export default CardActivities
// export const CardCoachs = ({ id, title, image, }) => {

//     return (
//         <div className={styles.card}>
//             <img src={image} alt={title} />
//             <Link to={`/activity-detail/${id}`} key={id} className={styles.cardLink}>
//                 <h2>{title}</h2>
//             </Link>
//         </div>
//     );
// };

// export const CardPaquetes = ()=>{}


