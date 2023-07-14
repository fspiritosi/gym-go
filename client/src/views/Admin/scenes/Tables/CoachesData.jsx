import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";


import axios from "axios";
import { useEffect, useState } from "react";


import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../adminComponentes/Header";

const Coaches = () => {
    const [coaches, setCoaches] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const changeIsActive = async (id, isActive) => {
    console.log("desde la función", `is active es ${isActive}`);
    await axios.put(`/coaches/${id}`, {isActive});
   getCoaches()
  };

  const colums = [
    {
      field: "profilePicture",
      headerName: "Imagen",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { profilePicture, id } }) => {
        return (
          <Box width="15%">
            <img src={profilePicture} alt={id} />
          </Box>
        );
      },
    },
    {
      field: "firstName",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Apellido",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "workExperience", headerName: "Experiencia", flex: 1 },
    {
      field: "Activities",
      headerName: "Actividades",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { Activities } }) => {
        return (
          <Box>
            <ul>
              {Activities?.map((act) => (
                <li key={act.id}>{act.title}</li>
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
                  console.log(`isActive esta en ${isActive} y el id es ${id}`);
                  console.log(
                    `isActive esta en ${isActive} y se envió a la f() ${!isActive}`
                  );
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
                  console.log(`isActive esta en ${isActive} y el id es ${id}`);
                  console.log(
                    `isActive esta en ${isActive} y se envió a la f() ${!isActive}`
                  );
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
      field: "edit",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
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

  const getCoaches = async () => {
    const allCoaches = await axios.get('/coaches')
    setCoaches(allCoaches.data)
  }

  useEffect(() => {
    getCoaches()
  },[])

  return (
    <Box m="20px">
      <Header title="PROFESORES" subtitle="Administra los prefesores" />
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
        <DataGrid rows={coaches} columns={colums} />
      </Box>
    </Box>
  );
};

export default Coaches;
