// Dependencies
const path = require("path");

 // The below route handles the index HTML page that the user initially gets sent to.
module.exports = function(app) {


  // default route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/views/index.html"));
  });
};