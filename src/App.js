import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import War from "./War.js"
import Blackjack from "./Blackjack.js"
import Homepage from "./Homepage.js"
import Login from "./Login.js"
import Highscores from './Components/Highscores/Highscores.js';
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
  const { user, signOut, route } = useAuthenticator((context) => [context.user]);

  const postBalance = (newBalance) => {
    fetch('https://6x4u2qgurl.execute-api.us-east-1.amazonaws.com/test/users', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "username": user.username, "winnings": newBalance})
    })
    setUserData({username: user.username, winnings: newBalance})
  }

  useEffect(() => {
    if (user) {
      fetch(`https://6x4u2qgurl.execute-api.us-east-1.amazonaws.com/test/users/${user.username}`)
        .then(response => response.json())
        .then(jsonResponse => setUserData({username: user.username, winnings: jsonResponse.winnings}))
    }
  }, [user])

  return (
      <UserContext.Provider value={{userData, setUserData, postBalance}}>
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
                { !user ? <h3>Please Sign In.</h3> : <h3>Welcome, {user.username} Balance: ${userData.winnings}</h3>}
              </div>
              <div className="gameLink">
                <div className="buttonContainer">
                  { !user ?
                    <Link to="/war"><button disabled={true}>War</button></Link>
                  :
                    <Link to="/war"><button disabled={false}>War</button></Link>
                  }
                  { !user ?
                    <Link to="/blackjack"><button disabled={true}>Blackjack</button></Link>
                  :
                    <Link to="/blackjack"><button disabled={false}>Blackjack</button></Link>
                  }
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
          <Highscores/>
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
