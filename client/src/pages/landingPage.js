import React, { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import * as API from "../api/api";
import Cookies from 'js-cookie';

const LandingPage = () => {
  const [ profile, setProfile ] = useState(null);
    
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const loginRequest = async () => {
        const res = await API.logInGoogle(credentialResponse.access_token);
        localStorage.setItem('profile', JSON.stringify(res['result']));
        localStorage.setItem('expiresAt', JSON.stringify(credentialResponse.expires_in));
        setProfile(res['result']);
        const now = new Date();
        Cookies.set('jwt', res['token'], { expires: now.setDate(now.getDate() + 1) });
      }
      loginRequest()
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    useOneTap: true
  });

  const logout = () => {
    googleLogout();
    setProfile(null);
    localStorage.clear();
    Cookies.remove('jwt');
  };

    useEffect(() => {
      if (Cookies.get('jwt')) {
        const validToken = async () => {
          const isValid = await API.validateToken(Cookies.get('jwt'));
          console.log(isValid.valid);
          if (isValid.valid) {
            setProfile(JSON.parse(localStorage.getItem('profile')));
          }
        }

        validToken();
      }

    },[]);

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
                <img src={profile.profileImg} alt="user profile pic" className="w-[50px] h-[50px] rounded-full" />
                <p className="self-center ml-2 text-smoothWhite">Name: {profile.name}</p>
              </div>
              <button onClick={logout} className="text-red-500">Log out</button>
            </div>
            <button onClick={() => window.location.href = "/contacts"} className="m-auto border-2 bg-darkPurple rounded-md p-5 text-center text-smoothWhite font-bold hover:cursor-pointer">Go to Home Page</button>
          </>
        ) : (
          <div onClick={login} className="m-auto border-2 bg-darkPurple rounded-md p-5 text-center text-smoothWhite font-bold hover:cursor-pointer">Sign in with Google 🚀 </div>
          
        )}
        </div>
      </div>
  );
};

export default LandingPage;