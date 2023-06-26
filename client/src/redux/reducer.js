import { GET_ACTIVITIES } from "./actions";

const initialState = { 
    activities:[],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            }



        default:
            return { ...state };
    }

}

export default rootReducer;