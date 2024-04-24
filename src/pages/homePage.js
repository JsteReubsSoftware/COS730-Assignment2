import React, { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const HomePage = () => {
  const [ user, setUser ] = useState(() => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  });
  const [ profile, setProfile ] = useState(() => {
    return localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null;
  });
    
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      setUser(credentialResponse);
      localStorage.setItem('user', JSON.stringify(credentialResponse));
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    useOneTap: true
  });

  const logout = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
    localStorage.clear();
  };

    useEffect(() => {
      if (user) {
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {
            setProfile(res.data);
            localStorage.setItem('profile', JSON.stringify(res.data));
            console.log(res.data);
        })
        .catch((err) => console.log(err));
      }
    },[ user ]);

    return (
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.picture} alt="user profile pic" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <button onClick={login}>Sign in with Google 🚀 </button>
        )}
      </div>
  );
};

export default HomePage;