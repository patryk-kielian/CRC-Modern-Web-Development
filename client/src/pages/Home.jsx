import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

import Navbar from "../components/Navbar";

function Home() {
  const [courses, setCourses] = useState([]);
  const { loggedUser } = useContext(LoggedUserContext);

  useEffect(() => {
    // Fetch courses from the server
    Axios.get("http://localhost:3001/courses").then((response) => {
      setCourses(response.data.courses);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main id="container">
        <h1>
          Don’t wait - <br />
          start training now!
        </h1>
        <div className="cards-container">
          {courses.map((course) => (
            <div className="card" key={course.id}>
              <div
                className="training-logo"
                src="img\icon1.webp"
                alt="Python Logo"
              />
              <div className="training-content">
                <h2>{course.name}</h2>
                <div className="training-items">
                  <div className="training-item">
                    <img
                      src="/src/assets/icons/calendar_icon.svg"
                      alt="Calendar Icon"
                    />
                    <span>
                      {course.dateStart} - {course.dateEnd}
                    </span>
                  </div>
                  <div className="training-item">
                    <img
                      src="/src/assets/icons/clock_icon.svg"
                      alt="Clock Icon"
                    />
                    <span>
                      {course.timeStart} - {course.timeEnd} ({course.frequency})
                    </span>
                  </div>
                  <div className="training-item">
                    <img
                      src="/src/assets/icons/language_icon.svg"
                      alt="UK Flag Icon"
                    />
                    <span>{course.language}</span>
                  </div>
                  <div className="training-item">
                    <img
                      src="/src/assets/icons/level_icon.svg"
                      alt="Level Icon"
                    />
                    <span>{course.level}</span>
                  </div>
                  <div className="training-item">
                    <img
                      src="/src/assets/icons/location_icon.svg"
                      alt="Location Icon"
                    />
                    <span>{course.location}</span>
                  </div>
                  <div className="training-item">
                    <img
                      src="/src/assets/icons/trainer_logo.svg"
                      alt="Trainer Icon"
                    />
                    <span>Trainer: {course.trainer}</span>
                  </div>
                </div>
              </div>
              <button className="violet-button register-button">
                {loggedUser ? "Register" : "Log in first to enroll"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
