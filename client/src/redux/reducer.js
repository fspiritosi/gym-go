

import { GET_ACTIVITIES, GET_ACTIVITIE_NAME, GET_DETAILS_ID, ORDER_BY_NAME, FILTER_BY_DIFFICULTY, GET_GOALS, FILTER_BY_GOALS, GET_COACHES, GET_CLASSES, GET_EVENTS, PUT_EVENTS } from "./actions";


const initialState = {
  activities: [],
  detail: [],
  allActivities: [],
  goals: [],
  coaches: [],
  classes: [],
  putEvents: [],
  allEvents:[]

}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case GET_ACTIVITIE_NAME:
      return {
        ...state,
        activities: action.payload,
      };

    case ORDER_BY_NAME:
      const isAscending = action.payload === "a";
      const sortedActivities = [...state.activities].sort((a, b) => {
        if (a.title > b.title) return isAscending ? 1 : -1;
        if (a.title < b.title) return isAscending ? -1 : 1;
        return 0;
      });
      return {
        ...state,
        activities:
          action.payload === "all" ? state.allActivities : sortedActivities,
      };

    case FILTER_BY_DIFFICULTY:
      const { allActivities } = state; // Cambiado a desestructuración
      const diffToFilter = action.payload;
      let diffFiltered = allActivities;
      if (diffToFilter !== "diff") {
        diffFiltered = allActivities.filter(
          (el) => el.difficulty === diffToFilter
        );
        if (diffFiltered.length === 0) {
          diffFiltered = allActivities;
        }
      }
      return {
        ...state,
        activities:
          action.payload === "diff" ? state.allActivities : diffFiltered,
      };

    case GET_DETAILS_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_GOALS:
      return {
        ...state,
        goals: action.payload,
      };

    case FILTER_BY_GOALS:
      const { allActivities: allActivitiesGoals } = state; // Cambiado a desestructuración
      const goalToFilter = action.payload;
      let goalFiltered = allActivitiesGoals;

      if (goalToFilter !== "all") {
        goalFiltered = goalFiltered.filter(
          (el) => el.Goals.includes(goalToFilter.toLowerCase()));
        if (goalFiltered.length === 0) {
          goalFiltered = allActivitiesGoals;
        }
      }
      return {
        ...state,
        activities:
          action.payload === "all" ? state.allActivities : goalFiltered,
        // goals: action.payload
      }; //Se corrigio esta funcion 

    case GET_COACHES: //En espera de la Ruta 
      return {
        ...state,
        coaches: action.payload,
      };

    case GET_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };

    case PUT_EVENTS:
      return {
        ...state,
        putEvents: action.payload,
      };

    case GET_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
      };

    default:
      return { ...state };
  }
};



export default rootReducer;

