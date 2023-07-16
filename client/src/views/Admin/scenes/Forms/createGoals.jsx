import {useState} from 'react'
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Alert from "@mui/material/Alert";
import Header from "../../adminComponentes/Header";
import axios from 'axios';



const initialValues = {
  name: "",
  description: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("Requerido"),
  description: yup.string().required("Requerido"),
});

const CreateGoals = () => {
  const [response, setResponse] = useState('')
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleReset = (values) => {
    values = { name: "", description: "" };
    return values;
  };

  const handleFormSubmit = async (values, {resetForm}) => {
    await axios.post('/goals', values)
    .then((response) => {setResponse(response.statusText);})
    .catch((error) => {if(error.response){setResponse(error.response.data)} else if(error.request){setResponse(error.request)} else {setResponse(error.message)}}  )
    resetForm({values:{name: "", description: "" }})
  };

  return (
    <Box m="20px">
      <Header title="CREAR OBJETIVOS" subtitle="Crea un nuevo Objetivo" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
            {!response ? undefined : response === "Created" ? (
              <Alert
                variant="filled"
                icon={<ThumbUpOffAltIcon fontSize="inherit" />}
                onClose={(values) => {
                  setResponse("");
                }}
              >
                El Objetivo se creo exitosamente!
              </Alert>
            ) : (
              <Alert
                variant="filled"
                severity="error"
                onClose={(values) => {
                  setResponse("");
                }}
              >
                Hubo un error
              </Alert>
            )}

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="30px"
            >
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nombre del Objetivo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 6", width: "600px" }}
                />
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Descripción"
                  multiline
                  maxRows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 6" }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="end"
                mt="20px"
                sx={{ maxWidth: "50%" }}
              >
                <Button type="submit" color="secondary" variant="contained">
                  Crear Objetivo
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateGoals;
