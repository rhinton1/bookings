exports.ReturnSmokingRooms = (roomIDs, roomsList) => {
    var smokingRooms = [];

    roomIDs.forEach(roomId => {
        var room = roomsList.filter(obj => {
            return obj.id === roomId;
        });

        if(room.allow_smoking) smokingRooms.push(room);
    })
    return smokingRooms;
};

exports.ReturnNonSmokingRooms = (roomIDs, roomsList) => {
    var nonSmokingRooms = [];

    roomIDs.forEach(roomId => {
        var room = roomsList.filter(obj => {
            return obj.id === roomId;
        });

        if(!room.allow_smoking) nonSmokingRooms.push(room);
    })

    return nonSmokingRooms;
};

exports.ReturnDoubleBedRooms = (roomsList) => {
    var availableRooms = [];

    var doubleBedRooms = roomsList.filter(obj => {
        return obj.num_beds === 2
    });

    availableRooms.push(doubleBedRooms);
    return availableRooms;
};

exports.GetLowestRate = (roomsList, numOfDays) => {};