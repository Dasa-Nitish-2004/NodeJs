const express = require('express');
const urlRoutes = require('./routes/url');
const { connectDB } = require('./connect');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/url", urlRoutes);

connectDB('mongodb://localhost:27017/urlShortener').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});