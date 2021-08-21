const mysql = require('mysql');

const db = mysql.createPool({
    password: "123456",
    user: "root",
    host:'localhost',
    database: "stockdb"
});

module.exports = db;