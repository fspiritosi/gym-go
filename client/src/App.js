import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Nav from "./components/Nav/Nav";
import FormCreateActivities from "./views/FormCreateActivities/FormCreateActivities";
import Profesores from './views/Profesores/Profesores';
import PaquetesClases from './views/PaquetesClases/PaquetesClases'
import axios from "axios";
import FormGoals from "./views/FormGoals/FormGoals";
import Footer from "./components/Footer/Footer";
import FormClasses from "./views/FormClasses/FormClasses";
import NotFound from "./views/NotFound/NotFound";
import { useAuth0 } from "@auth0/auth0-react";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  let location = useLocation();
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/notfound" element={<NotFound />} />
        <Route path="/activities" element={<Home />} />
        <Route path="/activity-detail/:id" element={<Detail />} />
        <Route path="/create-activity" element={isAuthenticated ? <FormCreateActivities /> : <Navigate to="/notfound" />}/>
        <Route path='/create-goals' element={isAuthenticated ? <FormGoals /> : <Navigate to="/notfound" />}/>
        <Route path='/coaches' element={<Profesores/>}/>
        <Route path="/create-classes" element={isAuthenticated ? <FormClasses /> : <Navigate to="/notfound" />}/>
        <Route path="/prices" element={<PaquetesClases/>} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
