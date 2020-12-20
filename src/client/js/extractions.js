export async function extractCityData(geoData) {
    const latitude = geoData.geonames[0].lat;
    const longitude = geoData.geonames[0].lng;
    const country = geoData.geonames[0].countryName;
    const population = geoData.geonames[0].population;
    console.log(`Latitude: ${latitude}, Longitude:${longitude}, Country: ${country}, Population: ${population}`);
    const cityData = {latitude, longitude, country, population};
    console.log(cityData);

    return cityData;
} 