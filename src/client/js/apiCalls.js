/* Here we make all api calls using the object allData and the respective urls
 * Fist we post the userInput in /postData url
 * Then we make calls to all server urls concerning our apis
 * Then we store all data received from get calls to the finalData object
 * The finalData object will be used to updateUI, if server calls fail null is returned and an error message is displayed
*/
const fetch = require('node-fetch')

export const callApis = async (allData) => {
    // Post userInput data to server
    await postData('http://localhost:8081/postData', allData)
    const getURL = ['geo', 'weather', 'photo'];
    // Request data from 3 urls
    await callServer(`http://localhost:8081/${getURL[0]}`)
    await callServer(`http://localhost:8081/${getURL[1]}`)
    await callServer(`http://localhost:8081/${getURL[2]}`)
    // Store all data in finalData after requesting all info from the getData url
    const finalData = await callServer('http://localhost:8081/getData')

    return finalData;
}

// Async function to post allData to our server
export const postData = async (url, allData) => {
    console.log(url);
    try {const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/JSON',
            },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(allData)
    });
    const responseJSON = await response.json();
    return responseJSON;
    } catch (error) {
        console.log(error)
        return null
    }
}
// Async function to post allData to our server and retrieve external api data
export const callServer= async (url) => {  
    console.log(url);
    const request = await fetch(url)
    try {
        const receivedData = await request.json();
        return receivedData;
    } catch (error) {
        console.log(error);
        return null
    }
}

