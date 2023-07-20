import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";

function User() {
  const [userCourses, setUserCourses] = useState([]);
  const [adminCourses, setAdminCourses] = useState([]);
  const [refreshRequired, setRefreshRequired] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);

  useEffect(() => {
    if (loggedUser) {
      Axios.get(`${API_URL}/courses/${loggedUser.id}`)
        .then((response) => {
          setUserCourses(response.data.courses);
        })
        .catch((error) => {
          console.log(error);
        });

      if (loggedUser.isAdmin) {
        Axios.get(`${API_URL}/courses-admin/${loggedUser.id}`)
          .then((response) => {
            setAdminCourses(response.data.courses);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setRefreshRequired(false);
  }, [loggedUser, refreshRequired]);

  const handleDeregister = (courseId) => {
    if (loggedUser) {
      Axios.delete(`${API_URL}/course-attendance`, {
        data: {
          course_id: courseId,
          user_id: loggedUser.id,
        },
      })
        .then(() => {
          setRefreshRequired(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = (courseId) => {
    if (loggedUser.isAdmin) {
      Axios.delete(`${API_URL}/delete-course/${courseId}`)
        .then(() => {
          setRefreshRequired(true);
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
        {loggedUser ? (
          <>
            <h1>Your exciting courses:</h1>

            <div className="cards-container">
              {loggedUser.isAdmin
                ? adminCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      loggedUser={loggedUser}
                      handleMode={"delete"}
                      handleFunction={() => handleDelete(course.course_id)}
                    ></CourseCard>
                  ))
                : null}
              {userCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  loggedUser={loggedUser}
                  handleMode={"deregister"}
                  handleFunction={() => handleDeregister(course.course_id)}
                ></CourseCard>
              ))}
            </div>
          </>
        ) : (
          <h1>This page is only for logged in users</h1>
        )}
      </main>
      <Footer />
    </>
  );
}

export default User;
