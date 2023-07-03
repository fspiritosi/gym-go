import {useEffect} from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch} from "react-redux";
import styles from './FormClasses.module.css'
import axios from 'axios'
import { getActivities } from "../../redux/actions";


function FormClasses() {
    
    const dispatch = useDispatch()

    const allActivities = useSelector((state) => state.allActivities);
    const coaches = useSelector((state) => state.coaches);

    console.log(allActivities)

    const submitData = async (val) => {
        await axios.post("/classes", val);
    }

    useEffect(() => {
        dispatch(getActivities())
    }, [])

    const formik = useFormik({
      initialValues: {
        ActivityId: "",
        difficulty: "",
        recurringPattern: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        quota: "",
        CoachId: "699178ba-99e9-40be-bb84-0c84358fcabb",
      },
      validationSchema: Yup.object({}),
      onSubmit: (values) => {
        console.log(values);
        submitData(values);
        console.log("llego hasta acá");
      },
      onReset: (values) => {
        values.ActivityId = "";
        values.difficulty = "";
        values.recurringPattern = "";
        values.startDate = "";
        values.endDate = "";
        values.startTime = "";
        values.endTime = "";
        values.quota = "";
        values.CoachId = "699178ba-99e9-40be-bb84-0c84358fcabb";
      },
    });

    console.log(formik.values)

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <label htmlFor="">Actividad:</label>
      <select name="ActivityId" id="" onChange={formik.handleChange}>
        <option value="">Seleccionar Actividad</option>
        {allActivities?.map((act) => (
          <option name="ActivityId" key={act.id} value={act.id}>
            {act.title}
          </option>
        ))}
      </select>
      <label htmlFor="">Profesor</label>
      <select name="CoachId" id="" onChange={formik.handleChange}>
        <option value="">Seleccionar Profesor</option>
        {coaches?.map((coach) => (
          <option name="ActivityId" key={coach.id} value={coach.id}>
            {coach.firtName}
          </option>
        ))}
      </select>
      <label htmlFor="">Dificultad</label>
      <select name="difficulty" onChange={formik.handleChange}>
        <option value="">Seleccionar Dificultad</option>
        <option value="easy">Facil</option>
        <option value="medium">Intermedio</option>
        <option value="hard">Dificil</option>
      </select>
      <label htmlFor="">Inicio</label>
      <input
        type="date"
        name="startDate"
        id=""
        onChange={formik.handleChange}
      />
      <label htmlFor="">Fin</label>
      <input type="date" name="endDate" id="" onChange={formik.handleChange} />
      <label htmlFor="">Hora inicio</label>
      <input
        type="time"
        name="startTime"
        id=""
        onChange={formik.handleChange}
      />
      <label htmlFor="">Hora Fin</label>
      <input type="time" name="endTime" id="" onChange={formik.handleChange} />
      <label htmlFor="">Cupo de la Clase</label>
      <input type="number" name="quota" onChange={formik.handleChange} />
      <label htmlFor="">Recurrencia</label>
      <select name="recurringPattern" onChange={formik.handleChange}>
        <option value="">Seleccionar Recurrencia</option>
        <option value="weekly">Semanal</option>
        <option value="does not repeat">Unico</option>
      </select>
      <button type="submit">Crear Clase</button>
    </form>
  );
}

export default FormClasses