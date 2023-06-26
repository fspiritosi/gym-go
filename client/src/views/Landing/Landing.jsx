import React from 'react';
import logo from './image/logo.png';
import styles from './Landing.module.css';


const Landing = () => {

    return (
        <div className={styles.container}>
            <img className={styles.img} src={logo} alt='logo'/>
            <h1 className={styles.text}>Comienza el Reto</h1>
            <button className={styles.button}>
                Home
            </button>
        </div>
    )
}

export default Landing;