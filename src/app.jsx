import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/login/login';

import './index';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <Login />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
