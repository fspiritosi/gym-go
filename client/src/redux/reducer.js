import { GET_ACTIVITIES, GET_ACTIVITIE_NAME, GET_DETAILS_ID, ORDER_BY_NAME, FILTER_BY_DIFFICULTY, GET_GOALS } from "./actions";

const initialState = {
    activities: [], detail: [], allActivities: [], goals: []
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
        const { allActivities } = state;
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
        return{
            ...state,
            goals: action.payload
        }

      default:
        return { ...state };
    }

}

export default rootReducer;