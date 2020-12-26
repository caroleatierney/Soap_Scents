// ******************************
// ******* DEPENDENCIES *********
// ******************************
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const soapController = require('./controllers/soapController.js')
require('dotenv').config()
// ******************************
// ************ PORT ************
// ******************************
const PORT = process.env.PORT

// ******************************
// ***********  MONGO ***********
// ******************************
// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// ******************************
// ******* ERROR/SUCCESS ********
// ******************************
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// ******************************
// ********  MIDDLEWARE *********
// ******************************
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
// soap controller
app.use(soapController);

// ****************************************
// ************** LISTENER ****************
// ****************************************
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
