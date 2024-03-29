import React from "react";
import { Link } from "react-router-dom";
import "../styles/CourseCard.css";

function CourseCard({ course, isUserCourse = false, ...props }) {
  const rating = course.averageRating;

  let nStars = Math.floor(rating);
  if (rating % 1 > 0.75) {
    nStars += 1.0;
  } else if (rating % 1 > 0.25) {
    nStars += 0.5;
  }

  return (
    <Link
      to={
        isUserCourse
          ? `/courses/learn/${course.course_id}`
          : `/courses/${course.id}`
      }
    >
      <div className={`card ${isUserCourse && "card-user"}`} key={course.id}>
        <div className="card-top">
          <div
            className="card-logo"
            style={{ backgroundImage: `url(img/${course.image})` }}
            alt={`${course.name} Logo`}
          />
          <div className="card-content">
            <h4>{course.name}</h4>
            <div className="card-items">
              <div className="card-item">
                <span className="material-symbols-outlined card-item-icon">
                  person_raised_hand
                </span>
                {/* <img src="icons/trainer_logo.svg" alt="Trainer Icon" /> */}
                <span className="card-item-text">{course.trainer}</span>
              </div>
              <div className="card-item">
                <span className="material-symbols-outlined card-item-icon">
                  translate
                </span>
                {/* <img src="icons/language_icon.svg" alt="UK Flag Icon" /> */}
                <span className="card-item-text">{course.language}</span>
              </div>
              <div className="card-item">
                <span className="material-symbols-outlined card-item-icon">
                  bar_chart_4_bars
                </span>
                {/* <img src="icons/level_icon.svg" alt="Level Icon" /> */}
                <span className="card-item-text">{course.level}</span>
              </div>
            </div>

            <p>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  className={`material-symbols-outlined card-star ${
                    i < nStars - 0.5 ? "filled" : ""
                  }`}
                  key={i}
                >
                  {i < nStars - 0.5
                    ? "star"
                    : i < nStars
                    ? "star_half"
                    : "star"}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="card-bottom">
          <p>{course.descriptionShort}</p>
          {isUserCourse && (
            <button
              className="ghost-black"
              onClick={(e) => {
                console.log(props.handleFunction);
                e.preventDefault();
                props.handleFunction(course.course_id);
              }}
            >
              Leave this tutorial
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
