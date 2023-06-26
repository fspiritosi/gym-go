import { GET_ACTIVITIES, GET_ACTIVITIE_NAME } from "./actions";

const initialState = {
    activities: [],
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
    }

}

export default rootReducer;