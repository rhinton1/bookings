const fs = require('fs');
const dataServices = require('./appservices');


console.log("Hotel Bookings");
const reservations = JSON.parse(fs.readFileSync('./reservations.json','utf-8'));
const rooms = JSON.parse(fs.readFileSync('./rooms.json','utf-8'));
const requests = JSON.parse(fs.readFileSync('./requests.json','utf-8'));

dataServices.BookResquest(reservations, rooms, requests);


console.log(reservations);
