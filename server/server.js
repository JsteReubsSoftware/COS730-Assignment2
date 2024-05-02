const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const chatServer = http.createServer(app)
const io = require('socket.io')(chatServer, {
    cors: {
        origin: [`http://localhost:${process.env.REACT_APP_CLIENT_PORT}`, `http://127.0.0.1:${process.env.REACT_APP_CLIENT_PORT}`]
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

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
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