// Entry point for Webpack build tool
import { performAction } from './js/app.js';
import { getTimeRemaining } from './js/dateCount.js';
import { callApis } from './js/apiCalls.js';
import { postData } from './js/apiCalls.js';
import { callServer } from './js/apiCalls.js';
import { convertDate } from './js/app.js';
import { displayDate } from './js/app.js';
import { updateUI } from './js/resultsUI.js';
import { capitalizeFirstLetter } from './js/resultsUI';
import { createWeather } from './js/weatherCards.js'

import menu from './media/menu.svg';
import search from './media/search.svg';

import './styles/resets.scss';
import './styles/media-queries.scss';
import './styles/form.scss';
import './styles/base.scss';
import './styles/weather.scss';


// Export functions to Client library
export {
    performAction,
    getTimeRemaining,
    callApis,
    postData,
    callServer,
    convertDate,
    displayDate,
    updateUI,
    capitalizeFirstLetter,
    createWeather
}