import React, { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const LandingPage = () => {
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
      navigate();
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
        })
        .catch((err) => console.log(err));
      }
    },[ user ]);

    const navigate = () => {
      return window.location.href = '/contacts';
    };

    return (
      <div className="w-full bg-gradient-to-b from-darkPurple to-whitePurple h-screen flex justify-center">
        <div className="w-1/3 h-[650px] m-auto flex flex-col">
          <div>
            <img src={require("../assets/smile-emoji.png")} alt="logo" className="m-auto w-[150px] h-[150px]"/>
            <h1 className="text-4xl font-bold text-center mt-5">Automated Chat Application</h1>
          </div>
          {profile ? (
          <>
            <div className="absolute top-10 right-10 flex flex-col justify-center bg-purple-950 p-2 rounded-lg">
              <div className="flex justify-center">
                <img src={profile.picture} alt="user profile pic" className="w-[50px] h-[50px] rounded-full" />
                <p className="self-center ml-2 text-smoothWhite">Name: {profile.name}</p>
              </div>
              <button onClick={logout} className="text-red-500">Log out</button>
            </div>
            <button onClick={navigate} className="m-auto border-2 bg-darkPurple rounded-md p-5 text-center text-smoothWhite font-bold hover:cursor-pointer">Go to Home Page</button>
          </>
        ) : (
          <div onClick={login} className="m-auto border-2 bg-darkPurple rounded-md p-5 text-center text-smoothWhite font-bold hover:cursor-pointer">Sign in with Google 🚀 </div>
          
        )}
        </div>
      </div>
  );
};

export default LandingPage;