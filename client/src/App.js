import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AppRoutes from './appRoutes';
import './index';
import BottomNavBar from './components/bottomNavBar';
import { useLocation } from 'react-router-dom';

function App() {
  const [selectedTab, setSelectedTab] = useState("contacts");
  const [showBottomNavBar, setShowBottomNavBar] = useState(false);
  const [socket, setSocket] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Handle route change here
    if (location.pathname === "/contacts") {
      setSelectedTab("contacts");
      setShowBottomNavBar(true);
    } else if (location.pathname === "/chatroom") {
      setSelectedTab("chatroom");
      setShowBottomNavBar(true);
    } else if (location.pathname === "/profile") {
      setSelectedTab("profile");
      setShowBottomNavBar(true);
    } else {
      setShowBottomNavBar(false);
    }
  }, [location]);

  useEffect(() => {
    if (socket) {
      console.log("socket connected");
    } else {
      console.log("socket not connected");
    }
  }, [socket]);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <AppRoutes setSocket={setSocket} socket={socket}/>
        {showBottomNavBar && <BottomNavBar currentTab={selectedTab}/>}
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
