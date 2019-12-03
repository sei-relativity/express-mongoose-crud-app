// Require NPM Packages
const express = require('express');
const mongoose = require('mongoose');

// Require routes files
const fruitRoutes = require('./app/routes/fruit_routes')

// Require DB configuration file
const db = require('./config/db')

// PORT
const port = 5051;

// Create Express App
const app = express();


// Establish DB connection
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
    console.log("Connected to MongoDB")

});
// mongoose.connection.once('open', () => {
// });

/*** Middleware ***/
// Add bodyParser middleware
app.use(express.json())


/*** Routes ***/
app.use(fruitRoutes);


// Run API on designated port
app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});