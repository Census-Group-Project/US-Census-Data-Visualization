// Dependencies
// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates a "Census" model that matches up with DB (MATCHES ALL COLUMNS in DB - AT LEAST WHAT WE WANT THIS MODEL TO BE ABLE TO MANIPULATE )
let Census = sequelize.define("CensusData", {
  Areaname: {
    type: Sequelize.TEXT
  },
  STCOU: {
    type: Sequelize.INTEGER
  },
  PST100209D: {
    type: Sequelize.INTEGER
  },
}, {
  freezeTableName: true,
  timestamps: false

});

// Syncs with DB and if 'force = false', an existing table will NOT be dropped and a new one created.
Census.sync({
  force: false
});

// Makes the Query Model available for other files (will also create a table)
module.exports = Census;