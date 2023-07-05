import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './Login.module.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className={style.buttonL} onClick={() => loginWithRedirect()}>Iniciar Sesion</button>;
};

export default LoginButton;
