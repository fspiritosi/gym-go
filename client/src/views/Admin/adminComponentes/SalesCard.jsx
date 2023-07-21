import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";

function SalesCardDasboard(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const totalQuantity = props.data.length;
  const salesData = props.data;
  const itemsSales = salesData.map(sale => sale.item)
  const itemsPriceSeles = salesData.map(sale => sale.item.price)

  console.log(itemsSales)

  const totalSales = () => {
    
    const initialValue = 0
    const totalPriceSales = itemsPriceSeles.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    return totalPriceSales
  } 

  
  return (
    <Card
      sx={{
        minWidth: 275,
        height: "100%",
        padding: "30px",
        backgroundColor: `${colors.grey[600]}`,
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography variant="h3" component="div" sx={{ fontWeight: "600" }}>
          {props.title}
        </Typography>
        <br />
        <Typography variant="h4" sx={{ mb: 1.5 }} color="text.secondary">
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
        <Typography variant="h5">
          Ventas totales:{" $ "}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            {totalSales()}
          </span>
        </Typography>
        <br />
        <Typography variant="h5">
          Paquete 1 Clase vindidos:{" "}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
           
          </span>
        </Typography>
        <Typography variant="h5">
          Paquete 5 Clases vendidos:{" "}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            
          </span>
        </Typography>
        <Typography variant="h5">
          Paquete 10 Clases vendidos:{" "}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
           
          </span>
        </Typography>
        <Typography variant="h5">
          Paquete 25 Clases vendidos:{" "}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            
          </span>
        </Typography>
        <Typography variant="h5">
          Paquete 25 Clases vendidos:{" "}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            
          </span>
        </Typography>
        <br />
        <Typography variant="h5">
          Paquete 5 Clases vendidos:{" "}
          <span
            style={{
              color: `${colors.redAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            
          </span>
        </Typography>
        <Typography variant="h5">
          Cantridad:{" "}
          <span
            style={{
              color: `${colors.redAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            ver que
          </span>
        </Typography>
        <br />
        <Typography variant="h5">
          Usuario con mas compras:{" "}
          <span
            style={{
              color: `${colors.redAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            ver que
          </span>
        </Typography>
        <Typography variant="h5">
          Cantridad:{" $"}
          <span
            style={{
              color: `${colors.greenAccent[500]}`,
              fontSize: "16px",
              margin: "10px",
              fontWeight: "600",
            }}
          >
            0,00
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

export default SalesCardDasboard;
