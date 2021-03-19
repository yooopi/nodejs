const mysql2 = require("mysql2");
const config = require("../configs/mysql");

const pool = mysql2.createPool(config).promise();

module.exports = pool;
