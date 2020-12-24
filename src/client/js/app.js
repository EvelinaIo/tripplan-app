import {getTimeRemaining} from './dateCount.js';
import {callApis} from './apiCalls.js';
import {formatDate} from './extractions.js';
import {updateUI} from './resultsUI.js'

/* Global Variables */
const button = document.getElementById('generate');

// Add event listener for button with generate id
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

    // Calculate days untile departure, return and trip duration
    const daysUntilDepart = getTimeRemaining(newDepart);
    const daysUntilReturn = getTimeRemaining(newReturn);
    const tripDuration = daysUntilReturn - daysUntilDepart;
    console.log(tripDuration);

    // Make sure return date is not sooner that departure
    if (tripDuration<0) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Your Return is sooner that your Depart. Please insert valid dates.';
        document.getElementById('return').required = true;
        return
    }

    if (daysUntilDepart == null || daysUntilReturn == null) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Sorry, no time travel available. Please insert valid dates.';
        document.getElementById('return').required = true;
        return
    }
    
    // Initiate allData object to store all user input
    let allData = {};
    // Store newDepart and newReturn 
    allData["userInput"]= { newLocation , newDepart: formatDate(newDepart), newReturn: formatDate(newReturn), daysUntilDepart, daysUntilReturn, tripDuration };
    
    // Run callApis function to retrieve all data from api calls, then updateUI using that data
    allData = await callApis(allData);

    // Update UI with data from user and all 3 external apis
    updateUI(allData);
}

