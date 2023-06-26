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
  goals: Yup.array().of(Yup.string()),
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
    difficulty: "",
  });

  //const [uploadingImage, setUploadingImage] = useState(true)

  const saveImage = (e) => {
    setActivity({ ...activity, image: [...activity.image ,e.target.value] });
    console.log('desde SaveImg',activity)
  }

  const handleSubmit = async (val) => {
    await axios.post("/activities", activity)
    .then(res => navigate(`activity-detail/${res.data.id}`))
    .catch(res => alert(res));
  };
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
        await handleSubmit(values);
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
      <Form>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Activity Title</label>
          <Field name="title" />
          <ErrorMessage name="title" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Activity Description</label>
          <Field name="description" as="textarea" />
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
        <div id="checkbox-group">Goals</div>
        <div role="group" aria-labelledby="checkbox-group">
          {simulateGoals?.map((goal, index) => (
            <label>
              <Field type="checkbox" key={index} name="goals" value={goal} />
              {goal}
            </label>
          ))}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="title">Images</label>
          <CludinatyUploadComponent />
          <img id="uploadedimage" src=""></img>
          <button type="button" id="image" onClick={(e) => saveImage(e)}>
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