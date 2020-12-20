import {getTimeRemaining} from './dateCount.js'
import {extractCityData} from './extractions.js'
/* Global Variables */
const button = document.getElementById('generate');

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

    // Get departure date
    const newDepart = document.getElementById('departure').value;
    console.log(`Departure: ${newDepart}`);
    if(newDepart == '') {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Please insert Departure Date';
        document.getElementById('departure').required = true;
        return
    }

    // Get return date
    const newReturn = document.getElementById('return').value;
    console.log(`Return: ${newReturn}`);
    if(newReturn == '') {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Please insert Return Date';
        document.getElementById('return').required = true;
        return
    }

    const daysUntilDepart = getTimeRemaining(newDepart);
    const daysUntilReturn = getTimeRemaining(newReturn);
    const tripDuration = daysUntilReturn - daysUntilDepart;

    if (tripDuration<0) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Your Return is sooner that your Depart. Please insert valid dates.';
        document.getElementById('return').required = true;
        return
    }
    
    

    // Store data from api in geoData after running post request to server
    let geoData = await getGeo('http://localhost:8081/geo', newLocation)
    .then (geoData => extractCityData(geoData))

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
            const geoJSON = await response.json();
            return geoJSON;
        } catch(error) {
            console.log(error)
        }
}

// Call 16 day forecast if timeUntilDepart is < 16 days
// Call Historical weather if timeUntilDepart is > 16 days
