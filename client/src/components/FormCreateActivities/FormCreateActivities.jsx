import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import styles from './FormCreateActivities.module.css'
import CludinatyUploadComponent from './CludinatyUploadComponent'

const validationSubmit = Yup.object({
  title: Yup.string().min(5).max(25).required('Required'),
  description: Yup.string().min(3).required('Required'),
  goals: Yup.array().of(Yup.string()),
  dificulty: Yup.string(),
})

const simulateGoals = ['resistencia', 'cardio', 'masa muscular', 'perder peso']


function FormCreateActivities() {

  const [activity, setActivity] = useState({
    title: "",
    description: "",
    image: [],
    goals: [],
    dificulty: "",
  });

  //const [uploadingImage, setUploadingImage] = useState(true)

  const saveImage = (e) => {
    setActivity({ ...activity, image: [...activity.image ,e.target.value] });
    //setUploadingImage()
  }

  console.log(activity)

  return (    
    <Formik
      initialValues={{
        title: "",
        description: "",
        goals: [],
        dificulty: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setActivity({
          ...activity,
          title: values.title,
          description: values.description,
          goals: values.goals,
          dificulty: values.dificulty,
        });
        setSubmitting(false);
      }}
      validateOnChange={true}
      validationSchema={validationSubmit}
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
          <label htmlFor="title">Images</label>
          <CludinatyUploadComponent />
          <img id="uploadedimage" src=""></img>
          <button type="button" id="image" onClick={(e) => saveImage(e)}>
                Save
          </button>
      
          <ErrorMessage name="image" />
        </div>

        <div className={styles.inputContainer}>
          <Field as="select" name="dificulty">
            <option value="">Select Dificulty</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </Field>
        </div>
        <div id="checkbox-group">Goals</div>
        <div role="group" aria-labelledby="checkbox-group">
          {simulateGoals?.map((goal, index) => (
            <label>
              <Field type="checkbox" name="goals" value={goal} />
              {goal}
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
  
}

export default FormCreateActivities