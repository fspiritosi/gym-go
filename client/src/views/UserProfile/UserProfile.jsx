import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardReservas from "../../components/CardReservas/CardReservas";
import CardCompras from "../../components/CardCompras/CardCompras";
import { MdCreditScore } from "react-icons/md";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { SiShopee } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserLogged } from "../../redux/actions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);
  const { user } = useAuth0();

  useEffect(() => {
      dispatch(getUserLogged(user.email, user.nickname));
  }, [dispatch]);

  return (
    <section>
      {userLogged ? (
        <>
          <div class=" min-h-screen py-4 bg-black text-white">
            <div className=" pt-24 mx-8 lg:items-center">
              <div className=" pb-10">
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
                  <div class=" min-h-screen rounded-lg bg-gray-dark">
                    <img src={user?.picture} className=" rounded-full mx-auto mb-10 mt-24 w-24 h-24" />
                    <span class=" mt-2 text-2xl font-semibold">
                      {userLogged.username}
                    </span>

                    <div class=" my-14 py-10 px-10">
                    <div className="text-lg font-semibold mr-2 mb-10">Creditos disponibles: {userLogged.credits}</div>
                      <div className=" rounded-xl h-10 items-center pt-2 pb-10 hover:bg-green.claro bg-green-neon">
                        <Link to="/prices">
                          <span class="text-lg font-semibold mr-3 text-black">
                            Comprar más
                          </span>
                          <button>
                            <SiShopee color="black" className="h-6 w-6 " />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div class=" min-h-screen rounded-lg bg-gray-dark lg:col-span-2">
                    <div class=" mt-4 mb-4 items-center">
                      <span class="text-xl font-semibold mr-2 ">
                        Mis Reservas
                      </span>
                      <button>
                        <BsFillBookmarkStarFill
                          color="white"
                          className="h-6 w-6"
                        />
                      </button>
                    </div>
                    <div className=" bg-black rounded-lg min-h-screen mx-4 my-4 px-2 py-3">
                      <div class="flex flex-wrap text-center md:text-left px-8 md:px-4 lg:px-8">
                        {userLogged?.Events.map((event) => (
                          <CardReservas
                            key={event.id}
                            eventId={event.id}
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
                  </div>
                  <div class=" min-h-screen rounded-lg bg-gray-dark lg:col-span-2">
                    <div class=" mt-4 mb-4 items-center">
                      <span class="text-xl font-semibold mr-2 ">
                        Mis Creditos
                      </span>
                      <button>
                        <MdCreditScore color="white" className="h-6 w-6" />
                      </button>
                    </div>
                    <div className=" bg-black rounded-lg min-h-screen mx-4 my-4 px-2 py-3">
                      <div class="flex flex-wrap text-center md:text-left px-8 md:px-4 lg:px-8">
                        {userLogged?.purchases.map((purchase) => (
                          <CardCompras
                            key={purchase.orderId}
                            description={purchase.item.description}
                            createdAt={purchase.createdAt}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default UserProfile;