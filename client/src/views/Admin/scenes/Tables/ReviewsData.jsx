import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../../adminComponentes/Header";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ReviewsData = () => {
  const [reviews, setReviews] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const changeIsActive = async (id, isActive) => {
        await axios.put(`/reviews/${id}`, { isActive });
        getReviews();
    };

  const colums = [
    {
      field: "rate",
      headerName: "Valor",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "comment",
      headerName: "Comnetario",
      flex: 1,
      //   headerAlign: "center",
      //   align: "center",
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
      field: "coach",
      headerName: "Profesor",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { coach } }) => {
        return (
          <Box width="50px">
            <Typography>{coach.firstName}' '{coach.lastName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Fecha de Review",
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
  ];

  const getReviews = async () => {
    const allReviews = await axios.get("/reviews");
    setReviews(allReviews.data);
  };
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Box m="20px">
      <Header title="REVIEWS" subtitle="Gestion de Reviews" />
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
        {!reviews ? (
          "...Cargando"
        ) : (
          <DataGrid rows={reviews} columns={colums} />
        )}
      </Box>
    </Box>
  );
};

export default ReviewsData;
