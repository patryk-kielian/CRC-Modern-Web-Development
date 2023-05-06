import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

function User() {
  const [userCourses, setUserCourses] = useState([]);
  const { loggedUser } = useContext(LoggedUserContext);

  if (loggedUser) {
    useEffect(() => {
      Axios.get(`http://localhost:3001/courses/${loggedUser.id}`).then(
        (response) => {
          setUserCourses(response.data.courses);
        }
      );
    }, [loggedUser]);
  }

  return (
    <>
      <Navbar />
      <main id="container">
        {loggedUser ? (
          <>
            <h1>Your exciting courses:</h1>

            <div className="cards-container">
              {userCourses.map((course) => (
                <CourseCard
                  course={course}
                  loggedUser={loggedUser}
                  handleRegister={null}
                ></CourseCard>
              ))}
            </div>
          </>
        ) : (
          <h1>This page is only for logged in users</h1>
        )}
      </main>
    </>
  );
}

export default User;
