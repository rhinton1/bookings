const reservServices = require('./reservation-services');
const roomServices = require('./room-services');
const requestServices = require('./request-service');

exports.BookResquest = (reservations,rooms,requests) => {    
    requests.forEach(request => {
        var bedRequirement = request.min_beds;
        var requestCheckin = request.checkin_date;
        var requestCheckout = request.checkout_date;
        var smokeRequirement = request.is_smoker;

        //check for available rooms
        var availableRoomsByDate =  reservServices.CheckDates(requestCheckin, requestCheckout, reservations, rooms);    
        var requestNumOfDays = requestServices.CalculateRequestedDays(requestCheckin, requestCheckout);

        roomServices.ProcessSmokeRequirements(smokeRequirement, bedRequirement, availableRoomsByDate, requestNumOfDays, requestCheckin, requestCheckout,rooms);
    });
}

