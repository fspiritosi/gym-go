import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITIE_NAME = "GET_ACTIVITIE_NAME"
export const GET_DETAILS_ID = 'GET_DETAILS_ID'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const FILTER_BY_DIFFICULTY = 'FILTER_BY_DIFFICULTY'
export const GET_GOALS = 'GET_GOALS'
export const GET_COACHES = 'GET_COACHES'

//All Activities
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

//Busqueda de Actividades
export function searchActivitieName(title) {
    title = title.toLowerCase();
    return async function (dispatch) {
        try {
            const infoActivitieName = await axios.get(`/activities?title=${title}`);
            const activities = infoActivitieName.data;
            if (activities.length === 0) {
                toast.error("Actividad no encontrada");
            }else{
            dispatch({
                type: GET_ACTIVITIE_NAME,
                payload: activities,
            });
        }
        } catch (error) {
            console.log(error);
        }
    };
};

//Detalle de Actividades
export function getDetails(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/activities/${id}`)
            return dispatch({ type: GET_DETAILS_ID, payload: json.data, })
        } catch (error) {
            console.log(error)
        }
    }
}
//Ordenar Activities por name
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload,
    }
};

//Filtrar por Dificultad
export function filterByDifficulty(payload) {
    return {
        type: FILTER_BY_DIFFICULTY,
        payload,
    }
}

//All Goals
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

//All Coaches **En espera de la Ruta
export const getCoaches = () => {
    return async function (dispatch) {
        const backCoaches = await axios.get("/coaches");
        const coaches = backCoaches.data;
        dispatch({
            type: GET_COACHES,
            payload: coaches,
        });
    };
};