const Census = require("../models/census.js");

module.exports = function(app) {
  // GET route handling to return ALL available Census data, as defined by the model (census.js).
  // If the user provides a specific city, JSON for the census data will be returned for that specific city. If no city is provided, ALL census data will be returned for the United States as JSON.

  app.get("/api/:city?", function(req, res) {
    if (req.params.city) {
      // Re-construct search params for database:
      // 1. Store the incoming search parameters into a variable.
      let searchParams = req.params.city;
      // 2. Split the search variable into an array of two separate strings (city and the state) at the wildcard character '&'.
      searchParams = searchParams.split("&");
      // 3. Re-define the search variable as the two strings connected with a ", " in between city and state strings in order to pass the exact format required for the database search.
      searchParams = searchParams[0] + "," + searchParams[1];

      // Pass the search params to sequelize to perform the search.
      Census.findOne({
        where: {
          Reduced_Name: searchParams
        }
      }).then(function(results) {
        return res.json(results);
      });
      Census.findOne({
        where: {
          Reduced_Name: "austin&tx"
        }
      }).then(function(results) {
        return res.json(results);
      });
    } else {
      Census.findOne({
        where: {
          Reduced_Name: "austin&tx"
        }
      }).then(function(results) {
        return res.json(results);
      });
    }
  });
};
