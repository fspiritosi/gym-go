import { Box, Typography, Button,useTheme} from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../../../theme';
// import { mockDataTeam } from "../../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";


import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../adminComponentes/Header";

const Users = () => {
  const [user, setUsers] = useState([]);
 
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const changeRole = async (id, role) => {
      await axios.put(`/users/${id}`, role);
      getUsers();
    };
    const colums = [
      {
        field: "username",
        headerName: "Username",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Email",
      },
      {
        field: "credits",
        headerName: "Creditos Disponibles",
        flex: 1,
        headerAlign: "center",
        align: "center",
        type: "number",
      },
      {
        field: "purchases",
        headerName: "Compras Totales",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { purchases } }) => {
          return <Box>{purchases ? purchases.length : 0}</Box>;
        },
      },
      {
        field: "role",
        headerName: "Rol de Usuario",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { role, id } }) => {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                role === "admin"
                  ? colors.greenAccent[500]
                  : colors.redAccent[500]
              }
              borderRadius="4px"
            >
              {role === "admin" && (
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={() => {
                    changeRole(id, { role: "user" });
                  }}
                >
                  <AdminPanelSettingsOutlined />
                </Button>
              )}
              {role === "user" && (
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={() => {
                    changeRole(id, { role: "admin" });
                  }}
                >
                  <LockOpenOutlinedIcon />
                </Button>
              )}
            </Box>
          );
        },
      },
    ];

    const getUsers = async () => {
      const allUsers= await axios.get("/users");
      setUsers(allUsers.data);
    };
    useEffect(() => {
      getUsers();
    }, []);


    return (
      <Box m="20px">
        <Header title="USUARIOS" subtitle="Usuarios del sistema" />
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
          <DataGrid rows={user} columns={colums} />
        </Box>
      </Box>
    );
}

export default Users