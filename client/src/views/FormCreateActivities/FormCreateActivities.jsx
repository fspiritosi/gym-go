import React, {useState} from 'react'
// import { Formik, useFormik } from 'formik'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import styles from './FormCreateActivities.module.css'
import CludinatyUploadComponent from './CludinatyUploadComponent'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const validationSubmit = Yup.object({
  title: Yup.string().min(5).max(25).required('Required'),
  description: Yup.string().min(3).required('Required'),
  goals: Yup.array().of(Yup.string()).required('Select almost one'),
  difficulty: Yup.string(),
})

const simulateGoals = ['resistencia', 'cardio', 'masa muscular', 'perder peso']

function FormCreateActivities() {

  
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    image: [],
    goals: [],
    difficulty: "",
  });

  //const [uploadingImage, setUploadingImage] = useState(true)

  const saveImage = (e) => {
    setActivity({ ...activity, image: [...activity.image ,e.target.value] });
    console.log('desde SaveImg',activity)
  }

  const handleSubmit = async(val) => {

    await axios.post("/activities", activity);
    
    
  }
  console.log('desde state',activity)

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        goals: [],
        image: [],
        difficulty: "",
      }}
      onSubmit={async (values) => {
        setActivity({
          ...activity,
          title: values.title,
          description: values.description,
          goals: values.goals,
          difficulty: values.difficulty,
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
        difficulty: "",
      }}
    >
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Activity Title</label>
          <Field name="title" />
          <ErrorMessage name="title" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Activity Description</label>
          <Field name="description" as="textarea" cols="80" rows="8" />
          <ErrorMessage name="description" />
        </div>

        <div className={styles.inputContainer}>
          <Field as="select" name="difficulty">
            <option value="">Select Difficulty</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </Field>
        </div>
        <div className={styles.goalsTitle} id="checkbox-group">
          Goals
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
          <label htmlFor="title">Images</label>
          <CludinatyUploadComponent />
          <img id="uploadedimage" src=""></img>
          <button
            className={styles.btnSave}
            type="button"
            id="image"
            onClick={(e) => saveImage(e)}
          >
            Save
          </button>
          <ErrorMessage name="image" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
  
}

export default FormCreateActivities