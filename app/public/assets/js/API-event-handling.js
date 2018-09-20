// Code here handles queries for specific city census data in the database
// In this case, the user submits a city name. That city name is passed as a
// URL parameter. Our server then performs the search to grab that character from the Database.

// when user hits the city-search-btn
$("#search-btn").on("click", function () {
  event.preventDefault();
  // save the character they typed into the character-search input
  let searchedCity = $("#city-search")
    .val()
    .trim();

  // Using a RegEx Pattern to remove spaces from searchedCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  searchedCity = searchedCity.replace(/\s+/g, "").toLowerCase();

  // run an AJAX GET-request for our servers api,
  // including the user's character in the url
  $.get("/api/" + searchedCity, function (data) {
    // log the data to our console
    console.log(data);
    // empty to well-section before adding new content
    $("#test-data-dump").empty();
    // if the data is not there, then return an error message
    if (!data) {
      $("#test-data-dump").append("<h2> No data found. </h2>");
    } else {
      // otherwise
      // append the character name
      $("#test-data-dump").append("<h2>" + data.Areaname + "</h2>");
      // the role
      $("#test-data-dump").append("<h3>Data Set #1: " + data.STCOU + "</h3>");
      // the age
      $("#test-data-dump").append("<h3>Data Set #2: " + data.PST100209D + "</h3>");
    }
  });
});