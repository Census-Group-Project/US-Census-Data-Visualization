// Code here handles queries for specific city census data in the database
// In this case, the user submits a city name. That city name is passed as a
// URL parameter in our AJAX GET call. Our server then performs the search to grab that city from the Database.

// when user hits the city-search-btn
$("#search-btn").on("click", function () {
  event.preventDefault();
  
  // Saves the search value from the city-search bar into a variable.
  let searchedCity = $("#city-search")
    .val()
    .trim();

  // Using a RegEx Pattern to remove any spaces from searchedCity
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  searchedCity = searchedCity.replace(/\s+/g, "").toLowerCase();

  // Splits search variable at the comma, seporating city and state into an array of two seperate strings.
  searchedCity = searchedCity.split(",");

  // Re-defines search variable as single string, inserting a character '&' in between city and state (because we cannot pass a comma in the AJAX URL for our API).
  searchedCity = searchedCity[0] + "&" + searchedCity[1];

  // run an AJAX GET-request for our servers api,
  // including the user's search criterion in the url
  $.get("/api/" + searchedCity, function (data) {
    // log the data to our console
    console.log(data);
    // empty to test-data-dump section before adding new content
    $("#test-data-dump").empty();
    // if the data is not found in the DB, then return the following error message on the page:
    if (!data) {
      $("#test-data-dump").append("<h2> Hmmm... No data was returned from database. Try another city. </h2>");
    } else {
//<<<<<<< tybopp
      // otherwise, append the search result data to the test-data-dump div at the bottom of the page:
      //$("#test-data-dump").append("<h2>" + data.Areaname + "</h2>");
      // Example Data Set #1
      //$("#test-data-dump").append("<h3>Data Set #1: " + data.STCOU + "</h3>");
      // Example Data Set #2
      //$("#test-data-dump").append("<h3>Data Set #2: " + data.PST100209D + "</h3>");
//=======
      // otherwise
      // append the character name
      $("#test-data-dump").append("<h2> City Name:"+ data.areaname + "</h2>");
      // the role
      $("#test-data-dump").append("<h3>State and County #: " + data.stateCounty + "</h3>");
      // the age
      $("#test-data-dump").append("<h3>Total Population: " + data.totalPopulation + "</h3>");

      // General side bar graph (blue) clearing then appending new data
      $(".bar-fill").remove();
      // Removing all custom stats
      $(".removeCustomStat").remove();

      // General Population Statistics
      // We need to calculate the percentage of pop under 18, so we'll divide total amount of ppl under 18 by the total population
      const mathPercentPopulationUnder18 = Math.round((data.populationUnder18 / data.totalPopulation) * 100);
      $("#textPercentPopulationUnder18").append(`<h4 class="removeCustomStat">${mathPercentPopulationUnder18}%</h4>`);
      $("#graphPercentPopulationUnder18").append(`<span class="bar-fill" style="width:${mathPercentPopulationUnder18}%;"></span>`);

      $("#textPercentPopulationOver65").append(`<h4 class="removeCustomStat">${data.populationOver65}%</h4>`);
      $("#graphPercentPopulationOver65").append(`<span class="bar-fill" style="width:${data.populationOver65}%;"></span>`);

      // Calculate a city's percentage of families below poverty level
      const mathFamiliesBelowPovertyLevel = (Math.round(data.familiesBelowPovertyLevel / data.totalPopulation * 1000));
      $("#textFamiliesBelowPovertyLevel").append(`<h4 class="removeCustomStat">${mathFamiliesBelowPovertyLevel}%</h4>`);
      $("#graphFamiliesBelowPovertyLevel").append(`<span class="bar-fill" style="width:${mathFamiliesBelowPovertyLevel}%;"></span>`);
      
      // Creating a container for displaying the mean and median incomes into their bar graph
      const mathMeanFamilyIncome = (Math.round(data.meanFamilyIncome / 1000));
      $("#textMeanFamilyIncome").append(`<h4 class="removeCustomStat">$${mathMeanFamilyIncome}K</h4>`);
      
      // Doing the same for the median income and unemployment
      const mathMedianFamilyIncome = (Math.round(data.medianFamilyIncome / 1000));
      $("#textMedianFamilyIncome").append(`<h4 class="removeCustomStat">$${mathMedianFamilyIncome}K</h4>`);
      $("#textUnemploymentRate2010").append(`<h4 class="removeCustomStat">$${data.unemploymentRate2010}%</h4>`);
      $("#graphUnemploymentRate2010").append(`<span class="bar-fill" style="width:${data.unemploymentRate2010}%;"></span>`);

      //Clear the previous content
      $(".bar").remove();
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