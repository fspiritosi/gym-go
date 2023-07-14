import { Box, Typography, useTheme} from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../../../theme';
import { mockDataTeam } from "../../data/mockData";

import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../adminComponentes/Header";

const Users = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const colums = [
      { field: "id", headerName: "ID" },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      {
        field: "access",
        headerName: "Access Level",
        flex: 1,
        renderCell: ({ row: { access } }) => {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                access === "admin"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700]
              }
              borderRadius="4px"
            >
              {access === "admin" && <AdminPanelSettingsOutlined />}
              {access === "manager" && <SecurityOutlinedIcon />}
              {access === "user" && <LockOpenOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ m: "5px" }}>
                {access}
              </Typography>
            </Box>
          );
        },
      },
    ];

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
          <DataGrid
            rows={mockDataTeam}
            columns={colums}
          />
        </Box>
      </Box>
    );
}

export default Users