/* Here we update UI based on data received from apis
 * createWeather function is imported as a special treatment to weather display
*/
import {createWeather} from './weatherCards.js';

export const updateUI = (allData) => {
        const button = document.getElementById('generate');
        const headline = document.querySelector('.headline');
        const container = document.querySelector('.container');

        /* Remove form elements to update with results */
        const input = document.querySelectorAll('.holder');
        input.forEach(a=>a.remove());
        button.remove();

        /* Pixabay photo as background */
        Object.assign(container.style, {background: `url(${allData.photoData.photoUrl}), rgba(11, 11, 11, 0.25)`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply'});
        
        // Change headline title
        headline.innerHTML = `${allData.userInput.newLocation}`.toUpperCase();

        // Add location details - headline child
        const location = allData.userInput.newLocation;
        // To display Location make sure 1st letter is upper case and rest are lower case
        const finLocation = capitalizeFirstLetter(location);
        const placeDet = document.createElement('p');
        placeDet.innerHTML = `${finLocation} is located in ${allData.cityData.country}, with a population of ${allData.cityData.population} people.`;
        placeDet.style.fontSize = '16px';
        headline.appendChild(placeDet);


        /* Update the form with results.
        * Create document fragment to append children for better performance.
        */ 
        const fragment = document.createDocumentFragment();
        const form = document.querySelector('.form');

        /* Dates Div */
        const dates = document.createElement('div');
        dates.className = 'holder';
        dates.innerHTML = `${allData.userInput.newDepart} - ${allData.userInput.newReturn}`;
        Object.assign(dates.style, {justifyContent : 'center', fontSize: '24px', marginBottom: '3px'});
        
        /* Time Until Trip Div */
        const timeUntil = document.createElement('div');
        timeUntil.className = 'holder';
        if (allData.userInput.daysUntilDepart === 1) {
            timeUntil.innerHTML = `Your ${allData.userInput.tripDuration}-day trip to ${finLocation} is in ${allData.userInput.daysUntilDepart} day.`
        } else if (allData.userInput.daysUntilDepart === 0){
            timeUntil.innerHTML = `Your ${allData.userInput.tripDuration}-day trip to ${finLocation} is today!`
        } else {
            timeUntil.innerHTML = `Your ${allData.userInput.tripDuration}-day trip to ${finLocation} is in ${allData.userInput.daysUntilDepart} days.`
        }
        Object.assign(timeUntil.style, {justifyContent : 'center', fontSize: '20px', marginTop: '10px'});

        // Append Date and Time Until Trip to Fragment
        fragment.appendChild(dates);
        fragment.appendChild(timeUntil);


        /* Weather Cards
        Call createWeather function for each day of weatherData */
        const weather = document.createElement('div');
        weather.className = 'weather';
        const forecasts = allData.weatherData;
        const forecastsLength = allData.weatherData.length;

        for(const forecast of forecasts) {
            const weatherCard = createWeather(forecast);
            weather.appendChild(weatherCard);
        }

        // If trip duration is longer than the weatherData Array, no weather data available
        // Weatherbit api provides a 16-day forecast
        if (forecastsLength < allData.userInput.tripDuration) {
            const noWeather = document.createElement('div');
            noWeather.innerHTML = 'Sorry, no weather available for these dates.';
            noWeather.className ='cards';
            weather.appendChild(noWeather);
        }

        fragment.appendChild(weather);

        /* Print Button */
        const printBtn = document.createElement('div');
        printBtn.className = 'holder';
        printBtn.innerHTML = '<button onclick="window.print(); return false;" class="btn-print no-print"">Print Trip</button>';

        /* Return to homepage button */
        const returnBtn = document.querySelector('.btn-return');
        returnBtn.style.display = 'block';
        fragment.appendChild(printBtn);

        // Append whole fragment back to DOM element form
        form.appendChild(fragment);
   
}

// Make sure that location received will be displayed as Abcd in paragraph
export const capitalizeFirstLetter = (string) => {return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();}