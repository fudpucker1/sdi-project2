import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import War from "./War/War.js"
import Blackjack from "./Blackjack/Blackjack.js"
import Homepage from "./Homepage/Homepage.js"
import './App.css';
import '../Homepage/War.js'

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/war" element={<War/>}/>
        <Route path="/blackjack" element={<Blackjack/>}/>
      </Routes>
    </ Router>
  );

};

export default App;
