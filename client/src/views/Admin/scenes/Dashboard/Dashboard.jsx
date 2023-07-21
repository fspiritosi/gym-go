import { Box } from "@mui/material"
import Header from "../../adminComponentes/Header"
import CardDasboard from "../../adminComponentes/Cards";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import axios from "axios";
import SalesCardDasboard from "../../adminComponentes/SalesCard";


function Dashboard() {
  const [activities, setActivities] = useState([])
  const [coaches, setCoaches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const getData = async () => {
    const allActivities = await axios.get("/activities");
    setActivities(allActivities.data)
    const allCoaches = await axios.get('/coaches');
    setCoaches(allCoaches.data)
    const allClasses = await axios.get('/classes');
    setClasses(allClasses.data)
    const allUsers = await axios.get("/users");
    setUsers(allUsers.data);
    const allSales = await axios.get("/orders");
    setSales(allSales.data);
  }

  useEffect(() => {
    getData()
  }, [])




  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Bienvenido a Gym-Go" />
      <Box display='flex' justifyContent='space-around' sx={{marginTop:'50px'}}>
        <Box>
          <SalesCardDasboard data={sales} title={"Ventas"} />
        </Box>
        <Box
          display="grid"
          gap="50px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
          }}
        >
          <CardDasboard data={activities} title={"Actividades"} />
          <CardDasboard data={coaches} title={"Profesores"} />
          <CardDasboard data={classes} title={"Clases"} />
          <CardDasboard data={users} title={"Usuarios"} />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard