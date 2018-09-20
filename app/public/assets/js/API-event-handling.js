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
      $("#test-data-dump").append("<h2> Areanam:"+ data.areaname + "</h2>");
      // the role
      $("#test-data-dump").append("<h3>Data Set #1: " + data.stateCounty + "</h3>");
      // the age
      $("#test-data-dump").append("<h3>Data Set #2: " + data.totalPopulation + "</h3>");

      // General side bar graph (blue)
      $("#percentPopulationOver65").append(`<span class="bar-fill" style="width:${data.populationOver65}%;"></span>`);
      $("#unemploymentRate2010").append(`<span class="bar-fill" style="width:${data.unemploymentRate2010}%;"></span>`);

      // Amending political party vote data to their IDs in index.html
      $("#repVote1992").append(`<div class="bar bar-1 stat-1" style="height:${data.percentageRep1992}%;"></div>`);
      $("#demVote1992").append(`<div class="bar bar-3 stat-3" style="height:${data.percentageDem1992}%;"></div>`);
      $("#repVote1996").append(`<div class="bar bar-4 stat-1" style="height:${data.percentageRep1996}%;"></div>`);
      $("#demVote1996").append(`<div class="bar bar-6 stat-3" style="height:${data.percentageDem1996}%;"></div>`);
      $("#repVote2000").append(`<div class="bar bar-7 stat-1" style="height:${data.percentageRep2000}%;"></div>`);
      $("#demVote2000").append(`<div class="bar bar-9 stat-3" style="height:${data.percentageDem2000}%;"></div>`);
      $("#repVote2004").append(`<div class="bar bar-10 stat-1" style="height:${data.percentageRep2004}%;"></div>`);
      $("#demVote2004").append(`<div class="bar bar-12 stat-3" style="height:${data.percentageDem2004}%;"></div>`);
      $("#repVote2008").append(`<div class="bar bar-13 stat-1" style="height:${data.percentageRep2008}%;"></div>`);
      $("#demVote2008").append(`<div class="bar bar-15 stat-3" style="height:${data.percentageDem2008}%;"></div>`);
    }
  });
});