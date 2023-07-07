import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'tailwindcss/tailwind.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='bg-green-neon hover:bg-gray-claro text-white px-2 py-1  rounded-xl border-4 border-white' onClick={() => loginWithRedirect()}>Iniciar Sesion</button>;
};

export default LoginButton;
