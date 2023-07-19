


import { GET_ACTIVITIES, GET_ACTIVITIE_NAME, GET_DETAILS_ID, ORDER_BY_NAME, FILTER_BY_DIFFICULTY, GET_GOALS, FILTER_BY_GOALS, GET_COACHES, GET_CLASSES,  PUT_EVENTS, FILTER_BY_TITLE, FILTER_BY_START_TIME, FILTER_BY_DATE, FILTER_BY_COACH_NAME, GET_EVENTS, GET_USERS, GET_CLASS_NAME } from "./actions";



const initialState = {
  activities: [],
  detail: [],
  allActivities: [],
  goals: [],
  coaches: [],
  classes: [],
  allClasses: [],
  events: [],
  users: []
  // allEvents:[],

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
      console.log('Estado filtrado:', goalFiltered);
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
        events: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    // Se adapto a la data que se recibe de classes 
    case FILTER_BY_TITLE:
      const { allClasses: allClassesTitle } = state;
      const selectedClassesNames = action.payload;

      if (selectedClassesNames.includes("")) {
        return {
          ...state,
          classes: allClassesTitle,
        };
      }
      const classesFiltered = allClassesTitle.filter((classItem) =>
      selectedClassesNames.includes(classItem.Activity.title)
      );
      console.log('Estado filtrado:', classesFiltered);
      return {
        ...state,
        classes: classesFiltered,
      };


    case FILTER_BY_START_TIME:
      const { allClasses: allClassesStartTime } = state;
      const startTimeToFilter = action.payload;

      if (startTimeToFilter.includes("all")) {
      return {
        ...state,
        activities: startTimeFiltered,
      };
      }
      const startTimeFiltered = allClassesStartTime.filter((classItem) =>
        startTimeToFilter.includes(classItem.startTime)
        );
        console.log('Estado filtrado:', startTimeFiltered);
        return {
          ...state,
          classes: startTimeFiltered,
        };

    case FILTER_BY_DATE:
      const { allClasses: allClassesStartDate } = state;
      const startDateToFilter = action.payload;

      if (startDateToFilter.includes("all")) {
      return {
        ...state,
        activities: startDateFiltered,
      };
      }
      const startDateFiltered = allClassesStartDate.filter((classItem) =>
      startDateToFilter.includes(classItem.startDate)
        );
        console.log('Estado filtrado:', startDateFiltered);
        return {
          ...state,
          classes: startDateFiltered,
        };

    // Filtrar por name de profesor ?
    case FILTER_BY_COACH_NAME:
      const { allClasses: allClassesCoaches } = state;
      const selectedCoachNames = action.payload;

      if (selectedCoachNames.includes("")) {
        return {
          ...state,
          classes: allClassesCoaches,
        };
      }
      const coachFiltered = allClassesCoaches.filter((classItem) =>
      selectedCoachNames.includes(`${classItem.Coach.firstName} ${classItem.Coach.lastName}`)
      )
      console.log('Estado filtrado:', coachFiltered);
      return {
        ...state,
        classes: coachFiltered,
      };


    // Classes por name title activity
    case GET_CLASS_NAME:
      return {
        ...state,
        classes: action.payload,
      };

    default:
      return { ...state };
  }
};



export default rootReducer;

