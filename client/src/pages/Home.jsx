import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import Popup from "../components/Popup";

function Home() {
  const [courses, setCourses] = useState([]);
  const { loggedUser } = useContext(LoggedUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from the server
    Axios.get("http://localhost:3001/courses").then((response) => {
      setCourses(response.data.courses);
    });
  }, []);

  const handleRegister = (courseId) => {
    if (loggedUser) {
      // Enroll the user to the course
      Axios.post("http://localhost:3001/course-attendance", {
        course_id: courseId,
        user_id: loggedUser.id,
      })
        .then((response) => {
          navigate("/user");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
            <CourseCard
              key={course.id}
              course={course}
              loggedUser={loggedUser}
              handleMode={"register"}
              handleFunction={handleRegister}
            ></CourseCard>
          ))}
        </div>
        <Popup message="You are already registered to this course!" />
      </main>
    </>
  );
}

export default Home;
