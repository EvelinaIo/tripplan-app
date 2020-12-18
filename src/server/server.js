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
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

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

app.post('/geo', geoResponse)

async function geoResponse(req, res) {
    console.log(`Location is: ${req.body}`);
    const GEO_LOC = req.body;
    const newGeoUrl = GEO_BASE + GEO_LOC + GEO_ROWS + GEO_USER;
    console.log(newGeoUrl);
    const geoResponse = await fetch(newGeoUrl);
    try {
        const geoJSON = await geoResponse.json();
        console.log(geoJSON);
        res.send(geoJSON);
    } catch(error){
        console.log(error);
    }
}
