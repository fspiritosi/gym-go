import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import FormCreateActivities from './views/FormCreateActivities/FormCreateActivities';


function App() {
  let location = useLocation();

  return (

    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/activities" element={<Home />} />
        <Route path="/activity-detail" element={<Detail />} />
        <Route path="/create-activity" element={<FormCreateActivities />} />
      </Routes>
    </div>

  );
}

export default App;
