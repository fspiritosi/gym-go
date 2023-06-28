import axios from "axios";

export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITIE_NAME = "GET_ACTIVITIE_NAME"
export const GET_DETAILS_ID ='GET_DETAILS_ID'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const FILTER_BY_DIFFICULTY = 'FILTER_BY_DIFFICULTY'
export const GET_GOALS = 'GET_GOALS'

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
        // try {
        //     const infoActivitieName = await axios.get("/activities?title=" + title);
        //     return dispatch({
        //         type: GET_ACTIVITIE_NAME,
        //         payload: infoActivitieName.data,
        //     });
        // } catch (error) {
        //     alert("Prueba");
        // }
        try {
            const infoActivitieName = await axios.get("/activities?title=" + title);
            const activities = infoActivitieName.data;

            if (activities.length === 0) {
                alert("Activity Not Found");
                dispatch(getActivities());
            }

            return dispatch({
                type: GET_ACTIVITIE_NAME,
                payload: activities,
            });
        } catch (error) {
            console.log(error);
            dispatch(getActivities());
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

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload,
    }
};

export function filterByDifficulty(payload) {
    return {
        type: FILTER_BY_DIFFICULTY,
        payload,
    }
}

export const getGoals = () => {
  return async function (dispatch) {
    const backGoals = await axios.get("/goals");
    const goals = backGoals.data;
    dispatch({
      type: GET_GOALS,
      payload: goals,
    });
  };
};

