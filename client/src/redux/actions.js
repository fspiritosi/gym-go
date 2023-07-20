import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITIE_NAME = "GET_ACTIVITIE_NAME";
export const GET_DETAILS_ID = "GET_DETAILS_ID";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_BY_DIFFICULTY = "FILTER_BY_DIFFICULTY";
export const GET_GOALS = "GET_GOALS";
export const FILTER_BY_GOALS = "FILTER_BY_GOALS";
export const GET_COACHES = "GET_COACHES";
export const GET_CLASSES = "GET_CLASSES";
export const PUT_EVENTS = "PUT_EVENTS";
export const FILTER_BY_COACH = "FILTER_BY_COACH";
export const FILTER_BY_TITLE = "FILTER_BY_TITLE";
export const FILTER_BY_START_TIME = "FILTER_BY_START_TIME";
export const FILTER_BY_DATE = "FILTER_BY_DATE";
export const FILTER_BY_COACH_NAME = "FILTER_BY_COACH_NAME";
export const GET_EVENTS = "GET_EVENTS";
export const GET_USERLOGGED = "GET_USERLOGGED";
export const GET_CLASS_NAME = "GET_CLASS_NAME";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const GET_REVIEWS = "GET_REVIEWS";

//All Activities
export const getActivities = () => {
  return async function (dispatch) {
    const backActivitie = await axios.get("/activities");
    const activities = backActivitie.data;
    dispatch({
      type: GET_ACTIVITIES,
      payload: activities,
    });
  };
};

//Busqueda de Actividades
export function searchActivitieName(title) {
  //console.log("se ejecuta activityname")
  title = title.toLowerCase();
  return async function (dispatch) {
    try {
      const infoActivitieName = await axios.get(`/activities?title=${title}`);
      const activities = infoActivitieName.data;
      if (activities.length === 0) {
        toast.error("Actividad no encontrada");
      } else {
        dispatch({
          type: GET_ACTIVITIE_NAME,
          payload: activities,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/activities/${id}`);
      return dispatch({ type: GET_DETAILS_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}
//Ordenar Activities por name
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

//Filtrar por Dificultad
export function filterByDifficulty(payload) {
  return {
    type: FILTER_BY_DIFFICULTY,
    payload,
  };
}

//All Goals
export const getGoals = () => {
  return async function (dispatch) {
    const backGoals = await axios.get("/goals");
    const goals = backGoals.data;
    dispatch({
      type: GET_GOALS,
      payload: goals,
    });
  };
};

export function filterByGoals(payload) {
  return {
    type: FILTER_BY_GOALS,
    payload,
  };
}

//All Coaches
export const getCoaches = () => {
  return async function (dispatch) {
    const backCoaches = await axios.get("/coaches");
    const coaches = backCoaches.data;
    dispatch({
      type: GET_COACHES,
      payload: coaches,
    });
  };
};

//All Classes
export const getClassess = () => {
  return async function (dispatch) {
    const backClasses = await axios.get("/classes");
    const classes = backClasses.data;
    dispatch({
      type: GET_CLASSES,
      payload: classes,
    });
  };
};

//Put Events update
export const putEvents = (id, userId, email) => {
  return async function (dispatch) {
    try {
      // Realizar la solicitud PUT para guardar la compra
      await axios.put(`/events/${id}`, { userId, email });
      // Realizar la solicitud GET para obtener la información actualizada del usuario
      const response = await axios.get(`/users/${userId}`);
      const user = response.data;
      // Actualizar el estado del usuario con los nuevos datos
      dispatch({
        type: GET_USERLOGGED,
        payload: user,
      });
    } catch (error) {
      // Manejar errores si es necesario
    }
  };
};

//get Events
export const getEvents = (id) => {
  return async function (dispatch) {
    const backEvents = await axios.get("/events");
    const events = backEvents.data;
    dispatch({
      type: GET_EVENTS,
      payload: events,
    });
  };
};
//get Reviews
export const getReviews = (currentUser) => {
  let user;
  if (currentUser) {
    user = {
      id: currentUser.id,
      email: currentUser.email,
    };
  }
  return async (dispatch) => {
    await axios
      .get(`/reviews`, user ? { params: user } : null)
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_REVIEWS, payload: data });
      });
  };
};
//post Reviews
export const postReview = (payload) => async (dispatch) => {
  return await axios.post(`/reviews`, payload);
};
//delete Reviews
export const deleteReview = (payload) => async (dispatch) => {
  return await axios.delete(`/reviews`, { data: payload });
};
// Get User Logged In GymGo
export const getUserLogged = (email, username) => {
  return async function (dispatch) {
    await axios
      .get(`/users?email=${email}`)
      .then((response) => {
        const userLogged = response.data;
        dispatch({
          type: GET_USERLOGGED,
          payload: userLogged,
        });
      })
      .catch(async (error) => {
        const response = await axios.post("/users/register", {
          username: username,
          email: email,
        });
        const userLogged = response.data;
        dispatch({
          type: GET_USERLOGGED,
          payload: userLogged,
        });
      });
  };
};

export function filterByCoach(payload) {
  return {
    type: FILTER_BY_COACH,
    payload,
  };
}

export function filterByTitle(payload) {
  return {
    type: FILTER_BY_TITLE,
    payload,
  };
}

export function filterByStartTime(payload) {
  return {
    type: FILTER_BY_START_TIME,
    payload,
  };
}

export function filterByDate(payload) {
  return {
    type: FILTER_BY_DATE,
    payload,
  };
}

export function filterByCoachName(payload) {
  return {
    type: FILTER_BY_COACH_NAME,
    payload,
  };
}

//Busqueda por nombre para Classes
export function searchClassesByName(title) {
  return async function (dispatch) {
    try {
      title = title.toLowerCase();
      const infoClass = await axios.get(`/classes`);
      const classes = infoClass.data.filter((classObj) => {
        const activityTitle = classObj.Activity.title.toLowerCase();
        return activityTitle.includes(title);
      });
      if (classes.length === 0) {
        toast.error("Actividad no encontrada");
      } else {
        dispatch({
          type: GET_CLASS_NAME,
          payload: classes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

//Limpiar filtros en Classes
export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS,
  };
};
