import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Link to="/vue">vue</Link>
      <Link to="/react">react</Link>
      </Router>
      <div id='container'></div>
    </div>
  );
}

export default App;
