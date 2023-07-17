import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'tailwindcss/tailwind.css';

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }


  
  return (
    isAuthenticated && (
      <div className="flex flex-col items-center justify-center">
        <img
          className={props.pictureStyles}
          src={user.picture}
          alt={user.name}
        />
        <h2 className={props.nameStyles}>{user.name}</h2>
      </div>
    )
  );
};
export default Profile;
