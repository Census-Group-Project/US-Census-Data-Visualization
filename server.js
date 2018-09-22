// Dependencies
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models/census.js");

// Sets up the Express app to handle data parsing:
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("app/public/assets"));

// Sets up server access to API and HTML routing
require("./app/routes/html-routes.js")(app);
require("./app/routes/api-routes.js")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
