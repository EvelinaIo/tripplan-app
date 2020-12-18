/* Global Variables */
const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}|${d.getDate()}|${d.getFullYear()}`;

// Add event listener for Generate
button.addEventListener('click', performAction);

// Promises for actions after click
export async function performAction(event) {
    event.preventDefault()

    // Initiate error message
    const errorMsg = document.getElementById('error-msg');
    errorMsg.style.display = 'none';
    errorMsg.innerHTML = '';
    
    // Get location
    const newLocation = document.getElementById('location').value;
    console.log(`Location: ${newLocation}`);
    if(newLocation == '') {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Please insert location';
        document.getElementById('location').required = true;
        return
    } 

    
     // Store data from api in apiData after running post request to server
     let geoData = await getGeo('http://localhost:8081/geo', newLocation)
     .then (geoData => {
         const latitude = geoData.geonames[0].lat;
         const longitude = geoData.geonames[0].lng;
         const country = geoData.geonames[0].countryName;
         const population = geoData.geonames[0].population;
         console.log(`Latitude: ${latitude}, Longitude:${longitude}, Country: ${country}, Population: ${population}`);
         const cityData = {latitude, longitude, country, population};
         console.log(cityData);
    })
}

// Async function to post url to our server and retrieve external api data
export async function getGeo(url, newLocation) {
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/plain',
            },
            // Body data type must match "Content-Type" header        
            body: newLocation,
            })
        try{
            const responseJSON = await response.json();
            return responseJSON;
        } catch(error) {
            console.log(error)
        }
    }
