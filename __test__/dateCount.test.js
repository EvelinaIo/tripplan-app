//  Here we check the getTimeRemaining function with two dates

import {getTimeRemaining} from "../src/client/js/dateCount.js"

describe('Test the function "getTimeRemaining()" for valid number of days' , () => {
    test('It should return 2', () => {
         const start = '2020-12-26';
         const end = '2020-12-28'
         const response = getTimeRemaining(end, start);
         expect(response).toBe(2);
    })
});