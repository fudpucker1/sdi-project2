import React from "react";
import {useEffect, useContext} from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import Homepage from "./../Homepage/Homepage.js"
import '@aws-amplify/ui-react/styles.css';
import {UserContext} from "./../../App.js";
import { useNavigate } from 'react-router-dom';

const awsExports = {
    "REGION" : "us-east-1",
    "USER_POOL_ID": "us-east-1_YZfODG4Uj",
    "USER_POOL_APP_CLIENT_ID": "2dq6lqb6pk8pbmeleruj7ngko8"
}

Amplify.configure({
    Auth: {
      Cognito: {
          region: awsExports.REGION,
          userPoolId: awsExports.USER_POOL_ID,
          userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID
      }
    }
  });


const Login = () => {

  const { user, signOut, route } = useAuthenticator((context) => [context.user]);
  const {userData, setUserData} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (route == "authenticated") {
      fetch(`https://6x4u2qgurl.execute-api.us-east-1.amazonaws.com/test/users/${user.username}`)
        .then(response => response.json())
        .then(jsonResponse => setUserData({username: user.username, winnings: jsonResponse.winnings}))
      navigate('/');
    }
  }, [user])

  return (
      <Authenticator initialState='signIn'
  components={{
    SignUp: {
      FormFields() {

        return (
          <>
            <Authenticator.SignUp.FormFields />
            <div><label>Email</label></div>
            <input
              type="text"
              name="email"
              placeholder="Please enter a valid email"
            />
          </>
        );
      },
    },
  }}
  >
    {({ signOut, user}) => {
      return <button onClick={signOut}>Log out</button>
    }}
  </Authenticator>
  )
}

export default Login;