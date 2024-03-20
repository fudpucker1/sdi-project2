import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import War from "./War.js"
import Blackjack from "./Blackjack.js"
import Homepage from "./Homepage.js"
import Login from "./Login.js"
import './App.css';



export const UserContext = React.createContext();

const App = () => {

  const [userData, setUserData] = useState({username: 'default', winnings: 0})

  return (
    <Authenticator.Provider>
    <UserContext.Provider value={{userData, setUserData}}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/war" element={<War/>}/>
          <Route path="/blackjack" element={<Blackjack/>}/>
        </Routes>
      </ Router>
    </ UserContext.Provider>
    </Authenticator.Provider>
  );

};

export default App;