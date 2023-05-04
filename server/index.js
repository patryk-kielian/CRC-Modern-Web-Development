const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  password: "WelcomOnCRC23",
  database: "crc_db",
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO users (login, password) VALUES ('user', 'test')";
  db.query(sqlInsert, (err, result) => {
    if (err) throw err;
    res.send("hello world");
  });
});

// app.get("/init", (req, res) => {
//   const sqlQuery =
//     "CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))";

//   db.query(sqlQuery, (err) => {
//     if (err) throw err;

//     res.send("Table created!");
//   });
// });

app.listen(3001, () => console.log("running server"));
