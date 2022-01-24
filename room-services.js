const requestServices = require('./request-service');

exports.ProcessSmokeRequirements = (smokeRequirement, bedRequirement, availableRoomsByDate, requestNumOfDays, requestCheckin, requestCheckout, roomsList) => {
    if(smokeRequirement) {
        var availableSmokingRooms = ReturnSmokingRooms(availableRoomsByDate, roomsList);
        ProcessBedRooms(bedRequirement, requestNumOfDays, availableSmokingRooms, requestCheckin, requestCheckout);
    } else {
        var availableNonSmokingRooms = ReturnNonSmokingRooms(availableRoomsByDate, roomsList);
        ProcessBedRooms(bedRequirement, requestNumOfDays, availableNonSmokingRooms, requestCheckin, requestCheckout);
    }
}

function ProcessBedRooms(bedRequirement, requestNumOfDays, roomsList, requestCheckin, requestCheckout) {
    if (bedRequirement === 2) {
        ProessDoubleBedRooms(roomsList, requestNumOfDays, requestCheckin, requestCheckout);
    } else {
        ProcessSingleBedRooms(roomsList, requestNumOfDays, requestCheckin, requestCheckout);
    }
}

function ReturnSmokingRooms(roomIDs, roomsList) {
    var smokingRooms = [];

    roomIDs.forEach(roomId => {
        var room = roomsList.filter(obj => {
            return obj.id === roomId;
        });

        if(room[0].allow_smoking) smokingRooms.push(room[0]);
    })
    return smokingRooms;
};

function ReturnNonSmokingRooms(roomIDs, roomsList) {
    var nonSmokingRooms = [];

    roomIDs.forEach(roomId => {
        var room = roomsList.filter(obj => {
            return obj.id === roomId;
        });

        if(!room[0].allow_smoking) nonSmokingRooms.push(room[0]);
    })

    return nonSmokingRooms;
};

function ReturnDoubleBedRooms(roomsList) {
    var doubleBedRooms = roomsList.filter(obj => {
        return obj.num_beds === 2
    });
    return doubleBedRooms;
};

function ProessDoubleBedRooms(roomsList, requestNumOfDays, requestCheckin, requestCheckout) {    
    var doubleBedRooms = ReturnDoubleBedRooms(roomsList);
    var doubleLowestRate = GetLowestFinalRate(doubleBedRooms, requestNumOfDays);

    var proposedDoubleRerservation = {
        "room_id": doubleLowestRate.id,
        "checkin_date": requestCheckin,
        "checkout_date": requestCheckout,
        "total_charge": doubleLowestRate.total_charge
    };

    requestServices.ReserveRequest(proposedDoubleRerservation);
};

function ProcessSingleBedRooms (roomsList, requestNumOfDays, requestCheckin, requestCheckout) {
    var lowestRate = GetLowestFinalRate(roomsList, requestNumOfDays);
    var proposedRerservation = {
        "room_id": lowestRate.id,
        "checkin_date": requestCheckin,
        "checkout_date": requestCheckout,
        "total_charge": lowestRate.total_charge
    };

    requestServices.ReserveRequest(proposedRerservation);
};

function GetLowestFinalRate (roomsList, numOfDays) {
    var finalPrices = [];
    roomsList.forEach(room => {
        var roomFinalPrice = (room.daily_rate * numOfDays) + room.cleaning_fee;
        finalPrices.push({"id": room.id, "total_charge": roomFinalPrice});
    });
    const lowestRate = finalPrices.reduce((prev, curr) => {
        return prev.total_charge < curr.total_charge ? prev : curr;
    });
    
    return lowestRate;
};