const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  user: "root",
  password: "WelcomOnCRC23",
  database: "crc_db",
});

app.get("/", (req, res) => {
  // const sqlInsert =
  //   "INSERT INTO users (login, password) VALUES ('user', 'test')";
  // db.query(sqlInsert, (err, result) => {
  //   if (err) throw err;
  //   res.send("hello world");
  // });
  res.send("hello world");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  db.query("SELECT * FROM users WHERE login = ?;", username, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
    }

    if (result.length > 0) {
      console.log(result);
      if (result[0].password === password) {
        console.log(result);
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
      // bcrypt.compare(password, result[0].password, (error, response) => {
      //   if (response) {
      //     req.session.user = result;
      //     console.log(req.session.user);
      //     res.send(result);
      //   } else {
      //     res.send({ message: "Wrong username/password combination!" });
      //   }
      // });
    } else {
      res.send({ message: "User doesn't exist" });
    }
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
