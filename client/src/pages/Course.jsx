import Axios from "axios";
import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Course.css";
import { useNavigate } from "react-router-dom";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Carousel from "../components/Carousel";
import Popup from "../components/Popup";

export default function Course() {
  const [course, setCourse] = useState(null);
  const [creator, setCreator] = useState(null);
  const [opinions, setOpinions] = useState(null);
  const [userEnrolled, setUserEnrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { loggedUser } = useContext(LoggedUserContext);

  const courseId = useParams().courseId;
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${API_URL}/course/${courseId}`).then((response) => {
      setCourse(response.data.course[0]);
    });
    Axios.get(`${API_URL}/creator/${courseId}`).then((response) => {
      setCreator(response.data.creator[0]);
    });
    Axios.get(`${API_URL}/opinions/${courseId}`).then((response) => {
      setOpinions(response.data.opinions);
    });

    if (loggedUser) {
      Axios.get(`${API_URL}/courses/${loggedUser.id}`).then((response) => {
        const userCourses = response.data.courses;
        const userCoursesIDs = userCourses.map((course) => course.course_id);
        if (userCoursesIDs.includes(Number(courseId))) {
          setUserEnrolled(true);
        }
      });
    }
  }, []);

  const handleRegister = () => {
    if (loggedUser) {
      // Enroll the user to the course
      Axios.post(`${API_URL}/course-attendance`, {
        course_id: courseId,
        user_id: loggedUser.id,
      })
        .then((response) => {
          navigate("/user");
        })
        .catch((error) => {
          console.log(error);
          setShowPopup(true);
        });
    }
  };

  let buttonComponent;

  if (loggedUser && userEnrolled) {
    buttonComponent = (
      <Link to={`/courses/learn/${courseId}`}>
        <button className="course-bar-button">Go to lessons</button>
      </Link>
    );
  } else if (loggedUser) {
    buttonComponent = (
      <button className="course-bar-button" onClick={handleRegister}>
        Register
      </button>
    );
  } else {
    buttonComponent = (
      <Link to="/login">
        <button className="course-bar-button">Log in to enroll</button>
      </Link>
    );
  }

  return (
    <>
      {course && (
        <>
          <div className="course-bar-fixed">
            <div className="course-bar-left">
              <h4>{course.name}</h4>
              {buttonComponent}
            </div>
            <div className="course-bar-right">
              <div className="course-bar-item">
                <span className="material-symbols-outlined course-bar-icon">
                  person_raised_hand
                </span>
                <span className="course-bar-text">{course.trainer}</span>
              </div>
              <div className="course-bar-item">
                <span className="material-symbols-outlined course-bar-icon">
                  <span class="material-symbols-outlined">group</span>
                </span>
                <span className="course-bar-text">TODO students enrolled</span>
              </div>
              <div className="course-bar-item">
                <span className="material-symbols-outlined course-bar-icon">
                  star
                </span>
                <span className="course-bar-text">{course.averageRating}</span>
              </div>
              <div className="course-bar-item">
                <span className="material-symbols-outlined course-bar-icon">
                  translate
                </span>
                <span className="course-bar-text">{course.language}</span>
              </div>
            </div>
          </div>
          <main className="course-container">
            <section className="course-desc-points">
              <h2>What you will learn</h2>
              <div className="course-desc-container">
                <p>{course.descriptionPoints}</p>
              </div>
            </section>
            <section className="course-demo">
              <h2>Tutorial Demo</h2>
              <div className="course-demo-player">
                <iframe
                  width="100%"
                  height="100%"
                  src={course.demoURL}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
            <section className="course-desc-long">
              <div className="course-desc-long-left">
                <h2>Tutorial Description</h2>
                <div className="course-desc-container">
                  <p>{course.descriptionLong}</p>
                </div>
              </div>
              <div className="course-desc-long-right">
                <h2>About the trainer</h2>
                <div className="course-desc-container">
                  {creator && (
                    <>
                      <div className="course-trainer-top">
                        <div
                          className="course-trainer-img"
                          style={{
                            backgroundImage: `url("https://i.imgur.com/R5TC4jI.png")`,
                          }}
                        ></div>
                        <h3>{creator.name}</h3>
                      </div>
                      <div className="course-trainer-bottom">
                        <p>{creator.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
            <section className="course-opinions">
              <h2>What students say about this tutorial</h2>
              {opinions && (
                <Carousel contentType={"opinions"} content={opinions} />
              )}
            </section>
          </main>
          <Popup
            message="You are already registered to this course!"
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        </>
      )}
    </>
  );
}
