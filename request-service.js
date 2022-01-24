const moment = require('moment');
const fs = require('fs');

exports.CalculateRequestedDays = (rCheckInDate, rCheckOutDate) => {
    var numOfDays;

    var checkInDate = moment(rCheckInDate, 'YYYY-MM-DD');
    var checkOutDate = moment(rCheckOutDate, 'YYYY-MM-DD');

    numOfDays = checkOutDate.diff(checkInDate, 'days');

    return numOfDays;
}

exports.ReserveRequest = proposedReservation => {
    fs.readFile('./reservations.json', function (err, data) {
        var json = JSON.parse(data);
        json.push(proposedReservation);
        fs.writeFile('./reservation.json', JSON.stringify(json), function(err) {
            if(err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    });
};