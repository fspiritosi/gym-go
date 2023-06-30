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
axios.defaults.baseURL = "http://localhost:3001"



function App() {
  let location = useLocation();

  return (

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
      </Routes>
    </div>

  );
}

export default App;
