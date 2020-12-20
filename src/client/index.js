// Entry point for Webpack build tool
import {performAction} from './js/app.js';
import {getGeo} from './js/app.js';
import {getTimeRemaining} from './js/dateCount.js';
import {extractCityData} from './js/extractions.js'

import menu from './media/menu.svg';
import search from './media/search.svg';

import './styles/resets.scss';
import './styles/form.scss';
import './styles/media-queries.scss';
import './styles/base.scss'

alert('I EXIST');

// Export functions to Client library
export {
    getTimeRemaining,
    performAction,
    getGeo,
    extractCityData
}