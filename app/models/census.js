// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates a "Census" model that matches up with DB (MATCHES ALL COLUMNS in DB - AT LEAST WHAT WE WANT THIS MODEL TO BE ABLE TO MANIPULATE )
let Census = sequelize.define("censusdata", {
  Reduced_Name: {
    type: Sequelize.TEXT
  },
  areaname: {
    type: Sequelize.TEXT
  },
  stateCounty: {
    type: Sequelize.INTEGER
  },
  totalPopulation: {
    type: Sequelize.INTEGER
  },
  populationUnder18: {
    type: Sequelize.INTEGER
  },
  populationOver65: {
    type: Sequelize.INTEGER
  },
  familiesBelowPovertyLevel: {
    type: Sequelize.INTEGER
  },
  medianFamilyIncome: {
    type: Sequelize.INTEGER
  },
  meanFamilyIncome: {
    type: Sequelize.INTEGER
  },
  incomeLessThan10K: {
    type: Sequelize.INTEGER
  },
  incomeBtw10And15K: {
    type: Sequelize.INTEGER
  },
  incomeBtw15And20K: {
    type: Sequelize.INTEGER
  },
  incomeBtw20And25K: {
    type: Sequelize.INTEGER
  },
  incomeBtw25And30K: {
    type: Sequelize.INTEGER
  },
  incomeBtw30And35K: {
    type: Sequelize.INTEGER
  },
  incomeBtw35And40K: {
    type: Sequelize.INTEGER
  },
  incomeBtw40And45K: {
    type: Sequelize.INTEGER
  },
  incomeBtw45And50K: {
    type: Sequelize.INTEGER
  },
  incomeBtw50And60K: {
    type: Sequelize.INTEGER
  },
  incomeBtw60And75K: {
    type: Sequelize.INTEGER
  },
  incomeBtw75And100K: {
    type: Sequelize.INTEGER
  },
  incomeBtw100And125K: {
    type: Sequelize.INTEGER
  },
  incomeBtw125And150K: {
    type: Sequelize.INTEGER
  },
  incomeBtw150And200K: {
    type: Sequelize.INTEGER
  },
  income200Plus: {
    type: Sequelize.INTEGER
  },
  unemploymentRate2009: {
    type: Sequelize.INTEGER
  },
  unemploymentRate2010: {
    type: Sequelize.INTEGER
  },
  percentageDem1980: {
    type: Sequelize.INTEGER
  },
  percentageDem1984: {
    type: Sequelize.INTEGER
  },
  percentageDem1988: {
    type: Sequelize.INTEGER
  },
  percentageDem1992: {
    type: Sequelize.INTEGER
  },
  percentageDem1996: {
    type: Sequelize.INTEGER
  },
  percentageDem2000: {
    type: Sequelize.INTEGER
  },
  percentageDem2004: {
    type: Sequelize.INTEGER
  },
  percentageDem2008: {
    type: Sequelize.INTEGER
  },
  percentageRep1980: {
    type: Sequelize.INTEGER
  },
  percentageRep1984: {
    type: Sequelize.INTEGER
  },
  percentageRep1988: {
    type: Sequelize.INTEGER
  },
  percentageRep1992: {
    type: Sequelize.INTEGER
  },
  percentageRep1996: {
    type: Sequelize.INTEGER
  },
  percentageRep2000: {
    type: Sequelize.INTEGER
  },
  percentageRep2004: {
    type: Sequelize.INTEGER
  },
  percentageRep2008: {
    type: Sequelize.INTEGER
  },
  whitePopulation: {
    type: Sequelize.INTEGER
  },
  blackPopulation: {
    type: Sequelize.INTEGER
  },
  americanIndianAndAlaskanNativePopulation: {
    type: Sequelize.INTEGER
  },
  asianPopulation: {
    type: Sequelize.INTEGER
  },
  nativeHawaiianAndPacificIslanderPopulation: {
    type: Sequelize.INTEGER
  },
  twoOrMoreRacesPopulation: {
    type: Sequelize.INTEGER
  },
  hispanicOrLatinoPopulation: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: false

});

// Syncs with DB
Census.sync({
  force: false
});

// Makes the Query Model available for other files
module.exports = Census;