import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getGoals} from '../../redux/actions'


function FormGoals() {

    const dispatch = useDispatch()

    const goals = useSelector((state) => state.goals)

    useEffect(()=> {
        dispatch(getGoals());
    }, [dispatch])

    const submitData = async (data) => {
        const noRepeatName = () => {
            goals.filter(ele => ele.name !== data.name.toLowerCase())
        }
        if(noRepeatName.length > 0) {
            throw new Error('Name already exist')
            
        }
        const newGoal = {
            name: data.name.toLowerCase(),
            description: data.description
        }
        await axios.post('goals', newGoal)
    }


    const formik = useFormik({
      initialValues: { name: "", description: "" },
      validationSchema: Yup.object({
        name: Yup.string("The field must contain only letters").required(
          "The field is requered"
        ),
        description: Yup.string()
          .min(40, "The field must have at least 40 characters")
          .required("The field is requered"),
      }),
      onSubmit: (values) => {
        submitData(values);
        formik.handleReset()
      },
      onReset: (values) => {
        values.name = "";
        values.description = "";
      },
    });
  return (
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Goal Name</label>
        <input
            id='name'
            name='name' 
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
         />
         {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div>:null}
        <label htmlFor="description">Goal Description</label>
        <textarea 
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}    
        > 
         </textarea>
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div>: null}
        <button type="submit">Create Goal</button>
        <button type="button" onClick={formik.handleReset}>Reset</button>
    </form>
  )
}

export default FormGoals