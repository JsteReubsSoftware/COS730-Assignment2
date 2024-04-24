import React from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    
    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
          const decoded = jwtDecode(credentialResponse?.credential);
          console.log(decoded);
        },
        onError: (error) => {
          console.log('Login Failed:', error);
        },
        useOneTap: true
    });

    return (
        <div>
            <button onClick={() => login()}>Login</button>
            <button onClick={() => googleLogout()}>Logout</button>
        </div>
    );
};

export default Login;