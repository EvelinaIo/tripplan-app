/*  Here we check the callServer function with geonames api
 *  Special thanks to Leigh Halliday for his example of Mock Jest
 *  in https://www.leighhalliday.com/mock-fetch-jest
*/

import {callServer} from "../src/client/js/apiCalls.js"
import {postData}  from "../src/client/js/apiCalls.js"
/*  Override the global.fetch function with our own fake/mock version of it.
 *  Calling fetch means that we are dealing with two promises, one for fetch and one for json()*/
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Geolocation Received' }),
  })
);

it("Receives a confirmation message when called with url", async () => {
    const apiURL = "http://localhost:8081/geo"
    // We first have to post the userInput to postData
    const allData = {
        userInput: {
            newLocation: 'London' ,
            newDepart: '25.12.20',
            newReturn: '27.12.20',
            daysUntilDepart: 1,
            daysUntilReturn: 3,
            tripDuration: 2
        }
    }
    await postData('http://localhost:8081/postData', allData)
    const response = await callServer(apiURL);

    expect(response).toEqual({ message: 'Geolocation Received' });
});