import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";


function CardDasboard(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
   
    const totalQuantity = props.data.length
    const activeQuantity = () => {
        let quantity = 0
        props.data?.forEach(item => item.isActive === true ? quantity++ : quantity)
        return quantity
    }


  return (
    <Card sx={{ minWidth: 275, backgroundColor: `${colors.grey[600]}`, padding:'20px' }}>
      <CardContent>
        <Typography
          variant="h3"
          component="div"
          sx={{ fontWeight: "600" }}
          color={`${colors.primary[100]}`}
        >
          {props.title}
        </Typography>
        <br />
        <Typography
          variant="h4"
          sx={{ mb: 1.5 }}
          color={`${colors.primary[200]}`}
        >
          Cantida de {props.title} totales:{" "}
          <span
            style={{
              color: `${colors.grey[100]}`,
              fontSize: "20px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            {totalQuantity}
          </span>
        </Typography>
        <Typography variant="h5" color={`${colors.primary[200]}`}>
          Activ@s:{" "}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            {activeQuantity()}
          </span>
        </Typography>
        <br />
        <Typography variant="h5" color={`${colors.primary[200]}`}>
          No activ@s:{" "}
          <span
            style={{
              color: `${colors.redAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            {totalQuantity - activeQuantity()}
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            color: `${colors.greenAccent[500]}`,
            cursor: "pointer",
            fontWeight: "600",
          }}
          size="medium"
        >
          Ver Mas...
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardDasboard;