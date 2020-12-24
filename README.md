# tripplan-app
A travel app that obtains a desired trip location &amp; date from the user, and displays weather and an image of the location using information obtained from external APIs. Capstone Project in the Front End Web Design Nanodegree from Udacity.

# TRIPPLAN APP - A travel api

## Description
The project creates a travel app that obtains a desired trip location &amp; departure/return dates from the user, and displays weather and an image of the location using information obtained from 3 external APIs. Uses Node and Express to run on a local server.

## Prerequisite
If you don't have Node already installed on your machine, you can download it [**here**](https://nodejs.org/en/download/).
You will also need API credentials for the following:
1. [**Geonames**](http://www.geonames.org/export/web-services.html) - Register and keep your username.
2. [**Weatherbit**](https://www.weatherbit.io/account/create) - API key
3. [**Pixabay**](https://pixabay.com/api/docs/) - API key

After you get your user name &amp; api keys, you can create a .env file in the root of your project and add these credentials.
```
API_KEY = ********************
```
For more information about the dotenv module visit this [**link**](https://www.npmjs.com/package/dotenv).

## Installation
If Node is installed, then you can use the Node Package Manager to install the packages needed to run this program. Use this command in the terminal:

```
npm install
```
When those packages have installed, make builds and start the server with the following commands.
For developer mode, which runs webpack-dev-server:
```
npm run build-dev
```
And for production mode, which uses the express server:
```
npm run build-prod
npm start
```
## Instructions for Use
Enter a location, e.g. London. Then a desired departure and return date.
If you have entered valid information, you will receive:
- infromation about the location (country &amp; population)
- the dates you inserted
- calculation of your trip duration and countdown to your departure
- a photo of the location
- a weather forecast for each day of your trip
- the ability to print your trip

## Author
The code was written by EvelinaIo, as part of Udacity's Front-End Development Nanodegree course, Capstone project submission.
