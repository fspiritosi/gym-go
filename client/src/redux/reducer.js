import {
  GET_ACTIVITIES,
  GET_ACTIVITIE_NAME,
  GET_DETAILS_ID,
  ORDER_BY_NAME,
  FILTER_BY_DIFFICULTY,
  GET_GOALS,
  FILTER_BY_GOALS,
  GET_COACHES,
  GET_CLASSES,
  PUT_EVENTS,
  FILTER_BY_TITLE,
  FILTER_BY_START_TIME,
  FILTER_BY_DATE,
  FILTER_BY_COACH_NAME,
  GET_EVENTS,
  GET_USERLOGGED,
  GET_CLASS_NAME,
  CLEAR_FILTERS,
  GET_REVIEWS,
} from "./actions";

const initialState = {
  activities: [],
  detail: [],
  allActivities: [],
  goals: [],
  coaches: [],
  classes: [],
  allClasses: [],
  events: [],
  userLogged: [],
  reviews: [],
};

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

    // Filtro por dificultad
    case FILTER_BY_DIFFICULTY:
      const { allClasses: allDifficultyClasses } = state;
      const selectedDifficulty = action.payload;
      let diffFiltered = [];

      if (selectedDifficulty.length === 0) {
        diffFiltered = allDifficultyClasses;
      } else {
        diffFiltered = allDifficultyClasses.filter((el) =>
          selectedDifficulty.includes(el.difficulty)
        );
      }

      return {
        ...state,
        classes: diffFiltered,
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
      const { allActivities: allActivitiesGoals } = state;
      const selectedGoals = action.payload;

      if (selectedGoals.includes("all")) {
        return {
          ...state,
          activities: allActivitiesGoals,
        };
      }

      const goalFiltered = allActivitiesGoals.filter((el) =>
        el.Goals.some((goal) => selectedGoals.includes(goal))
      );
      console.log("Estado filtrado:", goalFiltered);
      return {
        ...state,
        activities: goalFiltered,
      };

    case GET_COACHES:
      return {
        ...state,
        coaches: action.payload,
      };

    case GET_CLASSES:
      return {
        ...state,
        classes: action.payload,
        allClasses: action.payload,
      };

    case PUT_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    case GET_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        reviews: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
