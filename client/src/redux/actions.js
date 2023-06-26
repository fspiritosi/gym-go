import axios from "axios";

export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITIE_NAME = "GET_ACTIVITIE_NAME"

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

export function searchActivitieName(title) {
    title = title.toLowerCase();
    return async function (dispatch) {
        try {
            const infoActivitieName = await axios.get("/activities?title=" + title);
            return dispatch({
                type: GET_ACTIVITIE_NAME,
                payload: infoActivitieName.data,
            });
        } catch (error) {
            return alert("Activitie Not Found");
        }
    };
}