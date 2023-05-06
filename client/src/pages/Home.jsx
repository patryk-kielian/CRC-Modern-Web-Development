import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

function Home() {
  const [courses, setCourses] = useState([]);
  const { loggedUser } = useContext(LoggedUserContext);

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
              course={course}
              loggedUser={loggedUser}
              handleRegister={handleRegister}
            ></CourseCard>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
