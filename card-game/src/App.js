import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Amplify} from 'aws-amplify';
import War from "./War.js"
import Blackjack from "./Blackjack.js"
import Homepage from "./Homepage.js"
import Login from "./Login.js"
import './App.css';

// Amplify.configure({
//   Auth: {
//     region: awsExports.REGION,
//     userPoolId: awsExports.USER_POOL_ID,
//     userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
//   }
// });

export const UserContext = React.createContext();

const App = () => {

  const [userData, setUserData] = useState({username: 'default', winnings: 0})

  return (
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
  );

};

export default App;