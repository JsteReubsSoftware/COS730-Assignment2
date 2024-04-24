import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import './index';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <GoogleLogin
          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse?.credential);
            console.log(decoded);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
