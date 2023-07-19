import React from "react";
import { Link } from "react-router-dom";
import "../styles/CourseCardMin.css";

export default function CourseCardMin(props) {
  const { course } = props;
  return (
    <Link to={`/${course.id}`}>
      <div className="card-min" key={course.id}>
        <div
          className="card-min-logo"
          style={{
            backgroundImage: `url(img/${course.image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          alt="Python Logo"
        />
        <div className="card-min-content">
          <h4>{course.name}</h4>
          <p>{course.trainer}</p>
        </div>
      </div>
    </Link>
  );
}
