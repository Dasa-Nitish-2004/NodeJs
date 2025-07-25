const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./connection');

const port = 3000;

const {urlRoutes, statRoute} = require('./routes/url');

// if you want to send data by forms
app.use(express.urlencoded({ extended: true }));
// if you want to send data by json
app.use(express.json());

// forwarding routes
app.use('/url', urlRoutes);
// static path route
app.use('/', statRoute);


// server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve ("./views"));

// connect database
connectDB('mongodb://localhost:27017/urlShortener').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

