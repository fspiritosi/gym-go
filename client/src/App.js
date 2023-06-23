import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
