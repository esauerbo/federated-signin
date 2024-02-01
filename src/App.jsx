import React from 'react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import config from './amplifyconfiguration.json';
Amplify.configure({
  Auth: {
    Cognito: {
      loginWith: {
        oauth: {
          redirectSignIn: [
            "http://localhost:3000/",
            "https://main.dzj2kg93vmtwj.amplifyapp.com/",
          ],
          redirectSignOut: [
            "http://localhost:3000/",
            "https://main.dzj2kg93vmtwj.amplifyapp.com/",
          ],
        },
      },
    },
  },
  ...config
});

export default function MyApp() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  React.useEffect(() => {
    getCurrentUser()
      .then(() => {
        setIsSignedIn(true);
      })
      .catch(() => {
        setIsSignedIn(false);
      });
  }, []);

  return isSignedIn ? (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </button>
  ) : (
    <button
      onClick={() => {
        signInWithRedirect({ provider: 'Google' });
      }}
    >
      Sign In
    </button>
  );
  // return (
  //   <Authenticator>
  //   {({ signOut }) => <button onClick={signOut}>Sign out</button>}
  // </Authenticator>
  // )

}
