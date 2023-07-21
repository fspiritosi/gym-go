import { Box,Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import axios from "axios";
import { useEffect, useState } from "react";



import Header from "../../adminComponentes/Header";

const Sales = () => {
  const [orders, setOrder] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const colums = [
    {
      field: "description",
      headerName: "Tipo",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { item } }) => {
        return (
          <Box width="50px">
            <Typography>{item.description}</Typography>
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { item } }) => {
        return (
          <Box width="50px">
            <Typography>$ {item.price}</Typography>
          </Box>
        );
      },
    },
    {
      field: "user",
      headerName: "Nombre de Usuario",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { user } }) => {
        return (
          <Box width="50px">
            <Typography>{user.username}</Typography>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { user } }) => {
        return (
          <Box width="50px">
            <Typography>{user.email}</Typography>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Fecha de Compra",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { createdAt } }) => {
        return (
          <Box width="50px">
            <Typography>{createdAt.substring(0, 10)}</Typography>
          </Box>
        );
      },
    },
  ];

  const getOrdes = async () => {
    const allOrdes = await axios.get("/orders");
    setOrder(allOrdes.data);
  };
  useEffect(() => {
    getOrdes();
  }, []);

  return (
    <Box m="20px">
      <Header title="VENTAS" subtitle="Gestion de Ventas" />
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
        {!orders ? (
          "...Cargando"
        ) : (
          <DataGrid rows={orders} columns={colums} />
        )}
      </Box>
    </Box>
  );
};

export default Sales;
