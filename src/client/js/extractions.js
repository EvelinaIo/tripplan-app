export function extractCityData(geoData) {
    const latitude = geoData.geonames[0].lat;
    const longitude = geoData.geonames[0].lng;
    const country = geoData.geonames[0].countryName;
    const population = geoData.geonames[0].population;
    console.log(`Latitude: ${latitude}, Longitude:${longitude}, Country: ${country}, Population: ${population}`);

    return {latitude, longitude, country, population};
} 

export function extractWeatherData(weatherData, allData) {
    // Initiate an array to hold forecast data for each trip day
    const forecastData = [];

    const daysUntilDepart = allData.userInput.daysUntilDepart;
    console.log(daysUntilDepart);
    const daysUntilReturn = allData.userInput.daysUntilReturn;
    console.log(daysUntilReturn);

    let lastWeatherDay = 15;
    if (daysUntilReturn<=15) {
        lastWeatherDay = daysUntilReturn;
    }

    for(let i=daysUntilDepart; i<=lastWeatherDay; i++){
        const date = weatherData.data[i].valid_date;
        const temp = weatherData.data[i].temp;
        const description = weatherData.data[i].weather.description;
        const icon = weatherData.data[i].weather.icon;

        const validDate = formatDate(date);
        // Push each day (i) as an object to the array
        forecastData.push({validDate, temp, description, icon})
        console.log(forecastData);
    }

    return forecastData;
}

function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'.'+month+'.'+year;
  }