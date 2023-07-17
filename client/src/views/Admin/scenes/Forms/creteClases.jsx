import { Box, TextField, Button} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../adminComponentes/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem  from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const initialValues = {
        ActivityId: '',
        difficulty: "",
        recurringPattern: "",
        startDate: '',
        endDate: "",
        startTime: "",
        endTime: "",
        quota: "",
        CoachId:'',
}

const classesShema = yup.object().shape({
  ActivityId: yup
    .string()
    .required("Debes elegir una Actividad para crear una clase"),
  difficulty: yup.string().required("Elige una dificultad"),
  recurringPattern: yup
    .string()
    .required("selecciona la frecuencia de la clase"),
  startDate: yup.date().required("Selecciona una fecha de inicio"),
  endDate: yup
    .date()
    .when("startDate", (startDate, schema) => {
      const startDateInDate = new Date(startDate);
      return schema.test({
        name: "is-greater",
        exclusive: true,
        message: "El valor debe ser mayor al de startDate",
        test: function (value) {
          const endDateInDate = new Date(value);
          const startDateValue = this.resolve(startDateInDate);
          if (!startDateValue || !value) {
            return true; // La validación pasa si uno de los valores es null o undefined
          }
          return endDateInDate > startDateValue;
        },
      });
    }).nullable(),
  startTime: yup.string().required(),
  endTime: yup.string().required().when('startTime', (startTime, schema) => {
    return schema.test({
      name: "is-greater",
        exclusive: true,
        message: "El valor debe ser mayor al de Hora de Inicio",
      test: function (value) {
        const startTimeValue = this.parent.startTime;
        return !startTimeValue || !value || value > startTimeValue;
      }
    })
  }),
  quota: yup.number().required("debes elegir el cupo de la clase").positive('Cupo debe ser un valor positivo').integer(),
  CoachId: yup
    .string()
    .required("Debes seleccionar un Profesor para crear una Clase"),
});


