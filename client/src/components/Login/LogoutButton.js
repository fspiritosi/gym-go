import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'tailwindcss/tailwind.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='bg-green-neon hover:bg-gray-claro text-white px-2 py-1 mb-3 rounded-xl border-4 mt-8 border-white' onClick={() => logout({ returnTo: window.location.origin })}>
      Cerrar Sesion
    </button>
  );
};

export default LogoutButton;
