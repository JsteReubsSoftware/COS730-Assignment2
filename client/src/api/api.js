import axios from "axios"

const API = axios.create({baseURL:"http://localhost:3000"})
// const API = axios.create({baseURL:"https://rj-automated-api.onrender.com"})

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

// GET requests

export const getVerifiedUser = async (token) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    return validToken.user;
}

export const getUserByEmail = async (token, newEmail) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    if (!newEmail) {
        const email = validToken.user.email;
        const params = new URLSearchParams({ email });
        
        const response = await API.get('/api/getUserByEmail?' + params.toString());
        return response.data.data;
    }
    else {
        const params = new URLSearchParams({ email: newEmail });
        const response = await API.get('/api/getUserByEmail?' + params.toString());
        return response.data.data;
    }
}

export const getUserById = async (token, contactId) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    if (!contactId) {
        return null
    }
    
    const params = new URLSearchParams({ id: contactId });
    const response = await API.get('/api/getUserById?' + params.toString());
    return response.data.data;
}

export const getUserContacts = async (token) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const email = validToken.user.email;
    const params = new URLSearchParams({ email });
    
    const response = await API.get('/api/getUserContacts?' + params.toString());
    return response.data;
}

// PUT requests

export const updateUserLanguage = async (token, language, email) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const response = await API.put('/api/updateUserLanguage', {
        language,
        email
    });

    return response.data;
}

export const updateUserBlurText = async (token, blurTextBoolean, email) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const response = await API.put('/api/updateUserBlurText', {
        blurTextBoolean,
        email
    });

    return response.data;
}

export const updateUsername = async (token, username, email) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const response = await API.put('/api/updateUsername', {
        username,
        email
    });

    return response.data;
}

export const addContact = async (token, newContactEmail) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const myEmail = validToken.user.email;

    const response = await API.put('/api/addContact', {
        newContactEmail,
        myEmail
    });

    return response.data;
}

// POST requests
export const removeContact = async (token, contactEmail) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const myEmail = validToken.user.email;
    const response = await API.post('/api/removeContact', {
        contactEmail,
        myEmail
    });

    return response.data;
}

// ======== Message Service Endpoints =========
export const sendMessage = async (token, receiverId, message) => {
    const validToken = await validateToken(token);
    if (!validToken.valid) {
        return null;
    }

    const response = await API.post('/api/sendMessage', {
        text: message,
        receiverId,
        senderId: validToken.user.id
    });

    return response.data; // we will emit the message content using the socket in the frontend
}