// Entry point for Webpack build tool
import {performAction} from './js/app.js';
import {getTimeRemaining} from './js/dateCount.js';
import {callApis} from './js/apiCalls.js';
import {callServer} from './js/apiCalls.js';
import {extractCityData} from './js/extractions.js';
import {extractPhotoData} from './js/extractions.js';
import {updateUI} from './js/resultsUI.js'

import menu from './media/menu.svg';
import search from './media/search.svg';

import './styles/resets.scss';
import './styles/media-queries.scss';
import './styles/form.scss';
import './styles/base.scss';
import './styles/weather.scss';


// Export functions to Client library
export {
    getTimeRemaining,
    performAction,
    callApis,
    callServer,
    extractCityData,
    extractPhotoData,
    updateUI
}