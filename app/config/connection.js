// Dependencies
const Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
//<<<<<<< tybopp
//const sequelize = new Sequelize("census1_db", "root", "PASSWORD", {
//=======
var sequelize = new Sequelize("census_db", "root", "password", {
//>>>>>>> master
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;