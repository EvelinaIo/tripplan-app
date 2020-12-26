/* Here we calculate days between two dates */

export function getTimeRemaining(endtime, nowTime){
    // The Date.parse() function converts a time string into a value in milliseconds
    // This allows us to subtract two times from each other and get the amount of time in between
    const endDate = new Date(endtime).toISOString();
    console.log(endDate);
    // Create a variable total, to hold the remaining time until the deadline
    const total = Date.parse(endDate) - Date.parse(nowTime);
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