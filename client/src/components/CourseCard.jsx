import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
  const { course, loggedUser, handleRegister } = props;

  useEffect(() => console.log(handleRegister), []);
  return (
    <div className="card" key={course.id}>
      <div className="training-logo" src="img\icon1.webp" alt="Python Logo" />
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
            <img src="/src/assets/icons/clock_icon.svg" alt="Clock Icon" />
            <span>
              {course.timeStart} - {course.timeEnd} ({course.frequency})
            </span>
          </div>
          <div className="training-item">
            <img src="/src/assets/icons/language_icon.svg" alt="UK Flag Icon" />
            <span>{course.language}</span>
          </div>
          <div className="training-item">
            <img src="/src/assets/icons/level_icon.svg" alt="Level Icon" />
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
            <img src="/src/assets/icons/trainer_logo.svg" alt="Trainer Icon" />
            <span>Trainer: {course.trainer}</span>
          </div>
        </div>
      </div>
      {handleRegister &&
        (loggedUser ? (
          <button
            className="violet-button register-button"
            onClick={() => handleRegister(course.id)}
          >
            Register
          </button>
        ) : (
          <button className="violet-button register-button">
            <Link to="/login">Log in first to enroll</Link>
          </button>
        ))}
    </div>
  );
}

export default CourseCard;
