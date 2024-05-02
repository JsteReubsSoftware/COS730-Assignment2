import axios from "axios"

const API = axios.create({baseURL:"http://localhost:3000"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("user_info")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info").token)}`
    }

    return req;
})

// ======== General API Endpoints =========
export const validateToken = async (token) => {
    const response = await API.post('/api/validatetoken', {
        token
    });
    return response.data.data;
}

// ======== User Endpoints =========
export const logInGoogle = async (access_token) => {
    const res = await API.post("/api/login", {
        access_token
    });

    return res.data.data;
}

export const getUser = async (token) => {
    const validToken = await validateToken(token);
    if (!validToken.data.data.valid) {
        return null;
    }

    const response = await API.post('/api/getuser');
    return response.data.data;
}

// ======== Message Service Endpoints =========
export const sendMessage = async (token, text, senderId, receiverId) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const response = await API.post('/api/sendMessage', {
        text,
        senderId,
        receiverId
    });

    if (!response.data.success) {
        return null; // we will create a pop up on the UI to indicate that a messageservice error has occurred
    }

    return response.data.data; // we will emit the message content using the socket in the frontend
}