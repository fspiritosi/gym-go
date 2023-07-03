<<<<<<< Updated upstream
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Nav from "./components/Nav/Nav";
import FormCreateActivities from "./views/FormCreateActivities/FormCreateActivities";
import Profesores from './views/Profesores/Profesores';
import axios from "axios";
import FormGoals from "./views/FormGoals/FormGoals";
import Footer from "./components/Footer/Footer";
axios.defaults.baseURL = "http://localhost:3001";
=======
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Activities from './components/Activities/Activities';
import Detail from './views/Detail/Detail';
import Nav from './components/Nav/Nav';
import Admin from './views/Admin/Admin';
import FormCreateActivities from './views/FormCreateActivities/FormCreateActivities';
import axios from 'axios'
import FormGoals from './views/FormGoals/FormGoals'
import Footer from './components/Footer/Footer';
import ActivitiesV from './views/Activities/ActivitiesV';
axios.defaults.baseURL = "http://localhost:3001"



function App() {
  let location = useLocation();

  return (
<<<<<<< Updated upstream
    <div className="App">
      {location.pathname !== "/" && <Nav />}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/activity-detail/:id" element={<Detail />} />
        <Route path="/create-activity" element={<FormCreateActivities />} />
        <Route path='/create-goals' element={<FormGoals/>}/>
        <Route path='/coaches' element={<Profesores/>}/>
        <Route path="/create-goals" element={<FormGoals />} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
=======
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/createActivity" element={<FormCreateActivities />} />
        </Routes>
      </div>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
