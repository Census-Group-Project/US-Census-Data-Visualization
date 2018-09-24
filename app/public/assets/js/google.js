//variables
var timeNY
var timeLA
var timeAustin

$("#search-btn").on("click", function () {
    var loc = '40.7128, 74.0060' // coordinates
    var targetDate = new Date() // Current date/time of user computer
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
    var apikey = 'AIzaSyBNtBQHsPeLhFLmNIrV07DIW0rKFqYuY6k'
    var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey

    $.get(apicall, function (data) {
        console.log(data) // print the data

        var offsets = data.dstOffset * 1000 + data.rawOffset * 1000 // get DST and time zone offsets in milliseconds
        var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
        console.log(localdate.toLocaleString()) // Display current Tokyo date and time

    });
});

// leaving this here for now
//$("").append()