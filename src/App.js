import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes ,Route} from 'react-router-dom'

import HomeComponent from './home/HomeContainer';
import AboutComponent from './home/AboutContainer';

function App() {
  return (
    <div className="App">
     {/* <h1>Welcome</h1> */}
       
        <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about" element={<AboutComponent msg='hello'/>} />   
        
        </Routes>
    </div>
  );
}

export default App;
