import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import War from "./War.js"
import Blackjack from "./Blackjack.js"
import Homepage from "./Homepage.js"
import Login from "./Login.js"
import './App.css';

export const UserContext = React.createContext();

const App = () => {

  return (
    <Authenticator.Provider>
      <UserContextProvider />
    </Authenticator.Provider>
  );
};

const UserContextProvider = () => {

  const [userData, setUserData] = useState({username: 'default', winnings: 0})
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
      <UserContext.Provider value={{userData, setUserData}}>
        <Router>
          <div className="header">
            <div className="logo">
              <center>
                <Link to="/">
                  <img src={process.env.PUBLIC_URL + "/SDICasino.png"} alt="Homepage"/>
                </Link>
              </center>
            </div>
            <div className="pageLinks">
              <div className="loginDetails">
                { !user ? "Please Sign In." : <h2>Welcome, {user.username}</h2>}
              </div>
              <div className="gameLink">
                <div className="buttonContainer">
                  <Link to="/war"><button>War</button></Link>
                  <Link to="/blackjack"><button>Blackjack</button></Link>
                </div>
              </div>
              <div className="loginLink">
                { !user ?
                  <Link to="/login"><button>Log In</button></Link>
                :
                  <button onClick={signOut}>Log Out</button>
                }
              </div>
            </div>
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/war" element={<War/>}/>
              <Route path="/blackjack" element={<Blackjack/>}/>
            </Routes>
          </div>
        </ Router>
      </ UserContext.Provider>
  );

};

export default App;

/*

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

*/
