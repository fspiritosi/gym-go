import axios from "axios";

export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITIE_NAME = "GET_ACTIVITIE_NAME"
export const GET_DETAILS_ID ='GET_DETAILS_ID'

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

export function searchActivitieName(title) {
    title = title.toLowerCase();
    return async function (dispatch) {
        try {
            const infoActivitieName = await axios.get("/activities?title=" + title);
            dispatch({
                type: GET_ACTIVITIE_NAME,
                payload: infoActivitieName.data,
            });
        } catch (error) {
            return alert("Activitie Not Found");
        }
    };
};

export function getDetails(id){
    return async function(dispatch){
        try{
            const json = await axios.get(`/activities/${id}`  )
        return dispatch({type:GET_DETAILS_ID , payload: json.data,})
        }catch(error){
            console.log(error)
        }   
    }
}
