const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const chatServer = http.createServer(app)
const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')

let connectedUsers = []

const allowedOrigins = [
    'https://rj-automated-api-app.onrender.com',
    `http://localhost:${process.env.REACT_APP_CLIENT_PORT}`,
    `http://127.0.0.1:${process.env.REACT_APP_CLIENT_PORT}`
]

const io = require('socket.io')(chatServer, {
    cors: {
        origin: (origin, callback) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use("/api", require("./routes/loginRoutes"))
app.use("/api", require("./routes/userRoutes")) 
app.use("/api", require("./routes/messageRoutes"))

// ---------------------------------------------------
const verifyToken = (token) => {
    // Replace with your token verification logic using your secret key
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);
        return decoded; // Return decoded user information if valid
    } catch (error) {
        return false; // Invalid token
    }
};

io.on('connection', (socket) => {
    console.log('user connected')

    socket.id = socket.handshake.headers['user-id']

    console.log(socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('logout', () => {
        socket.disconnect()
    })

    socket.on('private-message', ({ receiverId, text }) => {

        socket.to(receiverId).emit('private-message', {
            receiverId,
            senderId: socket.id,
            text
        })
    })
})

// Setup DB connection and server
const PORT = process.env.REACT_APP_SERVER_PORT || 3000;
const DB_CONNECTION_URL = process.env.REACT_APP_MONGO_ATLAS_CONNECTION_URL

mongoose.set("strictQuery", false);
mongoose.connect(`${DB_CONNECTION_URL}`).then(() => {
    console.log('Connected to MongoDB')
    chatServer.listen(PORT, () => {
        console.log(`Node API app running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})