const ClassesForm = () => {
    const [activities, setActivities] = useState([])
    const [selectActivity, setSelectActivity] = useState({})
    const [response, setResponse] = useState("");

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleReset = (values) => {
      values = {
        ActivityId: "",
        difficulty: "",
        recurringPattern: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        quota: "",
        CoachId: "",
      };
      return values;
    };

    const handleFormSubmit = async (values, {resetForm}) => {
      
      await axios
        .post("/classes", values)
        .then((response) => {
          
          setResponse(response.statusText);
        })
        .catch((error) => {
          if (error.response) {
            setResponse(error.response.data);
          } else if (error.request) {
            setResponse(error.request);
          } else {
            setResponse(error.message);
          }
        });
      
        resetForm({
          values: {
            ActivityId: "",
            difficulty: "",
            recurringPattern: "",
            startDate: "",
            endDate: '',
            startTime: "",
            endTime: "",
            quota: "",
            CoachId: "",
          },
        });
    };

     const selectActivitie = (values) => {
      const selectedActivity = activities.find((act) => act.id === values.target.value);
      setSelectActivity(selectedActivity);
     }

     useEffect( () => {
       const getActivities = async () => {
         try {
           const response = await axios.get("/activities");
           const activitiesData = response.data;
           const activeActivities = activitiesData?.filter((activity) => 
            activity.isActive === true
           )
           setActivities(activeActivities);
         } catch (error) {
           console.error("Error al obtener las actividades:", error);
         }
       };

       getActivities();
     }, [])

   
     return (
       <Box marginTop="30px">
         <Header title="CREAR CLASE" subtitle="Crea una nueva Clase" />
         <Formik
           onSubmit={handleFormSubmit}
           initialValues={initialValues}
           validationSchema={classesShema}
           onReset={handleReset}
         >
           {({
             values,
             errors,
             touched,
             handleBlur,
             handleChange,
             handleSubmit,
             handleReset,
           }) => (
             <form onSubmit={handleSubmit} onReset={handleReset}>
               {!response ? undefined : response === "Created" || "OK" ? (
                 <Alert
                   variant="filled"
                   icon={<ThumbUpOffAltIcon fontSize="inherit" />}
                   onClose={(values) => {
                     setResponse("");
                   }}
                 >
                   La Clase se creo exitosamente!
                 </Alert>
               ) : (
                 <Alert
                   variant="filled"
                   severity="error"
                   onClose={(values) => {
                     setResponse("");
                   }}
                 >
                   Hubo un error al Crear la Clase
                 </Alert>
               )}
               <Box
                 display="grid"
                 gap="30px"
                 gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                 sx={{
                   "& > div": {
                     gridColumn: isNonMobile ? undefined : "span 1",
                   },
                   margin: "50px",
                 }}
               >
                 <TextField
                   label="Selecciona una Actividad"
                   select
                   value={values.ActivityId}
                   onChange={handleChange}
                   onBlur={selectActivitie}
                   name="ActivityId"
                   error={!!touched.ActivityId && !!errors.ActivityId}
                   helperText={touched.ActivityId && errors.ActivityId}
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 >
                   {activities?.map((act) => (
                     <MenuItem key={act.id} value={act.id}>
                       {act.title}
                     </MenuItem>
                   ))}
                 </TextField>
                 <TextField
                   label="Selecciona una Profesor"
                   select
                   value={values.CoachId}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="CoachId"
                   error={!!touched.CoachId && !!errors.CoachId}
                   helperText={touched.CoachId && errors.CoachId}
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 >
                   {selectActivity?.Coaches?.length ? (
                     selectActivity.Coaches.map((coach) => (
                       <MenuItem key={coach.id} value={coach.id}>
                         {`${coach.firstName} ${coach.lastName}`}
                       </MenuItem>
                     ))
                   ) : (
                     <MenuItem disabled>No hay profesores</MenuItem>
                   )}
                 </TextField>
                 <TextField
                   label="Selecciona un frecuencia para la Clase"
                   select
                   value={values.recurringPattern}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="recurringPattern"
                   error={
                     !!touched.recurringPattern && !!errors.recurringPattern
                   }
                   helperText={
                     touched.recurringPattern && errors.recurringPattern
                   }
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   <MenuItem value={"does not repeat"}>Único</MenuItem>
                   <MenuItem value={"weekly"}>Semanal</MenuItem>
                 </TextField>
                 <TextField
                   label="Selecciona un dificultad para la Clase"
                   select
                   value={values.difficulty}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="difficulty"
                   error={!!touched.difficulty && !!errors.difficulty}
                   helperText={touched.difficulty && errors.difficulty}
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   <MenuItem value={"easy"}>Facil</MenuItem>
                   <MenuItem value={"medium"}>Intermedia</MenuItem>
                   <MenuItem value={"hard"}>Dificil</MenuItem>
                 </TextField>
                 <TextField
                   label="Selecciona el cupo máximo de la clase"
                   type="number"
                   value={values.quota}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="quota"
                   error={!!touched.quota && !!errors.quota}
                   helperText={touched.quota && errors.quota}
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 />
                 <TextField
                   label="Fecha de inicio"
                   type="date"
                   value={values.startDate}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="startDate"
                   error={!!touched.startDate && !!errors.startDate}
                   helperText={touched.startDate && errors.startDate}
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 />
                 {values.recurringPattern === "weekly" ? (
                   <TextField
                     label="Fecha de fin"
                     type="date"
                     value={values.endDate}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     name="endDate"
                     error={!!touched.endDate && !!errors.endDate}
                     helperText={touched.endDate && errors.endDate}
                     sx={{ gridColumn: "span 1" }}
                     InputLabelProps={{
                       shrink: true,
                     }}
                   />
                 ) : (
                   <TextField
                     disabled
                     label="Fecha de fin"
                     type="date"
                     value={values.endDate}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     name="endDate"
                     error={!!touched.endDate && !!errors.endDate}
                     helperText={touched.endDate && errors.endDate}
                     sx={{ gridColumn: "span 1" }}
                     InputLabelProps={{
                       shrink: true,
                     }}
                   />
                 )}
                 <TextField
                   label="Selecciona Hora de Inicio"
                   type="time"
                   value={values.startTime}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="startTime"
                   error={!!touched.startTime && !!errors.startTime}
                   helperText={touched.startTime && errors.startTime}
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 ></TextField>
                 <TextField
                   label="Selecciona Hora de Fin"
                   type="time"
                   value={values.endTime}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="endTime"
                   error={!!touched.endTime && !!errors.endTime}
                   helperText={touched.endTime && errors.endTime}
                   sx={{ gridColumn: "span 1" }}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 ></TextField>
                 <Box
                   display="flex"
                   justifyContent="center"
                   mt="20px"
                   sx={{ gridColumn: "span 3" }}
                 >
                   <Button type="submit" color="secondary" variant="contained">
                     Crear Clase
                   </Button>
                 </Box>
               </Box>
             </form>
           )}
         </Formik>
       </Box>
     );
}

export default ClassesForm;