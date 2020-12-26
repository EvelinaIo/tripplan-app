/* Here we make all api calls using the object allData
 * allData stores all variables from userInput
 * Then by making a server call stores data in respective objects 
*/

const fetch = require('node-fetch')
import {extractCityData} from './extractions.js'
import {extractWeatherData} from './extractions.js'
import {extractPhotoData} from './extractions.js'

export async function callApis (allData) {
    //Call Geonames Api
    const geoData = await callServer('http://localhost:8081/geo', allData)
    allData['cityData'] = extractCityData(geoData);
    
    //Call Weatherbit Api
    const weatherData = await callServer('http://localhost:8081/weather', allData)
    allData['weatherData'] = extractWeatherData(weatherData, allData);
    
    //Call Pixabay Api
    const photoData = await callServer('http://localhost:8081/photo', allData)
    allData['photoData'] = extractPhotoData(photoData);
      
    return allData;
}

// Async function to post allData to our server and retrieve external api data
export async function callServer(url, allData) {
    console.log(url);
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