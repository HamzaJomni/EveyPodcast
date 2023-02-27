import logo from './logo.svg'
import './App.css'
import Caracteristique from "./components/caracteristique"
import Podcasts from "./components/podcasts"
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <Routes>
    <Route path="/" element={<Caracteristique />} />
    <Route path="/podcasts" element={<Podcasts />} />
    
  </Routes>
  );
}

export default App;
