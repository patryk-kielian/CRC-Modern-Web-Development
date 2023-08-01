import Axios from "axios";
import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/CourseLearn.css";
import { useNavigate } from "react-router-dom";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Carousel from "../components/Carousel";
import Popup from "../components/Popup";
import Error from "./Error";

export default function CourseLearn() {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [userEnrolled, setUserEnrolled] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [opinions, setOpinions] = useState(null);
  const { loggedUser } = useContext(LoggedUserContext);

  console.log(course);
  console.log(lessons);

  const courseId = useParams().courseId;
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      Axios.get(`${API_URL}/courses/${loggedUser.id}`).then((response) => {
        const userCourses = response.data.courses;
        const userCoursesIDs = userCourses.map((course) => course.course_id);
        console.log(userCoursesIDs);
        console.log(courseId);
        if (userCoursesIDs.includes(Number(courseId))) {
          setUserEnrolled(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (userEnrolled) {
      Axios.get(`${API_URL}/course/learn/${courseId}`).then((response) => {
        setCourse(response.data.course);
        setLessons(response.data.lessons);
      });
      Axios.get(`${API_URL}/opinions/${courseId}`).then((response) => {
        setOpinions(response.data.opinions);
      });
    }
  }, [userEnrolled]);

  useEffect(() => {
    lessons && setCurrentLesson(lessons[0]);
  }, [lessons]);
  console.log(currentLesson);
  if (!loggedUser) {
    return (
      <Error
        textMessage={"To access this page you must be logged in!"}
        textButton={"Log in"}
        route={"/login"}
      />
    );
  } else if (!userEnrolled) {
    return (
      <Error
        textMessage={"You are not enrolled to this tutorial"}
        textButton={"My tutorials"}
        route={"/user"}
      />
    );
  } else {
    return (
      course && (
        <>
          <aside className="navbar-insert">
            <h6>{course.name}</h6>
          </aside>
          <main>
            <section className="course-learn-video">
              <div className="course-learn-video-player">
                {currentLesson && (
                  <>
                    {currentLesson.lessonNr > 1 && (
                      <img
                        src="/assets/arrow_left.svg"
                        alt=""
                        className="course-learn-video-arrow left-arrow"
                        onClick={() =>
                          setCurrentLesson(lessons[currentLesson.lessonNr - 2])
                        }
                      />
                    )}
                    {currentLesson.lessonNr < lessons.length && (
                      <img
                        src="/assets/arrow_right.svg"
                        alt=""
                        className="course-learn-video-arrow right-arrow"
                        onClick={() =>
                          setCurrentLesson(lessons[currentLesson.lessonNr])
                        }
                      />
                    )}
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentLesson.videoURL}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </>
                )}
              </div>
            </section>
            <div className="course-learn-container">
              <section className="course-learn-lessons">
                <h3>Lessons in {course.name}</h3>
                <div className="course-learn-lessons-container">
                  {lessons.map((lesson, i) => {
                    return (
                      <>
                        <div
                          className="course-learn-lessons-row"
                          onClick={() => {
                            setCurrentLesson(lessons[lesson.lessonNr - 1]);
                          }}
                        >
                          <h6>{`${lesson.lessonNr}. ${lesson.title}`}</h6>
                          <p>{`${lesson.videoDuration} min`}</p>
                        </div>
                        {i < lessons.length - 1 && <hr />}
                      </>
                    );
                  })}
                </div>
              </section>
              <section className="course-learn-opinion">
                {/* TODO: form for submitting an opinion on the course*/}
              </section>
              <section className="course-opinions">
                <h2>What students say about this tutorial</h2>
                {opinions && opinions.length > 0 && (
                  <Carousel contentType={"opinions"} content={opinions} />
                )}
              </section>
            </div>
          </main>
        </>
      )
    );
  }
}
