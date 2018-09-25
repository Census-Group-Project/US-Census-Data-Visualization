//variabloops 
var timezoneNY;
var timezoneLA;
var timezoneseAustin;


// okay so this is how u write a function in JS
// you say
// function nameOfTheFunction(<here you put in your PARAMETERS> to the function)

// for instance, here NUMBER is the parameter of the square function
// cuz you gotta know what number you want to be squared
function square(number) {
    return number * number;
}

//okay so having learned this, let's try to write a function to make our api calls

// ok so lets like dissect this
// so i'm making a function here, called doSomeShit, and it takes in one parameter called `coordinates`.
// as a note, I can also make a function which has NO parameters, or has a billion parameters like
// funtion noParameters() {...}
// or
// function hellaParameters(param1, param2, paran3, param4, param5, parmesan) {...}
// alright, so we MADE our function
// how do we use a function?
// ez
// just do
// functionName(pass in the parameters)
// so like for doSomeShit we would use it like:
// var theVariableBeingReturned = doSomeShit(myCoordinates);
// where myCoordinates is a variable holding coordinates.

function setTimezoneTiles(loc, locNY) {
    // ok so now going into what the function actually does...
    // ############################ this section of code we just took from what we had before, so we already kinda know whats goin on here.
    var targetDate = new Date(); // Current date/time of user computer
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60; // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
    var apikey = 'AIzaSyBNtBQHsPeLhFLmNIrV07DIW0rKFqYuY6k';
    // loc is the name we're using lol not coordinates - loc is coming from the input to the function
    var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey
    var apicall1 = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + locNY + '&timestamp=' + timestamp + '&key=' + apikey
    //why is my apicall1 being greyd out

    // ############################ 

    // so the end result of that stuff ^ is you made the URL for the API call.
    
    // so, a lot of times (but not always) inside of a function, you want to RETURN
    // what this means, is return back to the caller something
    // for instance, wherever in the code you say doSomeShit(myCoordinates);
    // the function is being CALLED 
    // then the return is what is given back
    // so var theVariableBeingReturned = doSomeShit(myCoordinates);
    // once doSomeShit finishes, it's gonna give back a value, and we're gonna save it in the variable called theVariableBeingReturned

    // ok lets make a function to do that piece of it
    // okay now lets call the function
    callApiAndUpdateText(apicall, "timezoneLA", timestamp);
    callApiAndUpdateText(apicall1, "timezoneNY", timestamp);
    // make sense? ok but whats wrong with this ^ the apicall is the same for both LOL but they need to be different, ooo ok so  i have to make different apicall variables witht he specific coord yeees , i have to make a different var loc too ?
    
}

// so this is the function whose ONLY job is to call the api.
// it's gotta know what the URL is tho, so we'll pass that in the parameters
// lets make the name more descriptive but i mean names are whatever
function callApiAndUpdateText(apicall, timezoneName, timestamp) {
    $.get(apicall, function (data) {
        // then when the API response is successful, let's change the text

        // calculate the localDate ---------------------------------------------------------------------------------------------------------
        var offsets = data.dstOffset * 1000 + data.rawOffset * 1000 // get DST and time zone offsets in milliseconds
        var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
        console.log(localdate.toLocaleString()) // Display current Tokyo date and time
        // see how this piece of code is like in a section, that makes it kind of a good candidate for a function..... just saaaaying -------
        // anyway beside the point

        //reset the text
        $("#" + timezoneName).text("");

        //set the text to be the localTime
        $("#" + timezoneName).text(localdate.toLocaleString());
    });
}



$("#search-btn").on("click", function () {
    // get some coordinates
    var loc = '34.0522, -118.2437';
    var locNY = '40.7128, 74.0060';
    
    // call our function, which is going to MAKE THE API REQUEST, and UPDATE THE TEXT
    setTimezoneTiles(loc, locNY); // our function takes in the coordinates as a parameter, so we gotta pass it inside the ()

    // so does this make sense how we've done the same thing, but kind of like separated parts out? 
    // now...
    // for the BIG BRAIN PLAY
});






// okay so this is what we used to have for the search-btn clicked, but let's see how we could do it differently
// lets keep this for now, commented
// $("#search-btn").on("click", function () {
//     // okay so when they click the search button, lets make it so we use the doSomeShit() function
//     // and let's see what comes back from the function

