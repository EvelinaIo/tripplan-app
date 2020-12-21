const fetch = require('node-fetch')
import {extractCityData} from './extractions.js'
import {extractWeatherData} from './extractions.js'

export async function callApis (allData) {
    //Call Geonames Api
    const geoData = await callServer('http://localhost:8081/geo', allData)
    allData['cityData'] = extractCityData(geoData);
    console.log(allData.cityData);

    const weatherData = await callServer('http://localhost:8081/weather', allData)
    allData['weatherData'] = extractWeatherData(weatherData, allData);
    
    console.log(allData.weatherData);
    return allData;
}

// Async function to post url to our server and retrieve external api data
export async function callServer(url, allData) {
    console.log(url);
    console.log(allData.cityData);
    try {
        const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/JSON',
            },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(allData)
        });
        const responseJSON = await response.json();
        return responseJSON;
        } catch(error) {
            console.log(error)
        }
}