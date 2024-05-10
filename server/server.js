const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const chatServer = http.createServer(app)
const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')

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

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

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

var usersConnected = []

io.on('connection', (socket) => {
    
    console.log('user connected')

    socket.on('user-connected', () => {
        usersConnected.push({
            id: socket.id,
            userId: jwt.decode(socket.handshake.headers['token']).id,
            token: socket.handshake.headers['token']
        })

        console.log(usersConnected)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')

        usersConnected = usersConnected.filter(user => user.id !== socket.id)
    })

    socket.on('logout', () => {
        socket.disconnect()
    })

    socket.on('private-message', (viewedUserId, token, text) => {
        // extract id from token
        const myID = jwt.decode(token)

        console.log('private-message sent:', viewedUserId, myID.id, text)

        // get viewed user
        const viewedUser = usersConnected.find(user => user.userId === viewedUserId)
        const viewedUserSocketID = viewedUser.id

        io.to(viewedUserSocketID).emit('private-message', viewedUserId, myID.id, text);
        socket.emit('private-message', viewedUserId, myID.id, text);
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