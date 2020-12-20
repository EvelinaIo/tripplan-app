// Set up Environment variables
const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies*/
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8081;
const server = app.listen(port, ()=> {console.log(`Server is running on port ${port}`);})

app.get('/', (request, response) => {
    response.sendFile('/dist/index.html', { root: __dirname + '/..' })
})
//GET Route 
/*app.get('/getData', (request, response) => {
    console.log(projectData);
    response.send(projectData);
})*/

/* API call parts */
const GEO_USER = `&username=${process.env.GEO_USER}`;
const GEO_BASE = 'http://api.geonames.org/searchJSON?q=';
const GEO_ROWS = '&maxRows=1';

const WEATHER_BASE = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const WEATHER_KEY = `&key=${process.env.WEATHER_KEY}`;

// Initialize object allData to store all user/api responses and send back to client
const allData = [];

/* Geonames API */
app.post('/geo', geoResponse)

async function geoResponse(req, res) {
    console.log(req.body);
    console.log(`Location is: ${req.body.userInput.newLocation}`);
    const GEO_LOC = req.body.userInput.newLocation;
    const newGeoUrl = GEO_BASE + GEO_LOC + GEO_ROWS + GEO_USER;
    console.log(newGeoUrl);
    const response = await fetch(newGeoUrl);
    try {
        const responseJSON = await response.json();
        console.log(responseJSON);
        res.send(responseJSON);
    } catch(error){
        console.log(error);
    }
}

/* Weatherbit API */
app.post('/weather', weatherResponse)

async function weatherResponse(req, res) {
    console.log(`Lat & Lng is: ${req.body.cityData}`);
    const WEATH_LAT = req.body.cityData.latitude;
    const WEATH_LNG = req.body.cityData.longitude;
    const newWeathUrl = WEATHER_BASE + `lat=${WEATH_LAT}&lon=${WEATH_LNG}` + WEATHER_KEY;
    console.log(newWeathUrl);
    const weatherResponse = await fetch(newWeathUrl);
    try {
        const weatherJSON = await weatherResponse.json();
        console.log(weatherJSON);
        res.send(weatherJSON);
    } catch(error){
        console.log(error);
    }
}