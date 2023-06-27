import { GET_ACTIVITIES, GET_ACTIVITIE_NAME,GET_DETAILS_ID } from "./actions";

const initialState = {
    activities: [],detail:[]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            }

        case GET_ACTIVITIE_NAME:
            return {
                ...state,
                activities: action.payload
            }

        default:
            return { ...state };

         case GET_DETAILS_ID:
            return{
                ...state,
                detail: action.payload
            }
        
    }

}

export default rootReducer;