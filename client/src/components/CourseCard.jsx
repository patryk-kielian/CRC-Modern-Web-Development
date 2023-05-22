import React from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
  const { course, loggedUser, handleMode, handleFunction } = props;

  return (
    <div className="card" key={course.id}>
      <div
        className="training-logo"
        style={{ backgroundImage: `url(img/${course.image})` }}
        alt="Python Logo"
      />
      <div className="training-content">
        <h2>{course.name}</h2>
        <div className="training-items">
          <div className="training-item">
            <img src="icons/calendar_icon.svg" alt="Calendar Icon" />
            <span>
              {course.dateStart} - {course.dateEnd}
            </span>
          </div>
          <div className="training-item">
            <img src="icons/clock_icon.svg" alt="Clock Icon" />
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
      {handleMode === "register" &&
        (loggedUser ? (
          <button
            className="violet-button register-button"
            onClick={() => handleFunction(course.id)}
          >
            Register
          </button>
        ) : (
          <button className="violet-button register-button">
            <Link to="/login">Log in first to enroll</Link>
          </button>
        ))}
      {handleMode === "deregister" && (
        <button
          className="violet-button register-button"
          onClick={() => handleFunction(course.id)}
        >
          Leave the course
        </button>
      )}
      {handleMode === "delete" && (
        <button
          className="violet-button register-button"
          onClick={() => handleFunction(course.id)}
        >
          Delete the course
        </button>
      )}
    </div>
  );
}

export default CourseCard;
