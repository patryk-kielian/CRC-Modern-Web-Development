import React from "react";
import { Link } from "react-router-dom";
import "../styles/CourseCardMin.css";

export default function CourseCardMin({
  course,
  isUserCourse = false,
  ...props
}) {
  return (
    <Link to={`/courses/${course.id}`}>
      <div
        className={`card-min ${isUserCourse && "card-min-user"}`}
        key={course.id}
      >
        <div
          className="card-min-logo"
          style={{
            backgroundImage: `url(img/${course.image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="card-min-content">
          <h4>{course.name}</h4>
          <p>{course.trainer}</p>
        </div>
        {isUserCourse && (
          <div className="card-min-buttons">
            <button
              className="ghost-black"
              onClick={(e) => {
                e.preventDefault();
                props.handleFunction(course.course_id);
              }}
            >
              Edit Tutorial
            </button>
            <button
              className="ghost-black"
              onClick={(e) => {
                e.preventDefault();
                props.handleFunction(course.course_id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
