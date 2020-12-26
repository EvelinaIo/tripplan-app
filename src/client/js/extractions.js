/* Here we make all data extractions from the 3 external apis
 * All data retrieved is stored as objects with respective names in object allData
*/

// Geonames Api data
export function extractCityData(geoData) {
    const latitude = geoData.geonames[0].lat;
    const longitude = geoData.geonames[0].lng;
    const country = geoData.geonames[0].countryName;
    const population = geoData.geonames[0].population;
    console.log(`Latitude: ${latitude}, Longitude:${longitude}, Country: ${country}, Population: ${population}`);

    return {latitude, longitude, country, population};
} 

// Weatherbit Api data
export function extractWeatherData(weatherData, allData) {
    // Initiate an array to hold forecast data for each trip day
    const forecastData = [];

    const daysUntilDepart = allData.userInput.daysUntilDepart;
    const daysUntilReturn = allData.userInput.daysUntilReturn;

    // Weatherbit returns a 16 day forecast, so the last day of the forecast received is in place 15
    let lastWeatherDay = 15;
    if (daysUntilReturn<=15) {
        lastWeatherDay = daysUntilReturn;
    }

    // Make a for loop to store data for each weather day
    for(let i=daysUntilDepart; i<=lastWeatherDay; i++){
        const date = weatherData.data[i].valid_date;
        const temp = weatherData.data[i].temp;
        const description = weatherData.data[i].weather.description;
        const icon = weatherData.data[i].weather.icon;

        const validDate = displayDate(date);
        // Push each day (i) as an object to the array
        forecastData.push({validDate, temp, description, icon})
        console.log(forecastData);
    }

    return forecastData;
}

// Pixabay Api data
export function extractPhotoData(photoData) {
    const photoUrl = photoData.hits[0].largeImageURL;
    const pageUrl = photoData.hits[0].pageURL;

    return {photoUrl, pageUrl};
} 

// Format date received from yyyy/mm/dd to  display as dd.mm.yy - For later use in updateUI
export function displayDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'.'+month+'.'+year;
  }