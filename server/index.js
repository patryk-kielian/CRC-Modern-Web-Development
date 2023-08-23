const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const PORT = 5000;
const app = express();

require("dotenv").config();

//
//b5cded25ef62c1:fe5df7e6@eu-cdbr-west-03.cleardb.net/heroku_659c9dae0aebfa8?reconnect=true

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:5173"],
//     methods: ["GET", "POST", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 1,
  // queueLimit: 0,
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

    if (result && result.length > 0) {
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
          const privateKey = process.env.JWT_SECRET;
          token = jwt.sign({ userID: user.id }, privateKey, {
            expiresIn: "1h",
          });
          res.json({ token: token, user });
          // res.send(user);
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
      const courses = result;
      console.log(courses);
      const courseIdList = courses.map((course) => course.id); // Extracting course IDs
      console.log(courseIdList);
      // Query to fetch trainer information for each course
      const trainerQuery = `
        SELECT course_creation.course_id, creators.name AS trainer
        FROM course_creation
        JOIN creators ON course_creation.creator_id = creators.id
        WHERE course_creation.course_id IN (?)
      `;

      db.query(trainerQuery, [courseIdList], (err, trainerResult) => {
        if (err) {
          console.log("Error executing the MySQL query: " + err.message);
          res.status(500).send("Internal Server Error");
        } else {
          console.log(trainerResult);
          // Organize the trainer information into a map for efficient lookup
          const trainerMap = {};
          trainerResult.forEach((row) => {
            if (!trainerMap[row.course_id]) {
              trainerMap[row.course_id] = [];
            }
            trainerMap[row.course_id].push(row.trainer);
          });
          console.log(trainerMap);
          // Combine the trainer information with each course
          courses.forEach((course) => {
            course.trainer = trainerMap[course.id] || null;
          });

          console.log(courses);
          res.send({ courses });
        }
      });
    }
  });
});

app.get("/course/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  db.query(
    "SELECT * FROM courses WHERE courses.id = ?",
    courseId,
    (err, result) => {
      if (err) {
        console.log("Error executing the MySQL query: " + err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.send({ course: result });
      }
    }
  );
});

app.get("/course/learn/:courseId", (req, res) => {
  const courseId = req.params.courseId;

  const courseQuery = "SELECT * FROM courses WHERE id = ?";
  const lessonsQuery = "SELECT * FROM course_lessons WHERE course_id = ?";

  db.query(courseQuery, courseId, (err, courseResult) => {
    if (err) {
      console.log("Error executing the MySQL query for course: " + err.message);
      return res.status(500).send("Internal Server Error");
    }

    db.query(lessonsQuery, courseId, (err, lessonsResult) => {
      if (err) {
        console.log(
          "Error executing the MySQL query for lessons: " + err.message
        );
        return res.status(500).send("Internal Server Error");
      }

      const course = courseResult[0];
      const lessons = lessonsResult;

      const responseData = {
        course: course,
        lessons: lessons,
      };
      res.send(responseData);
    });
  });
});

app.get("/creator/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  db.query(
    `SELECT creators.name, creators.description, creators.imageURL
    FROM course_creation
    JOIN creators ON course_creation.creator_id = creators.id
    WHERE course_creation.course_id = ?;
    `,
    courseId,
    (err, result) => {
      if (err) {
        console.log("Error executing the MySQL query: " + err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.send({ creator: result });
      }
    }
  );
});

app.get("/opinions/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  db.query(
    "SELECT * FROM course_opinions WHERE course_id = ?",
    courseId,
    (err, result) => {
      if (err) {
        console.log("Error executing the MySQL query: " + err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.send({ opinions: result });
      }
    }
  );
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
  const level = req.body.level;
  const image = req.body.image;
  const category = req.body.category;
  const descriptionShort = req.body.descriptionShort;
  const descriptionPoints = req.body.descriptionPoints;
  const descriptionLong = req.body.descriptionLong;
  const demoURL = req.body.demoURL;
  const user_id = req.body.user_id;

  const lessons = req.body.lessons || []; // Set lessons to an empty array if not provided

  if (lessons.length === 0) {
    return res
      .status(400)
      .send("At least one lesson is required to create a course");
  }

  const courseInsertSql = `INSERT INTO courses (name, language, level, image, category, descriptionShort, descriptionPoints, descriptionLong, demoURL)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    courseInsertSql,
    [
      name,
      language,
      level,
      image,
      category,
      descriptionShort,
      descriptionPoints,
      descriptionLong,
      demoURL,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving data to database");
      }

      const course_id = result.insertId; // Get the ID of the newly created course

      const lessonsData = lessons.map((lesson) => [
        course_id,
        lesson.title,
        lesson.videoURL,
        lesson.lessonNr,
      ]);

      const lessonsInsertSql = `INSERT INTO course_lessons (course_id, title, videoURL, lessonNr)
                                  VALUES ?`;

      db.query(lessonsInsertSql, [lessonsData], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error saving lessons to database");
        }

        const getCreatorIdSql = `SELECT id FROM creators WHERE user_id = ?`;
        db.query(getCreatorIdSql, [user_id], (err, creatorResult) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .send("Error fetching creator data from database");
          }

          if (creatorResult.length === 0) {
            // Handle the case when the creator is not found for the given user_id
            return res
              .status(404)
              .send("Creator not found for the given user_id");
          }

          const creator_id = creatorResult[0].id;

          const courseCreationSql = `INSERT INTO course_creation (user_id, course_id, creator_id)
                                    VALUES (?, ?, ?)`;
          db.query(
            courseCreationSql,
            [user_id, course_id, creator_id],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).send("Error saving data to database");
              }

              return res.status(200).send("Course added successfully!");
            }
          );
        });
      });
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

app.use((req, res, next) => {
  req.user = { userID: null, verified: false };
  const privateKey = process.env.JWT_SECRET;
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, privateKey, function (err, data) {
      if (!(err && typeof data === "undefined")) {
        req.user = { userID: data.userID, verified: true };
        next();
      } else {
        return res.sendStatus(403); // Send a 403 response if token is invalid
      }
    });
  } else {
    return res.sendStatus(403); // Send a 403 response if no token is present
  }
});

app.get("/login-by-id", (req, res) => {
  const userID = req.query.userID;
  db.query("SELECT * FROM users WHERE users.id = ?", userID, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
    } else if (result && result.length > 0) {
      const user = {
        id: result[0].id,
        login: result[0].login,
        isAdmin: result[0].isAdmin,
      };
      res.json(user);
    }
  });
});

app.get("/logout", (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    // add bearerToken to blacklist
  }
  return res.sendStatus(200);
});

// app.get("/init", (req, res) => {
//   const sqlQuery =
//     "CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))";

//   db.query(sqlQuery, (err) => {
//     if (err) throw err;

//     res.send("Table created!");
//   });
// });
