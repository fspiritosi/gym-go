import { Box, Button, TextField, Select, InputLabel, OutlinedInput } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../adminComponentes/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem } from "react-pro-sidebar";

const initialValues = {
        ActivityId: "",
        difficulty: "",
        recurringPattern: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        quota: "",
        CoachId:'',
}

const classesShema = yup.object().shape({
    ActivityId: yup.string().required('Debes elegir una Actividad para crear una clase'),
    difficulty: yup.string().required('Elige una dificultad'),
    recurringPattern: yup.string().required('selecciona la frecuencia de la clase'),
    startDate: yup.date().required(),
    endDate: yup.date(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),
    quota: yup.number().required('debes elegir el cupo de la clase'),
    CoachId: yup.string().required()
})


const ClassesForm = () => {
    const [activities, setActivities] = useState([])
    const [titleActivitie, setTitleActivitie] = useState([])
     const isNonMobile = useMediaQuery("(min-width:600px)");
     const handleFormSubmit = (values, errors) => {
       console.log(values);
       console.log(errors)
     };

     const getActivities = async () => {
        const activitiesData = await axios.get("/activities");
        setActivities(activitiesData.data);
     }
     useEffect( () => {
        getActivities()
     }, [])

   
     return (
       <Box>
         <Header title="CREAR CLASE" subtitle="Crea una nueva Clase" />
         <Formik
           onSubmit={handleFormSubmit}
           initialValues={initialValues}
           validationSchema={classesShema}
         >
           {({
             values,
             errors,
             touched,
             handleBlur,
             handleChange,
             handleSubmit,
           }) => (
             <form onSubmit={handleSubmit}>
               <Box
                 display="grid"
                 gap="30px"
                 gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                 sx={{
                   "& > div": {
                     gridColumn: isNonMobile ? undefined : "span 4",
                   },
                 }}
               >
                <InputLabel id="actividades">Actividad</InputLabel>
                 <Select
                    labelId="actividades"
                    id="activitieSelect"
                    multiple
                    onBlur={handleBlur}
                    onChange={handleChange}
                    input={<OutlinedInput label='Actividades'/>}
                    MenuProps={activities}
                    value={activities}
                    name="ActivityId"
                    error={!!touched.ActivityId && !!errors.ActivityId}                 helperText={touched.ActivityId && errors.ActivityId}
                    sx={{ gridColumn: "span 2" }}
                 >
                   {/* <MenuItem value=''>Seleccionar Actividad</MenuItem> */}
                   {activities?.map((act) => (
                     <MenuItem name="ActivityId" key={act.id} value={act.id}>
                       {act.title}
                     </MenuItem>
                   ))}
                 </Select>
               </Box>
               <button type="submit">Crear Clase</button>
             </form>
           )}
         </Formik>
       </Box>
     );
}

export default ClassesForm;