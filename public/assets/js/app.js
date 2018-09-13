const censusDataObject = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.census.gov/data/",
    "method": "GET"
  }

  $.ajax(censusDataObject).done(function (response) {
    console.log(response);
  });