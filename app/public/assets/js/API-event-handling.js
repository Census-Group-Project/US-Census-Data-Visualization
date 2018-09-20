// Code here handles queries for specific city census data in the database
// In this case, the user submits a city name. That city name is passed as a
// URL parameter in our AJAX GET call. Our server then performs the search to grab that city from the Database.

// when user hits the city-search-btn
$("#search-btn").on("click", function () {
  event.preventDefault();
  // save the search criterion they typed into the city-search bar.
  let searchedCity = $("#city-search")
    .val()
    .trim();

  // Using a RegEx Pattern to remove spaces from searchedCity
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  searchedCity = searchedCity.replace(/\s+/g, "").toLowerCase();

  // run an AJAX GET-request for our servers api,
  // including the user's search criterion in the url
  $.get("/api/" + searchedCity, function (data) {
    // log the data to our console
    console.log(data);
    // empty to test-data-dump section before adding new content
    $("#test-data-dump").empty();
    // if the data is not found in the DB, then return the following error message on the page:
    if (!data) {
      $("#test-data-dump").append("<h2> Hmmm... No data was returned from database. </h2>");
    } else {
      // otherwise, append the search result data to the test-data-dump div at the bottom of the page:
      $("#test-data-dump").append("<h2>" + data.Areaname + "</h2>");
      // Example Data Set #1
      $("#test-data-dump").append("<h3>Data Set #1: " + data.STCOU + "</h3>");
      // Example Data Set #2
      $("#test-data-dump").append("<h3>Data Set #2: " + data.PST100209D + "</h3>");
    }
  });
});