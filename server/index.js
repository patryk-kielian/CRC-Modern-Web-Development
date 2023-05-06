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
  db.query("SELECT * FROM users WHERE login = ?;", username, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
    }

    if (result.length > 0) {
      if (result[0].password === password) {
        console.log(result);
        const user = {
          id: result[0].id,
          login: result[0].login,
          isAdmin: result[0].isAdmin,
        };
        res.send(user);
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE login = ?", [username], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.send({ message: "Username already exists" });
      } else {
        db.query(
          "INSERT INTO users (login, password) VALUES (?,?)",
          [username, password],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ err: err });
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  });
});

app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) {
      console.log("Error executing the MySQL query: " + err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ courses: result });
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
