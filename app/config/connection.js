// Dependencies
const Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
//<<<<<<< tybopp
//const sequelize = new Sequelize("census1_db", "root", "PASSWORD", {
//=======
const sequelize = new Sequelize("census_db", "root", "password", {
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

module.exports = sequelize;
 "use strict";

var fs = require("fs");
var path = require("path");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
// var config = require(__dirname + "/../config/config.json")[env];
// var db = {};

// if (config.use_env_variable) {
//   //var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
//   })
//   .forEach(function(file) {
//     var model = sequelize["import"](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // Exports the connection for other files to use
// module.exports = {db, sequelize};
