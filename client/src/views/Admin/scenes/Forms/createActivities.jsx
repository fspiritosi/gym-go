import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Alert from "@mui/material/Alert";
import Header from "../../adminComponentes/Header";
import axios from "axios";

const initialValues = {
  title: "",
  description: "",
  image: [],
  goals:[]
};

const userSchema = yup.object().shape({
  title: yup.string().required("El Titulo de la actividad no puede estar Vacío"),
  description: yup
    .string()
    .required("El Descripción no puede estar Vacío"),
  image: yup
    .array()
    .required("Requerido")
    .min(1, "Debe seleccionar una Imagen"),
  goals: yup
    .array()
    .required("Requerido")
    .min(1, "Debe seleccionar al menos un Objetivo"),
});

const CreateActivitie = () => {
  const [response, setResponse] = useState("");
  const [goalsBack, setGoalsBack] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleReset = (values) => {
    values = {
      title: "",
      description: "",
      image: [],
      goals: [],
    };
    return values;
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    await axios
      .post("/activities", values)
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
        title: "",
        description: "",
        image: [],
        goals: [],
      },
    });
  };

  const handleImageUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];
    const imgArr = [];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gym-go");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/gym-go/image/upload",
        formData
      );
      const imageURL = response.data.secure_url;
      const dataField = imgArr.push(imageURL)
      setSelectedImage(imageURL);
      setFieldValue("image", imgArr); // Actualiza el valor de image en Formik
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
    }
  };

  useEffect(() => {
    const getGoals = async () => {
      try {
        const response = await axios.get("/goals");
        const goalsData = response.data;
        const activeGoals = goalsData?.filter(
          (goal) => goal.isActive === true
        );
        setGoalsBack(activeGoals);
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
      }
    };

    getGoals();
  }, [selectedImage]);

  return (
    <Box m="20px">
      <Header title="CREAR ACTIVIDAD" subtitle="Crea una nueva Actividad" />
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
                Actividad creada de manera exitosa!
              </Alert>
            ) : (
              <Alert
                variant="filled"
                severity="error"
                onClose={(values) => {
                  setResponse("");
                }}
              >
                Hubo un error al crear la Actividad
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
                  label="Titulo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
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
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 12" }}
                >
                  <InputLabel>Actividades</InputLabel>
                  <Field
                    label="Objetivos"
                    as={Select}
                    multiple
                    name="goals"
                    labelId="goals-label"
                    id="goals"
                    value={values.goals}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.goals && !!errors.goals}
                  >
                    {goalsBack.map((goal) => (
                      <MenuItem key={goal.id} value={goal.name}>
                        {goal.name}
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
                  Crear Actividad
                </Button>
              </Box>
            </Box>
            {/* Agregamos un console.log para mostrar los valores */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateActivitie;
