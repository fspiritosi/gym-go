import React, {useState} from 'react'
// import { Formik, useFormik } from 'formik'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import styles from './FormCreateActivities.module.css'
import CludinatyUploadComponent from './CludinatyUploadComponent'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const validationSubmit = Yup.object({
  title: Yup.string().min(5).max(25).required('Required'),
  description: Yup.string().min(3).required('Required'),
  goals: Yup.array().of(Yup.string()).required('Select almost one'),
  difficulty: Yup.string(),
})

const simulateGoals = ['resistencia', 'cardio', 'masa muscular', 'perder peso']

function FormCreateActivities() {
  const navigate = useNavigate();
  
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    image: [],
    goals: [],
  });

  //const [uploadingImage, setUploadingImage] = useState(true)

  const saveImage = (e) => {
    setActivity({ ...activity, image: [...activity.image ,e.target.value] });
    console.log('desde SaveImg',activity)
  }

  const handleSubmit = async (val) => {
    await axios.post("/activities", val)
    .then(res => navigate(`/activity-detail/${res.data.id}`))
    .catch(res => alert(res));
  }
  console.log('desde state',activity)

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        goals: [],
        image: [],
      }}
      onSubmit={async (values) => {
        setActivity({
          ...activity,
          title: values.title,
          description: values.description,
          goals: values.goals,
        });
        console.log("Desde On submit", activity);
        await handleSubmit(activity);
      }}
      validationSchema={validationSubmit}
      onReset={{
        title: "",
        description: "",
        goals: [],
        image: [],
      }}
    >
      <div className={styles.container}>
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Actividad</label>
          <Field name="title" />
          <ErrorMessage name="title" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Descripción</label>
          <Field name="description" as="textarea" cols="80" rows="8" />
          <ErrorMessage name="description" />
        </div>


        <div className={styles.goalsTitle} id="checkbox-group">
          Objetivos
        </div>
        <div className={styles.checkGroup} role="group" aria-labelledby="checkbox-group">
          {simulateGoals?.map((goal, index) => (
            <div className={styles.checkContainer}>
              <Field type="checkbox" key={index} name="goals" value={goal} />
              <p className={styles.labelCheck}>{goal}</p>
            </div>
          ))}
        </div>

        <div className={styles.imageContainer}>
          <label htmlFor="title">Imagenes</label>
          <CludinatyUploadComponent />
          <img id="uploadedimage" src=""></img>
          <button
            className={styles.btnSave}
            type="button"
            id="image"
            onClick={(e) => saveImage(e)}
            >
            Guardar Imagen
          </button>
          <ErrorMessage name="image" />
        </div>

        <button type="submit">Crear Actividad</button>
      </Form>
      </div>
    </Formik>
  );
  
}

export default FormCreateActivities