var Census = require("../models/census.js");

module.exports = function (app) {
  // GET route handling to return ALL available Census data, as defined by the model (census.js).
  // If the user provides a specific city, JSON for the census data will be returned for that specific city. If no city is provided, ALL census data will be returned for the United States as JSON. 

  app.get("/api/:city?", function (req, res) {
    if (req.params.city) {
      Census.findOne({
        where: {
          Areaname: req.params.city
        }
      }).then(function (results) {
        return res.json(results);
      });
    } else {
      Census.findOne({
        where: {
          Areaname: 'UNITED STATES'
        }
      }).then(function (results) {
        return res.json(results);
      });
    }
  });
};