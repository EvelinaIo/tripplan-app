// Create a new date instance dynamically with JS
let nowDate = new Date();
// Set UTC hours to 00:00:00:00 to make sure we get an even number of days each time
// endtime by default returns UTC 00:00:00:00
nowDate.setUTCHours(0,0,0,0);
// Convert to ISO as the date we receive from date picker
console.log(nowDate.toISOString());

export function getTimeRemaining(endtime){
    // Create a variable total, to hold the remaining time until the deadline
    //The Date.parse() function converts a time string into a value in milliseconds
    //This allows us to subtract two times from each other and get the amount of time in between
    const endDate = new Date(endtime).toISOString();
    console.log(endDate);
    const total = Date.parse(endDate) - Date.parse(nowDate);
    // Convert the milliseconds to days
    const days = Math.floor( total/(1000*60*60*24));
    console.log(days);

    if (days<0){
      console.log("Date inserted is in the past")
      return null
    } else {
      console.log(days);
      return days;
    }
  }


