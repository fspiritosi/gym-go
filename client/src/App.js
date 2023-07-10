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
import Admin from "./views/Admin/Admin";
import Dashboard from "./views/Admin/scenes/Dashboard/Dashboard"
import Team from "./views/Admin/scenes/Team/Team";
import Form from "./views/Admin/scenes/Forms/Form";
import ClassesForm from "./views/Admin/scenes/Forms/creteClases";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  let location = useLocation();

  return (
    <div className="App">
      {/* {location.pathname !== "/" &&
        location.pathname !== "/admin" &&
        location.pathname !== "/admin/team" && <Nav />} */}
      {location.pathname === "/" ||
      location.pathname.includes("/admin") ? undefined : (
        <Nav />
      )}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/activities" element={<ActivitiesV />} />
        <Route path="/activity-detail/:id" element={<Detail />} />
        <Route path="/create-activity" element={<FormCreateActivities />} />
        <Route path="/create-goals" element={<FormGoals />} />
        <Route path="/coaches" element={<Profesores />} />
        <Route path="/create-goals" element={<FormGoals />} />
        <Route path="/create-classes" element={<FormClasses />} />
        <Route path="/prices" element={<PaquetesClases />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Dashboard />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Admin />} />
          <Route path="usersCreate" element={<Form />} />
          <Route path="classesCreate" element={<ClassesForm />} />
        </Route>
      </Routes>
      {location.pathname !== "/" &&
        location.pathname !== "/admin/" &&
        location.pathname !== "/admin/team" && <Footer />}
    </div>
  );
}

export default App;
