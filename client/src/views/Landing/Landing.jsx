import React from "react";
import logo from "../../assets/logo.png";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={logo} alt="logo" />
      <h1 className={styles.text}>Comienza el Reto</h1>
      <Link to="/activities">
        <button className={styles.button}>Home</button>
      </Link>
    </div>
  );
};

export default Landing;
