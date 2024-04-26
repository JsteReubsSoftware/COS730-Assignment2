import axios from "axios"

const API = axios.create({baseURL:"http://localhost:3000"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("user_info")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info").token)}`
    }

    return req;
})

export const logInGoogle = async (access_token) => {
    const res = await API.post("/api/login", {
        access_token
    });

    return res.data;
}

export const validateToken = async (token) => {
    const response = await API.post('/api/validatetoken', {
        token
    });
    return response.data;
}

export const getUser = async (token) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const response = await API.post('/api/getuser');
    return response.data;
}