//     // so we need to pass in some coordinates to the function, let's use these coordinates.
//     var loc = '34.0522, -118.2437' // coordinates

//     // i wanted to put this BEFORE we called the function. ok now lets see it
//     // now we call the function
//     var url = setTimezoneTiles(loc);
//     // and we save whatever comes out of the function to the variable url
//     // let's print it and see what it looks like:
//     console.log(url);


//     $.get(url, function (data) {
//         console.log(data) // print the data

//         // k now we need this again
//         // ctrl + / comments and uncomments btw
//         var offsets = data.dstOffset * 1000 + data.rawOffset * 1000 // get DST and time zone offsets in milliseconds
//         var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
//         console.log(localdate.toLocaleString()) // Display current Tokyo date and time
//         // oh shit waddup ^


//         // so now back in the javascripto
//         // we need to update the text of the div with the id "TimezoneTokyo"
//         // but we can ONLY do that after we make our successful API call
//         // otherwise, how would we know what to set the text?
//         // if the text is supposed to be the time in Tokyo, and the API call fails or doesn't work
//         // well... then we don't know the time in tokyo. lol.;
//         // so we have to do the HTML updating inside of this block

//         // oh check out this cool feature of vscode.
//         // code folding/unfolding.
//         // that will hopefully help you visualize things better.
//         // so we wanna be inside of this block.

//         // gonna copy some code from here
//         // the more ctrl+c ctrl+v the less work for you
//         // work smart not hard

//         // okay step 0: clear out the old shit
//         // so while this kinda sorta works it's not really what we probably want...
//         // because this is removing the whole "category" block
//         // but we just need to reset the text.
//         // ok so we just do that.
//         // empty string 

//         // we also gotta change what goes in the left side
//         // it can't be ".bar" obviously
//         // what could we put in there instead? timezonetokyo YEET yayeety *yeets away*.
//         // aight follow up question - # or . ? so ye we do # for this first example
        
//         // just for now we want to change the one category
//         // but maybe for the rest of them we can use our brains and think of a smarter way to do it... but we'll worry about that later

//         // okay so this bit of code is going to find the element with id=timezoneTokyo
//         // and set it's text to be ""
//         $("#timezoneLA").text("");
        

//         // then we wanna update the text to read the actual time in Tokyo
//         // so what did we name our variable......
    
//         $("#timezoneLA").text(localdate.toLocaleString());
//         // hm okay nice!

//         // lets see.. do we need to do anything else
//         // kk
//         // lets remember to empty the cache
//         // like this
//         // oh nvm
//         // i was thinking that the old html page was being cached (saved) and chrome was showing that instead.

//         // but i inspected the element and it has our new code in it
//         // with the timezoneTokyo
//         // hmm
//         // big thinkingrip
//         // lets see3e3e3e
//         // so the API call is good
//          // hdm maybe di od   do we not need to replace that stuff 
//          // isn't taht happening on line 60
//          //should we erase the text category and project name though
//          // placeholders but it doesn't really matter, line 56 resets it (or should)
//          //so i probably fucked up the ajax part of it (cuz who uses ajax in 2018 omegelulu)
         
//          // so it looks like we're doing it right
//          // can u tell what we did wrong
//          // LUL it's stupid
//         //i got jebaited i thought the time would move
//         //like count every second
//         // haha  yeah i like thought about that
//         // do you know why that is?
//         //cause we're only doing one api call per click? wow u got it! is it hard to do one every second
//         // i mean.. do u REALLY want to like do that?
//         //on a scale of 1-10 how hard
//         // it has nothing to do with how hard it is
//         // do you REALLY want to be making an API call EVERY SECOND?
//         // for EVERY SINGLE category/timezone? 
//         // so.. what could we do on our side (no api) to get that behavior?
//         //activate the api click ons omething other than search click
//         // if you do that, aren't you still calling the API? //oh true,
//         // so.. let's get back to that question once we finish this one tile 
//         // all that's left to do for the tile is make it so the "project" text is gone too.

//         // lol look at this text chat log.
//         // just chcek the logs for anything you forget :^)
//         // ok
//         // so let's make it not say "project"
//         // how do you want it to look - do we want the timezone on top, then the time?
//         //City name on top and time on the bottom

//         // ok 
//         // so... imma let u make it look how u want it to look

//         // GO

//         //wtf did u delete the tokyo time thing no what

        
//     });
// });