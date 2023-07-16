import { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Alert from "@mui/material/Alert";
import Header from "../../adminComponentes/Header";
import axios from "axios";



const initialValues = {
  firstName: "",
  lastName: "",
  profilePicture: "",
  description: "",
  education: "",
  workExperience: "",
  activities: [],
};



const userSchema = yup.object().shape({
  firstName: yup.string().required("El Nombre del profesor no puede estar Vacío"),
  lastName: yup.string().required("El Apellido del profesor no puede estar Vacío"),
  profilePicture: yup.string().required("Debe seleccionar un imagen para el profesor"),
  description: yup.string().required("La descripción no puede ser un campo vacío"),
  education: yup.string().required("La educación no puede ser un campo vacío"),
  workExperience: yup.string().required("La experiencia no puede ser un campo vacío"),
  activities: yup
    .array()
    .required("Requerido")
    .min(1, "Debe seleccionar al menos una actividad"),
});

const CreateCoach= () => {
  const [response, setResponse] = useState("");
  const [activitiesBack, setActivitiesBack] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  

  const handleReset = (values) => {
    values = {
      firstName: "",
      lastName: "",
      profilePicture: "",
      description: "",
      education: "",
      workExperience: "",
      activities: [],
    };
    return values;
  };

  const handleFormSubmit = async (values, { resetForm }) => {
   
    await axios
      .post("/coaches", values)
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
      }
      );
     
    resetForm({
      values: {
        firstName: "",
        lastName: "",
        profilePicture: "",
        description: "",
        education: "",
        workExperience: "",
        activities: [],
      },
    });
  };

  const handleImageUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gym-go"); 
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/gym-go/image/upload",
        formData
      );
      const imageURL = response.data.secure_url;
      setSelectedImage(imageURL);
      setFieldValue("profilePicture", imageURL); // Actualiza el valor de profilePicture en Formik
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
    }
  };

  
  


  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await axios.get("/activities");
        const activitiesData = response.data;
        const activeActivities = activitiesData?.filter(
          (activity) => activity.isActive === true
        );
        setActivitiesBack(activeActivities);
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
      }
    };

    getActivities();
  }, [selectedImage]);

  return (
    <Box m="20px">
      <Header title="CREAR PROFESOR" subtitle="Crea un nuevo Profesor" />
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
          setFieldValue,
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
                Profesor creado de manera exitosa!
              </Alert>
            ) : (
              <Alert
                variant="filled"
                severity="error"
                onClose={(values) => {
                  setResponse("");
                }}
              >
                Hubo un error al crear el profesor
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
                  label="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Apellido"
                  maxRows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Descripción"
                  maxRows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Eduación"
                  maxRows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.education}
                  name="education"
                  error={!!touched.education && !!errors.education}
                  helperText={touched.education && errors.education}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Experiencia Previa"
                  maxRows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.workExperience}
                  name="workExperience"
                  error={!!touched.workExperience && !!errors.workExperience}
                  helperText={touched.workExperience && errors.workExperience}
                  sx={{ gridColumn: "span 12" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 12" }}
                >
                  <InputLabel>Actividades</InputLabel>
                  <Field
                    label="Actividades"
                    as={Select}
                    multiple
                    name="activities"
                    labelId="activities-label"
                    id="activities"
                    value={values.activities}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.activities && !!errors.activities}
                  >
                    {activitiesBack.map((activity) => (
                      <MenuItem key={activity.id} value={activity.title}>
                        {activity.title}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.activities && errors.activities && (
                    <Box mt={1} color="red">
                      {errors.activities}
                    </Box>
                  )}
                </FormControl>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ gridColumn: "span 6" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />

                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Imagen seleccionada"
                      style={{
                        maxWidth: "150px",
                        marginTop: "0px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="end"
                mt="20px"
                sx={{ maxWidth: "50%" }}
              >
                <Button type="submit" color="secondary" variant="contained">
                  Crear Profesor
                </Button>
              </Box>
            </Box>
            {/* Agregamos un console.log para mostrar los valores */}
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateCoach;
