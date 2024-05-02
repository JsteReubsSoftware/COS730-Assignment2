import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AppRoutes from './appRoutes';
import './index';
import BottomNavBar from './components/bottomNavBar';

function App() {
  const [selectedTab, setSelectedTab] = useState("contacts");

  useEffect(() => {
    if (window.location.pathname === "/contacts") {
      setSelectedTab("contacts");
    } else if (window.location.pathname === "/chatroom") {
      setSelectedTab("chatroom");
    } else if (window.location.pathname === "/profile") {
      setSelectedTab("profile");
    }
  }, []);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <AppRoutes />
        <BottomNavBar currentTab={selectedTab}/>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
