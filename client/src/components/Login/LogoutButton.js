import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './Login.module.css'

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className={style.buttonL} onClick={() => logout({ returnTo: window.location.origin })}>
      Cerrar Sesion
    </button>
  );
};

export default LogoutButton;
