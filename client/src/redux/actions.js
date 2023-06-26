import axios from "axios";

export const GET_ACTIVITIES = "GET_ACTIVITIES";

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
