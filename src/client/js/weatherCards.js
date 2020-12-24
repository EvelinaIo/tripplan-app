export function createWeather(forecast) {

    const weatherCard = document.createElement('div');
    weatherCard.className = 'cards';
    const date = document.createElement('div');
    Object.assign (date.style, {background: '#3FCDAA', padding: '3px', color: '#fafafa'})
    const description = document.createElement('div');
    date.innerHTML = `${forecast.validDate}`;
    description.innerHTML =  `${forecast.description}`;

    const iconTemp = document.createElement('div');
    iconTemp.innerHTML = `<img class="icon" src="https://www.weatherbit.io/static/img/icons/${forecast.icon}.png" alt="Weather Icon" width="40px">${forecast.temp}\xb0C`;
    
    weatherCard.appendChild(date);
    weatherCard.appendChild(description);
    weatherCard.appendChild(iconTemp);

    return weatherCard;
    
}