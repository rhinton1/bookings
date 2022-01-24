const moment = require('moment');

exports.CheckDates = (reqCheckinDate, reqCheckoutDate, reservations, rooms) => {
    var availableRoomsList = [];
    var roomsList = [];

    rooms.forEach(room => {
        roomsList.push(room.id);
    });

    reservations.forEach(reservation => {
        var roomID = reservation.room_id;
        var reservCheckout = reservation.checkout_date;
        var reservCheckin = reservation.checkin_date;

        // if(!moment(reservCheckout).isBefore(reqCheckinDate) || !moment(reservCheckout).isSame(reqCheckinDate)) {
        //     nonAvailableRoomList.push(roomID);
        // }

        if(moment(reservCheckin).isAfter(reqCheckinDate) && moment(reservCheckout).isAfter(reqCheckoutDate) || moment(reservCheckout).isBefore(reqCheckinDate))
        { availableRoomsList.push(roomID);}
    });

    //var availableRoomsList = roomsList.filter(i => nonAvailableRoomList.indexOf(i)===-1);
        
    return availableRoomsList;
}

