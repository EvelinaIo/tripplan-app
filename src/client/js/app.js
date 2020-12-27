/* This is the starting point of our functionality
 * An event listener is added to the button with generate id
 * After click all userInput is received to be stored in allData object
 * For dates inserted, if format received is dd-mm-yyyy it is first converted to yyyy-mm-dd
 * to hand over to getTimeRemaining in dateCount.js for the appropriate calculations to occur
 * Then allData is used as a parameter for all apiCalls
 * The response object from callApis is passed on to updateUI
*/

import {getTimeRemaining} from './dateCount.js';
import {callApis} from './apiCalls.js';
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
    let newDepart = document.getElementById('departure').value;
    console.log(`Departure: ${newDepart}`);
    if(newDepart == '') {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Please insert Departure Date';
        document.getElementById('departure').required = true;
        return
    }
    // Convert date to yyyy-mm-dd for calculations, if user is in Safari - see below
    newDepart = convertDate(newDepart);

    // Get return date
    let newReturn = document.getElementById('return').value;
    console.log(`Return: ${newReturn}`);
    if(newReturn == '') {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Please insert Return Date';
        document.getElementById('return').required = true;
        return
    }
    // Convert date to yyyy-mm-dd for calculations, if user is in Safari - see below
    newReturn = convertDate(newReturn);

    /* Initiate calculations*/
    // New date instance
    let nowDate = new Date();
    // Set UTC hours to 00:00:00:00 to make sure we get an even number of days each time
    // endtime by default returns UTC 00:00:00:00
    nowDate.setUTCHours(0,0,0,0);
    // Calculate days untile departure, return and trip duration
    const daysUntilDepart = getTimeRemaining(newDepart, nowDate);
    const daysUntilReturn = getTimeRemaining(newReturn, nowDate);
    const tripDuration = daysUntilReturn - daysUntilDepart;
    console.log(tripDuration);

    // Check if return date is not sooner that departure
    if (tripDuration<0) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Your Return is sooner that your Depart. Please insert valid dates.';
        document.getElementById('return').required = true;
        return
    }

    // Check if dates are in the past - getTimeRemaining returns null for negative amount of days
    if (daysUntilDepart == null || daysUntilReturn == null) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Sorry, no time travel available. Please insert valid dates.';
        document.getElementById('return').required = true;
        return
    }
    
    // Initiate allData object to store all user input
    let allData = {};
    // Store newDepart and newReturn 
    allData["userInput"]= { newLocation , newDepart: displayDate(newDepart), newReturn: displayDate(newReturn), daysUntilDepart, daysUntilReturn, tripDuration };

    // Run callApis function to retrieve all data from api calls, then updateUI using that data
    callApis(allData)
    // Update UI with data from user and all 3 external apis
    .then(res => updateUI(res))
    .catch(error => {
        console.log(error);
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Sorry, there was a server error. Please try again later';
    })
}

/* Here we convert the date input format.
 * From Chrome we receive a format of yyyy-mm-dd and from Safari we receive dd-mm-yyyy.
 * To make sure that we calculate the days properly we need to format the date to yyyy-mm-dd.
*/

// This regex describes the dd-mm-yyyy format
const date_regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
// We check if the input date matched the regex and proceed to conversion
export const convertDate = (dateString) => {
    if (!(date_regex.test(dateString))) {
      const okDate = dateString;
      console.log('It is OK');
      return okDate;
    } else {
      const thisDate = dateString.split('/');
      console.log(thisDate);
      const newDate = [thisDate[2],thisDate[1],thisDate[0] ].join("-");

      return newDate;
    }         
  }

// Format date received from yyyy/mm/dd to  display as dd.mm.yy - For later use in updateUI
export const displayDate = (input) => {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'.'+month+'.'+year;
  }