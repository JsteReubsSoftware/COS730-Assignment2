const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use("/api", require("./routes/loginRoutes"))
app.use("/api", require("./routes/userRoutes"))

// ------------------ API endpoints ------------------

// add user
// app.post('/api/addUser', async (req, res) => {
//     try {
//         // check if user has already been added
//         const oldUser = await Users.findOne({email: req.body.email});
//         if (oldUser) {
//             return res.status(409).json({message: 'User already exists'});
//         }
//         const user = await Users.create({
//             name: req.body.name,
//             email: req.body.email,
//             profileImg: req.body.picture
//         });

//         const token = jwt.sign({ id: user._id }, secretKey, {
//             expiresIn: expireTime,
//         });

//         res.status(200).json({user, token});
//     } catch(error) {
//         res.status(500).json({message: error.message})
//     }
// });

// // get all users
// app.get('/api/getUsers', async (req, res) => {
//     try {
//         // first check the token and expire time of it
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             // Handle missing header (e.g., return error)
//             return res.status(401).json({ message: 'Unauthorized: Missing Authorization header' });
//         }
        
//         if (authHeader.startsWith('Bearer ')) {
//             const token = authHeader.split(' ')[1]; // Extract the token value after 'Bearer '
//             // Use the extracted token for further processing (e.g., JWT verification)
//             if (!token) {
//                 return res.status(401).json({ message: 'Access denied. No Autherization Header provided.' });
//             }
//             const decoded = jwt.verify(token, secretKey);
//             if (!decoded) {
//                 return res.status(401).json({ message: 'Invalid token.' });
//             }

//             const currentTime = Math.floor(Date.now() / 1000);
//             if (decoded.exp < currentTime) {
//                 return res.status(401).json({ message: 'Token expired. Please login again.' });
//             }

//             // get all users
//             const users = await Users.find();
//             res.status(200).json(users);
//         } else {
//             // Handle invalid header format (e.g., not using Bearer scheme)
//             return res.status(401).json({ message: 'Unauthorized: Invalid Authorization format' });
//         }
//     } catch(error) {
//         res.status(500).json({message: error.message})
//     }
// });
  

// ---------------------------------------------------

// Setup DB connection and server
const PORT = process.env.REACT_APP_PORT || 3000;
const DB_CONNECTION_URL = process.env.REACT_APP_MONGO_ATLAS_CONNECTION_URL

mongoose.set("strictQuery", false);
mongoose.connect(`${DB_CONNECTION_URL}`).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Node API app running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})