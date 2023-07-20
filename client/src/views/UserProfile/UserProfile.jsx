import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CardReservas from "../../components/CardReservas/CardReservas";
import CardCompras from "../../components/CardCompras/CardCompras";

const UserProfile = () => {
  const user = useSelector((state) => state.userLogged);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="profileContainer">
      {user ? (
        <>
          <div className="topSection">
            <div className="userCredits">
              <h1>Créditos disponibles: {user.credits}</h1>
            </div>
            <div className="buyMoreButton">
              <Link to="/prices">
                <button>Comprar más</button>
              </Link>
            </div>
          </div>
          <div className="mainSection">
            <div className="cardReservasContainer">
              <h1>Mis reservas:</h1>
              <div className="cardReserva">
                {user.Events.map((event) => (
                  <CardReservas
                    key={event.id}
                    date={event.date}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    difficulty={event.Class.difficulty}
                    activityTitle={event.Class.Activity.title}
                    coachFirstName={event.Class.Coach.firstName}
                    coachLastName={event.Class.Coach.lastName}
                  />
                ))}
              </div>
            </div>
            <div className="cardComprasContainer">
              <h1>Mis compras:</h1>
              <div className="cardCompra">
                {user.purchases.map((purchase) => (
                  <CardCompras
                    key={purchase.orderId}
                    description={purchase.item.description}
                    createdAt={purchase.item.createdAt}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
