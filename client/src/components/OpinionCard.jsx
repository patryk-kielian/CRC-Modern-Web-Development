import React from "react";
import "../styles/OpinionCard.css";

export default function OpinionCard({ opinion }) {
  const { id, text, name, rating } = opinion;

  let nStars = Math.floor(rating);
  if (rating % 1 > 0.75) {
    nStars += 1.0;
  } else if (rating % 1 > 0.25) {
    nStars += 0.5;
  }

  return (
    <div className="card-opinion-min" key={id}>
      <p className="card-opinion-text">{text}</p>
      <p className="card-opinion-stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            className={`material-symbols-outlined card-opinion-icon ${
              i < nStars - 0.5 ? "filled" : ""
            }`}
            key={i}
          >
            {i < nStars - 0.5 ? "star" : i < nStars ? "star_half" : "star"}
          </span>
        ))}
      </p>
      <p className="card-opinion-author">{name}</p>
    </div>
  );
}
