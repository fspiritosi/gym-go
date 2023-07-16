import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";

import axios from "axios";
import { useEffect, useState } from "react";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../adminComponentes/Header";

const GoalsData = () => {
  const [goals, setGoals] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const changeIsActive = async (id, isActive) => {
    console.log("desde la función", `is active es ${isActive}`);
    await axios.put(`/goals/${id}`, { isActive });
    getGoals();
  };

  const colums = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 6,
      cellClassName: "name-column--cell",
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

  const getGoals = async () => {
    const allGoals = await axios.get("/goals");
    setGoals(allGoals.data);
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <Box m="20px">
      <Header title="OBJETIVOS" subtitle="Administra los Objetivos" />
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
        <DataGrid rows={goals} columns={colums} />
      </Box>
    </Box>
  );
};

export default GoalsData;
