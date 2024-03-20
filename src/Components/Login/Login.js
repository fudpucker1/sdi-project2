import React from "react";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import Homepage from "./../Homepage/Homepage.js"
import '@aws-amplify/ui-react/styles.css';
import {UserContext} from "./../../App.js";

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
        console.log("User is")
        console.log(user)
        return <Homepage />
      }}
      {/* <h1>Howdy</h1> */}
    </Authenticator>
    )
}

export default Login;