//variabloops 
var timezoneNY;
var timezoneLA;
var timezoneChicago;
var timezoneSea;
var timezoneSanta;
var timezoneBost;






function setTimezoneTiles(loc, locNY, locChi, locH, locSan, locBost) {

    var targetDate = new Date(); // Current date/time of user computer
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60; // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
    var apikey = 'AIzaSyBNtBQHsPeLhFLmNIrV07DIW0rKFqYuY6k';

    var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey
    var apicall1 = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + locNY + '&timestamp=' + timestamp + '&key=' + apikey
    var apicall2 = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + locChi + '&timestamp=' + timestamp + '&key=' + apikey
    var apicall3 = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + locH + '&timestamp=' + timestamp + '&key=' + apikey
    var apicall4 = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + locSan + '&timestamp=' + timestamp + '&key=' + apikey
    var apicall5 = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + locBost + '&timestamp=' + timestamp + '&key=' + apikey
  
    callApiAndUpdateText(apicall, "timezoneLA", timestamp);
    callApiAndUpdateText(apicall1, "timezoneNY", timestamp);
    callApiAndUpdateText(apicall2, "timezoneChicago", timestamp);
    callApiAndUpdateText(apicall3, "timezoneSea", timestamp);
    callApiAndUpdateText(apicall4, "timezoneSanta", timestamp);
    callApiAndUpdateText(apicall5, "timezoneBost", timestamp);
 
    
}


function callApiAndUpdateText(apicall, timezoneName, timestamp) {
    $.get(apicall, function (data) {
        // then when the API response is successful, let's change the text

        // calculate the localDate ---------------------------------------------------------------------------------------------------------
        var offsets = data.dstOffset * 1000 + data.rawOffset * 1000 // get DST and time zone offsets in milliseconds
        var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
        console.log(localdate.toLocaleString()) // Display current date and time
     

        //reset the text
        $("#" + timezoneName).text("");

        //set the text to be the localTime
        $("#" + timezoneName).text(localdate.toLocaleString());
    });
}



$("#search-btn").on("click", function () {
    // get some coordinates
    var loc = '34.0522, -118.2437';
    var locNY = '40.7128, -74.0060';
    var locChi = '41.8781, -87.6298'; 
    var locH = '32.7767, -96.7970';
    var locSan = '34.0195, -118.4912';
    var locBost= '42.3601, -71.0589';

    // call our function, which is going to MAKE THE API REQUEST, and UPDATE THE TEXT
    setTimezoneTiles(loc, locNY, locChi, locH, locSan, locBost); 

});





