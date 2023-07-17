import {useState} from 'react'
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom'
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from '../../../../theme'
import Profile from '../../../../components/Login/Profile'

/*----Material UI imports----*/
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StorageIcon from "@mui/icons-material/Storage";
import SchoolIcon from "@mui/icons-material/School";
import SportsScoreIcon from "@mui/icons-material/SportsScore";


const Item =({title, to, icon, selected, setSelected}) =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem 
      active={selected === title}
      style={{color: colors.grey[100]}}
      onClick={()=> setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  )
}



function SidebarMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.blueAccent[400]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.blueAccent[400]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  ADMINISTRACIÓN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignContent="center">
                <Profile
                  pictureStyles="block mx-auto h-22 rounded-full sm:mx-0 sm:shrink-0"
                  nameStyles="font-admin"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color={colors.greenAccent[500]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Gym Go - Panel de Administración
                </Typography>
              </Box>
            </Box>
          )}
          {/*Menu Items*/}
          <Box paddingLeft={isCollapsed ? undefined : "10px"}>
            <Item
              title="Dashboard"
              to=""
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Información
            </Typography>
            <Item
              title="Usuarios"
              to="users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Actividates"
              to="activities"
              icon={<StorageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profesores"
              to="coaches"
              icon={<SchoolIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Clases"
              to="classes"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Objetivos"
              to="goals"
              icon={<SportsScoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            ></Typography>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Crear
            </Typography>
            <Item
              title="Crear Usuarios"
              to="usersCreate"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Crear Profesores"
              to="coachesCreate"
              icon={<SchoolIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Crear Clases"
              to="classesCreate"
              icon={<FitnessCenterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Crear Objetivos"
              to="goalsCreate"
              icon={<SportsScoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Crear Actividades"
              to="activitiesCreate"
              icon={<StorageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="geo"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default SidebarMenu;