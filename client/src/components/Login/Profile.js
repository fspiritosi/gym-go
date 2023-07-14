import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "tailwindcss/tailwind.css";
import axios from "axios";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userInDB, setUserInDB] = useState("not know yet");

  useEffect(() => {
    const fetchUser = async (email) => {
      await axios
        .get(`/users?email=${email}`)
        .then((response) => {
          setUserInDB(true);
        })
        .catch((error) => {
          setUserInDB(false);
        });
    };
    if (user)
      fetchUser(user.email);
    if (!userInDB) {
      const createUser = async (body) => {
        await axios
          .post('/users/register', body)
          .then((response) => {
            setUserInDB(true);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      createUser({ username: user.nickname, email: user.email });
    }
  }, [user, userInDB]);

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
