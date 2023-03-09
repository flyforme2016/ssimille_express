//Mysql create pool 을 위한 config
const promiseMysql = require("promise-mysql");

require("dotenv").config();

const dbConfig = {
  host: process.env.AWS_RDS_HOST, //AWS_RDS Endpoint
  port: process.env.AWS_RDS_PORT, //MYSQL_PORT
  user: process.env.AWS_RDS_USER, //AWS_RDS Master user name
  password: process.env.AWS_RDS_PASSWORD, //AWS_RDS Master password
  database: process.env.AWS_RDS_DATABASE, //MYSQL connecting name / schema
};

module.exports = promiseMysql.createPool(dbConfig);
