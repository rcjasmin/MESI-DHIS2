const mysql = require("mysql");
const connectionPool = mysql.createPool({
  connectionLimit: 100,
  host: "159.223.116.31",
  user: "root",
  password: "c0nneXus@",
  database: "delr_xchange",
});

module.exports = connectionPool;
