// Dependencies
// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates a "Census" model that matches up with DB (MATCHES ALL COLUMNS in DB - AT LEAST WHAT WE WANT THIS MODEL TO BE ABLE TO MANIPULATE )
let Census = sequelize.define("CensusData", {
  Reduced_Name: {
    type: Sequelize.TEXT
  },
  Areaname: {
    type: Sequelize.TEXT
  },
  STCOU: {
    type: Sequelize.TEXT
  },
  PST100209D: {
    type: Sequelize.TEXT
  },
}, {
  freezeTableName: true,
  timestamps: false

});

// Syncs with DB and if 'force = false', any existing table will NOT be dropped and a new one created.
Census.sync({
  force: false
});

// Makes the Query Model available for other files
module.exports = Census;