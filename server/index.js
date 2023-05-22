const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const PORT = 3001;
const app = express();

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:5173"],
//     methods: ["GET", "POST", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());

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
      bcrypt.compare(password, result[0].password, (error, response) => {
        // if (result[0].password === password) {
        //   console.log(result);
        //   const user = {
        //     id: result[0].id,
        //     login: result[0].login,
        //     isAdmin: result[0].isAdmin,
        //   };
        //   res.send(user);
        // }
        if (response) {
          const user = {
            id: result[0].id,
            login: result[0].login,
            isAdmin: result[0].isAdmin,
          };
          res.send(user);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "SELECT * FROM users WHERE login = ?",
      [username],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ err: err });
        } else {
          if (result.length > 0) {
            res.send({ message: "Username already exists" });
          } else {
            db.query(
              "INSERT INTO users (login, password) VALUES (?,?)",
              [username, hash],
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
      }
    );
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

app.get("/courses/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM courses INNER JOIN course_attendance ON courses.id = course_attendance.course_id WHERE course_attendance.user_id = ?",
    userId,
    (err, result) => {
      if (err) {
        console.log("Error executing the MySQL query: " + err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.send({ courses: result });
      }
    }
  );
});

app.get("/courses-admin/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM courses INNER JOIN course_creation ON courses.id = course_creation.course_id WHERE course_creation.user_id = ?",
    userId,
    (err, result) => {
      if (err) {
        console.log("Error executing the MySQL query: " + err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.send({ courses: result });
      }
    }
  );
});

app.post("/new-course", (req, res) => {
  const name = req.body.name;
  const language = req.body.language;
  const location = req.body.location;
  const level = req.body.level;
  const trainer = req.body.trainer;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const timeStart = req.body.timeStart;
  const timeEnd = req.body.timeEnd;
  const frequency = req.body.frequency;
  const image = req.body.image;

  const user_id = req.body.user_id;

  const sql = `INSERT INTO courses (name, language, location, level, trainer, dateStart, dateEnd, timeStart, timeEnd, frequency, image) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      name,
      language,
      location,
      level,
      trainer,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      frequency,
      image,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving data to database");
      } else {
        const course_id = result.insertId; // Get the ID of the newly created course

        const courseCreationSql = `INSERT INTO course_creation (user_id, course_id) VALUES (?, ?)`;

        db.query(
          courseCreationSql,
          [user_id, course_id], // Assuming you have the user ID available in req.userId
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send("Error saving data to database");
            } else {
              res.status(200).send("Course added successfully!");
            }
          }
        );
      }
    }
  );
});

app.delete("/delete-course/:courseId", (req, res) => {
  const course_id = req.params.courseId;

  db.query("DELETE FROM courses WHERE id = ?", [course_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: "Course not found" });
    } else {
      res.status(200).send({ message: "Course deleted successfully" });
    }
  });
});

app.post("/course-attendance", (req, res) => {
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;

  db.query(
    "SELECT * FROM course_attendance WHERE user_id = ? AND course_id = ?",
    [user_id, course_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      } else if (result.length > 0) {
        res.status(400).send({ message: "User already attends the course" });
      } else {
        db.query(
          "INSERT INTO course_attendance (user_id, course_id) VALUES (?, ?)",
          [user_id, course_id],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: "Internal Server Error" });
            } else {
              res.status(200).send({ message: "Attendance recorded" });
            }
          }
        );
      }
    }
  );
});

app.delete("/course-attendance", (req, res) => {
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;

  db.query(
    "SELECT * FROM course_attendance WHERE user_id = ? AND course_id = ?",
    [user_id, course_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      } else if (result.length === 0) {
        console.log(result);
        res.status(400).send({ message: "User does not attend the course" });
      } else {
        db.query(
          "DELETE FROM course_attendance WHERE user_id = ? AND course_id = ?",
          [user_id, course_id],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: "Internal Server Error" });
            } else {
              res.status(200).send({ message: "Deregistration successful" });
            }
          }
        );
      }
    }
  );
});

// app.get("/init", (req, res) => {
//   const sqlQuery =
//     "CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))";

//   db.query(sqlQuery, (err) => {
//     if (err) throw err;

//     res.send("Table created!");
//   });
// });
