// Dependencies
const Sequelize = require("sequelize");

let sequelize;
console.log(process.env.JAWSDB_URL);
// Creates a Sequelize database connection to either JAWSDB or locally via MySQL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    })
};

module.exports = sequelize;