import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AppRoutes from './appRoutes';
import './index';
import BottomNavBar from './components/bottomNavBar';

function App() {
  const [selectedTab, setSelectedTab] = useState("contacts");
  const [showBottomNavBar, setShowBottomNavBar] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/contacts") {
      setSelectedTab("contacts");
      setShowBottomNavBar(true);
    } else if (window.location.pathname === "/chatroom") {
      setSelectedTab("chatroom");
      setShowBottomNavBar(true);
    } else if (window.location.pathname === "/profile") {
      setSelectedTab("profile");
      setShowBottomNavBar(true);
    } else {
      setShowBottomNavBar(false);
    }
  }, []);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <AppRoutes />
        {showBottomNavBar && <BottomNavBar currentTab={selectedTab}/>}
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
