// Code here handles queries for specific city census data in the database
// In this case, the user submits a city name. That city name is passed as a
// URL parameter. Our server then performs the search to grab that character from the Database.

// when user hits the city-search-btn
$("#search-btn").on("click", function() {
    // save the character they typed into the character-search input
    let searchedCity = $("#city-search")
      .val()
      .trim();
        
    // run an AJAX GET-request for our servers api,
    // including the user's character in the url
    $.get("/api/" + searchedCharacter, function(data) {
      // log the data to our console
      console.log(data);
      // empty to well-section before adding new content
      $("#well-section").empty();
      // if the data is not there, then return an error message
      if (!data) {
        $("#well-section").append("<h2> The force is not strong with this one. Your character was not found. </h2>");
      }
      else {
        // otherwise
        // append the character name
        $("#well-section").append("<h2>" + data.name + "</h2>");
        // the role
        $("#well-section").append("<h3>Role: " + data.role + "</h3>");
        // the age
        $("#well-section").append("<h3>Age: " + data.age + "</h3>");
        // and the force points
        $("#well-section").append("<h3>Force Points: " + data.forcePoints + "</h3>");
      }
    });
  });
  