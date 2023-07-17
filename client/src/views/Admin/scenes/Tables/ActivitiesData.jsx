import { Box, Button, Typography,  useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";

import axios from "axios";
import { useEffect, useState } from "react";


import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../adminComponentes/Header";

const Activities = () => {
  const [activities, setActivities] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const changeIsActive = async (id, isActive) => {
      await axios.put(`/activities/${id}`, {isActive});
      getActivities()
    };
  const colums = [
    {
      field: "title",
      headerName: "Titulo",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "image",
      headerName: "Imagen",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { image, title } }) => {
        return (
          <Box width="50px">
            <img src={image} alt={title} />
          </Box>
        );
      },
    },
    { field: "Goals", headerName: "Objetivos", flex: 1 },
    // { field: "Coaches", headerName: "Profesores", flex: 1 },
    {
      field: "Coaches",
      headerName: "Profesores",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { Coaches } }) => {
        return (
          <Box>
            <ul>
              {Coaches?.map((coach) => (
                <li key={coach.id}>
                  {coach.firstName} {coach.lastName}
                </li>
              ))}
            </ul>
          </Box>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Estado",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { isActive, id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isActive === true
                ? colors.greenAccent[500]
                : colors.redAccent[500]
            }
            borderRadius="4px"
          >
            {isActive === true && (
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={() => {
                  changeIsActive(id, !isActive);
                }}
              >
                <ThumbUpOffAltIcon />
              </Button>
            )}
            {isActive === false && (
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={() => {
                  changeIsActive(id, !isActive);
                }}
              >
                <RemoveCircleOutlineIcon />
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      headerName: "Acciones",
      renderCell: ({ row: { id } }) => {
        return (
          <Box sx={{ cursor: "pointer" }}>
            <EditIcon />
            <Typography variant="h6">Editar</Typography>
          </Box>
        );
      },
    },
  ];


  const getActivities = async () => {
    const allActivities = await axios.get('/activities')
    setActivities(allActivities.data)
  }
  useEffect(() => {
    getActivities()
  },[])


  return (
    <Box m="20px">
      <Header title="ACTIVIDADES" subtitle="Gestion de Actividades" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "14px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "14px",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {!activities ? (
          "...Cargando"
        ) : (
          <DataGrid rows={activities} columns={colums} />
        )}
      </Box>
    </Box>
  );
};

export default Activities;
