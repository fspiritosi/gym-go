import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import Nav from "./components/Nav/Nav";
import FormCreateActivities from "./views/FormCreateActivities/FormCreateActivities";
import Profesores from './views/Profesores/Profesores';
import PaquetesClases from './views/PaquetesClases/PaquetesClases'
import axios from "axios";
import FormGoals from "./views/FormGoals/FormGoals";
import Footer from "./components/Footer/Footer";
import FormClasses from "./views/FormClasses/FormClasses";
import ActivitiesV from "./views/ActivitiesV/ActivitiesV";
axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "https://gym-go-production.up.railway.app"

function App() {
  let location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/activities" element={<ActivitiesV />} />
        <Route path="/activity-detail/:id" element={<Detail />} />
        <Route path="/create-activity" element={<FormCreateActivities />} />
        <Route path='/create-goals' element={<FormGoals/>}/>
        <Route path='/coaches' element={<Profesores/>}/>
        <Route path="/create-goals" element={<FormGoals />} />
        <Route path="/create-classes" element={<FormClasses/>}/>
        <Route path="/prices" element={<PaquetesClases/>} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
