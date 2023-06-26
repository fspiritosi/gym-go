import './App.css';
<<<<<<< Updated upstream
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form';
import Nav from './components/Nav/Nav';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import FormCreateActivities from './components/FormCreateActivities/FormCreateActivities';
>>>>>>> Stashed changes

function App() {
  let location = useLocation();

  return (
<<<<<<< Updated upstream
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/activities" element={<Home />} />
        <Route path="/activity-detail" element={<Detail />} />
        <Route path="/create-activity" element={<Form />} />
      </Routes>
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
