import axios from "axios";

export const GET_ACTIVITIES = "GET_ACTIVITIES";

export const getActivities = () => {
    return async function (dispatch) {
        const back = await axios.get("/activities");
        const activities = back.data;
        dispatch({
            type: GET_ACTIVITIES,
            payload: activities,
        });
    };
};