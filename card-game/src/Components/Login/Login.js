import React from "react";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const awsExports = {
    "REGION" : "us-west-1",
    "USER_POOL_ID": "us-west-1_wiMUVqm67",
    "USER_POOL_APP_CLIENT_ID": "2tu6omdv4c01iefq6rh4ppmnjf"
    // "REGION" : "us-east-1",
    // "USER_POOL_ID": "us-east-1_YZfODG4Uj",
    // "USER_POOL_APP_CLIENT_ID": "2dq6lqb6pk8pbmeleruj7ngko8"
}




const Login = () => {

    return (
        <Authenticator initialState='signIn'
    components={{
      SignUp: {
        FormFields() {

          return (
            <>
              <Authenticator.SignUp.FormFields />
            </>
          );
        },
      },
    }}
    >
      {/* {({ signOut, user}) => (
        <div>Welcome {user.username}
        <button onClick={signOut}>Sign out</button>
        <h4>Your JWT token:</h4>
        {jwtToken}
        <Account/>
        </div>
      )} */}
    </Authenticator>
    )
}

export default Login;