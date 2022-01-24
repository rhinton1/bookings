const moment = require('moment');

exports.CalculateRequestedDays = (rCheckInDate, rCheckOutDate) => {
    var numOfDays;

    var checkInDate = moment(rCheckInDate, 'YYYY-MM-DD');
    var checkOutDate = moment(rCheckOutDate, 'YYYY-MM-DD');

    numOfDays = checkOutDate.diff(checkInDate, 'days');

    return numOfDays;
}

exports.ReserveRequest = (proposedReservation) => {};