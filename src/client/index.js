// Entry point for Webpack build tool

import {getGeo} from './js/app.js';
import {performAction} from './js/app.js';

import menu from './media/menu.svg';
import search from './media/search.svg';

import './styles/_colors-typo.scss'
import './styles/resets.scss';
import './styles/form.scss';
import './styles/media-queries.scss';
import './styles/base.scss'

alert('I EXIST');


export {
    getGeo,
    performAction
}