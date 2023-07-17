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
export const GET_COACHES = 'GET_COACHES'
export const GET_CLASSES = "GET_CLASSES";
export const PUT_EVENTS = "PUT_EVENTS";
export const FILTER_BY_COACH = "FILTER_BY_COACH";
export const FILTER_BY_TITLE = "FILTER_BY_TITLE";
export const FILTER_BY_START_TIME = "FILTER_BY_START_TIME";
export const FILTER_BY_DATE = "FILTER_BY_DATE";
export const FILTER_BY_COACH_NAME = "FILTER_BY_COACH_NAME";
export const GET_EVENTS = "GET_EVENTS";
export const GET_USERS = "GET_USERS";



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
      const activity = json.data
      return dispatch({ type: GET_DETAILS_ID, payload: activity });
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


export function filterByGoals(selectedGoals) {
  return {
    type: FILTER_BY_GOALS,
    payload: selectedGoals,
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
export const putEvents = (id, userId) => {
  return async function (dispatch) {
    const backEvents = await axios.put(`/events/${id}`, { userId });
    const events = backEvents.data;
    dispatch({
      type: PUT_EVENTS,
      payload: events,
    });
    return backEvents;
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

//get Users
export const getUsers = () => {
  return async function (dispatch) {
    const backUsers = await axios.get("/users");
    const users = backUsers.data;
    dispatch({
      type: GET_USERS,
      payload: users,
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