import {getTimeRemaining} from './dateCount.js';
import {callApis} from './apiCalls.js';
import {formatDate} from './extractions.js';

/* Global Variables */
const button = document.getElementById('generate');
const headline = document.querySelector('.headline');
const container = document.querySelector('.container');

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
    
    // Initiate allData object to store all user input
    let allData = {};
    allData["userInput"]= { newLocation, newDepart: formatDate(newDepart), newReturn: formatDate(newReturn), daysUntilDepart, daysUntilReturn, tripDuration };
    console.log(allData);
    
    // Run callApis function to retrieve all data from api calls, then updateUI using that data
    allData = await callApis(allData);


    updateUI(allData);
}

function updateUI(allData) {
    console.log('I reached this part!');    
}


// Call 16 day forecast if timeUntilDepart is < 16 days
// Call Historical weather if timeUntilDepart is > 16 days
