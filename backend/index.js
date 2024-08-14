const express = require('express');
const mongoose = require('mongoose'); 
require('dotenv').config();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

const app = express(); // Create an instance of an Express application
var cors = require('cors');

const hostname = '127.0.0.1'; 
const port = 5000;


// Middleware to parse JSON bodies from incoming requests
app.use(express.json());
// Middleware to parse URL-encoded bodies from incoming requests
app.use(express.urlencoded({ extended: true }));

app.use(cors());// Allow all origins
// Alternatively, configure specific origins
// app.use(cors({ origin: 'http://localhost:3000' }));

app.options('*', cors());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://admin:2juCnYdWsadx9nsw@himal-cluster.dwkmq5k.mongodb.net/?retryWrites=true&w=majority&appName=Himal-Cluster')
.then(res => {
    console.log("Connected to DB Successfully"); // Log success message if connected
}).catch(err => {
    console.log(err); // Log error message if connection fails
});

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Send 'Hello, World!' response for GET requests to '/'
});

app.use('/api/users', authRoute);
app.use('/api/users', userRoute);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`); // Log the URL where the server is running
});
