


import { GET_ACTIVITIES, GET_ACTIVITIE_NAME, GET_DETAILS_ID, ORDER_BY_NAME, FILTER_BY_DIFFICULTY, GET_GOALS, FILTER_BY_GOALS, GET_COACHES, GET_CLASSES, FILTER_BY_COACH, PUT_EVENTS, FILTER_BY_TITLE, FILTER_BY_START_TIME, FILTER_BY_DATE, FILTER_BY_COACH_NAME, GET_EVENTS, GET_USERS } from "./actions";



const initialState = {
  activities: [],
  detail: [],
  allActivities: [],
  goals: [],
  coaches: [],
  classes: [],
  putEvents: [],
  allEvents:[],
  users:[]

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

     return {
    ...state,
    activities: goalFiltered,
     };  

   
    case GET_COACHES: //En espera de la Ruta 
      return {
        ...state,
        coaches: action.payload,
      };

      case FILTER_BY_COACH:
        const { allActivities: allActivitiesCoaches } = state;
        const coachToFilter = action.payload;
        let coachFiltered = allActivitiesCoaches;
  
        if (coachToFilter !== "all") {
          coachFiltered = coachFiltered.filter((el) =>
            el.Coach === coachToFilter
          );
          if (coachFiltered.length === 0) {
            coachFiltered = allActivitiesCoaches;
          }
        }
        return {
          ...state,
          activities:
            action.payload === "all" ? state.allActivities : coachFiltered,
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
    
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

   

      case FILTER_BY_TITLE:
        const { allActivities: allActivitiesTitle } = state;
        const titleToFilter = action.payload;
        let titleFiltered = allActivitiesTitle;
  
        if (titleToFilter !== "") {
          titleFiltered = titleFiltered.filter(
            (el) => el.title.toLowerCase().includes(titleToFilter.toLowerCase())
          );
        }
        return {
          ...state,
          activities: titleFiltered,
        };
  
      case FILTER_BY_START_TIME:
        const { allActivities: allActivitiesStartTime } = state;
        const startTimeToFilter = action.payload;
        let startTimeFiltered = allActivitiesStartTime;
  
        if (startTimeToFilter !== "") {
          startTimeFiltered = startTimeFiltered.filter(
            (el) => el.startTime.toLowerCase().includes(startTimeToFilter.toLowerCase())
          );
        }
        return {
          ...state,
          activities: startTimeFiltered,
        };
  
      case FILTER_BY_DATE:
        const { allActivities: allActivitiesDate } = state;
        const dateToFilter = action.payload;
        let dateFiltered = allActivitiesDate;
  
        if (dateToFilter !== "") {
          dateFiltered = dateFiltered.filter((el) => {
            const eventDates = el.date.map((d) => new Date(d));
            const filterDate = new Date(dateToFilter);
            return eventDates.some((eventDate) => eventDate.getTime() === filterDate.getTime());
          });
        }
        return {
          ...state,
          activities: dateFiltered,
        };
  
      case FILTER_BY_COACH_NAME:
        const { allActivities: allActivitiesCoachName } = state;
        const coachNameToFilter = action.payload;
        let coachNameFiltered = allActivitiesCoachName;
  
        if (coachNameToFilter !== "") {
          coachNameFiltered = coachNameFiltered.filter(
            (el) => el.coachName.toLowerCase().includes(coachNameToFilter.toLowerCase())
          );
        }
        return {
          ...state,
          activities: coachNameFiltered,
        };
      
       default:
      return { ...state };
  }
};



export default rootReducer;

