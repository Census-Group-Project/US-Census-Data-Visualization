// Dependencies
const path = require("path");


// Routes
module.exports = function(app) {

  // The below route handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/views/index.html"));
  });
};