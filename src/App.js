import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AppRoutes from './appRoutes';
import './index';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <AppRoutes />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
