const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "note_app",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.log("Error connected to mysql server " + err);
    return;
  }
  console.log("Connected to mysql server successfully");
});

module.exports = db;
