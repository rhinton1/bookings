const reservServices = require('./reservation-services');
const roomServices = require('./room-services');
const requestServices = require('./request-service');

exports.BookResquest = (reservations,rooms,requests) => {
    var request;
    requests.forEach(request => {
        var reqID = request.id;
        var bedRequirement = request.min_beds;
        var requestCheckin = request.checkin_date;
        var requestCheckout = request.checkout_date;
        var smokeRequirement = request.is_smoker;
        var smokingRooms = [];
        var nonSmokingRooms = [];

        //check for available rooms
        var availableRoomsByDate =  reservServices.CheckDates(requestCheckin, reservations, rooms);    
        var requestNumOfDays = requestServices.CalculateRequestedDays(requestCheckin, requestCheckout);

        if (smokeRequirement) {
            var availableSmokingRooms = roomServices.ReturnSmokingRooms(availableRoomsByDate, rooms);

            if (bedRequirement = 2) {
                var doubleBedRooms = roomServices.ReturnDoubleBedRooms(availableSmokingRooms);
                var doubleLowestRate = roomServices.GetLowestRate(doubleBedRooms, requestNumOfDays);

                var proposedDoubleRerservation = {
                    "room_id": doubleLowestRate.id,
                    "checkin_date": requestCheckin,
                    "checkout_date": requestCheckout,
                    "total_charge": doubleLowestRate.total_charge
                };

                requestServices.ReserveRequest(proposedDoubleRerservation);
            }

            var lowestRate = roomServices.GetLowestRate(availableSmokingRooms, requestNumOfDays);
            var proposedRerservation = {
                "room_id": lowestRate.id,
                "checkin_date": requestCheckin,
                "checkout_date": requestCheckout,
                "total_charge": lowestRate.total_charge
            };

            requestServices.ReserveRequest(proposedRerservation);
        } else {
            var availableNonSmokingRooms = roomServices.ReturnNonSmokingRooms(availableRoomsByDate, rooms);

            if (bedRequirement = 2) {

            }
        }

    });
}

