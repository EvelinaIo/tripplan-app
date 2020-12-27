// Set up Environment variables
const dotenv = require('dotenv');
dotenv.config();

// Import extraction functions as module
const extract = require('./extractions');

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


/* API call parts */
const GEO_USER = `&username=${process.env.GEO_USER}`;
const GEO_BASE = 'http://api.geonames.org/searchJSON?q=';
const GEO_ROWS = '&maxRows=1';

const WEATHER_BASE = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const WEATHER_KEY = `&key=${process.env.WEATHER_KEY}`;

const PIXABAY_KEY = `key=${process.env.PIXABAY_KEY}`;
const PIXABAY_TYPE = '&image_type=photo';
const PIXABAY_BASE = 'https://pixabay.com/api/?'

// Initialize object allData to store all user/api responses and send back to client
let allData = {};

app.post('/postData', (req, res) =>{
    let inputData = req.body;
    console.log(inputData);
    allData = inputData
    res.send(allData);
})

/* Geonames API */
app.get('/geo', geoResponse)

async function geoResponse(req, res) {
    console.log(`Location is: ${allData.userInput.newLocation}`);
    const GEO_LOC = allData.userInput.newLocation;
    const newGeoUrl = GEO_BASE + GEO_LOC + GEO_ROWS + GEO_USER;
    console.log(newGeoUrl);
    const response = await fetch(newGeoUrl);
    try {
        const geoJSON = await response.json();
        allData['cityData'] = extract.extractCityData(geoJSON);
        res.send({message: 'Geolocation Received'});
        console.log(allData);
        return allData;
    } catch(error){
        console.log(error);
    }
}

/* Weatherbit API */
app.get('/weather', weatherResponse)

async function weatherResponse(req, res) {
    console.log(req.body);
    const WEATH_LAT = allData.cityData.latitude;
    const WEATH_LNG = allData.cityData.longitude;
    const newWeathUrl = WEATHER_BASE + `lat=${WEATH_LAT}&lon=${WEATH_LNG}` + WEATHER_KEY;
    console.log(newWeathUrl);
    const weatherResponse = await fetch(newWeathUrl);
    try {
        const weatherJSON = await weatherResponse.json();
        allData['weatherData'] = extract.extractWeatherData(weatherJSON, allData);
        res.send({message: 'Weather Received'});
        return allData;
    } catch(error){
        console.log(error);
    }
}

/* Pixabay API */
app.get('/photo', photoResponse)

async function photoResponse(req, res) {
    console.log(`Location: ${allData.userInput.newLocation}`);
    const PIXABAY_PLACE = `&q=${allData.userInput.newLocation}`;
    
    const newPhotoUrl = PIXABAY_BASE + PIXABAY_KEY +PIXABAY_PLACE + PIXABAY_TYPE;
    console.log(newPhotoUrl);
    const photoResponse = await fetch(newPhotoUrl);
    try {
        const photoJSON = await photoResponse.json();
        allData['photoData'] = extract.extractPhotoData(photoJSON);
        res.send({ message: 'Photo Received'});
        return allData;
    } catch(error){
        console.log(error);
    }
}

/* GET Route */
app.get('/getData', (req,res)=>{
    console.log(allData);
    res.send(allData);
})