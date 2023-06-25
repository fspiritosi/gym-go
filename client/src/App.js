//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Activities from './components/Activities';
import CreateClasses from "./components/CreateClasses";





function App() {
  return (
    <Router>
      <div className="App">
      <NavBar />
      <Routes>
      <Route exact path="/" element={<Activities/>} />
      <Route exact path="/createclasses" element={<CreateClasses/>} />
      
      </Routes>
      </div>
    </Router>
    


  );
}


export default App;



