const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes

app.get('/', (req, res) => {
    res.send('Hello Node API !')
})

const DB_CONNECTION_URL = process.env.REACT_APP_MONGO_ATLAS_CONNECTION_URL

mongoose.set("strictQuery", false);
mongoose.connect(`${DB_CONNECTION_URL}`).then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, () => {
        console.log('Node API app running on port 3000')
    })
}).catch((error) => {
    console.log(error)
})