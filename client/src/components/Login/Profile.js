import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'tailwindcss/tailwind.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      
      <div>       
        <h2 className="text-xs text-white font-serif mb-3">{user.name}</h2>
      </div>
    )
  );
};
export default Profile;
