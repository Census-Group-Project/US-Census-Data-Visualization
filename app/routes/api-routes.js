var Census = require("../models/census.js");

module.exports = function (app) {
  // GET route handling to return ALL available Census data, as defined by the model (census.js).
  // Search for Specific Query (or all ) then provides JSON
  app.get("/api/all", function (req, res) {
    Census.findAll({
      where: {
        Areaname: 'Autauga, AL'
      }
    }).then(function (results) {
      return res.json(results);
    });
  });
};