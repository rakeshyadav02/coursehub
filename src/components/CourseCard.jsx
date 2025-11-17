import React from "react";
import "../App.css";

export default function CourseCard({ course, onSelect, onFavorite }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <h3>{course.title}</h3>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p>{course.description}</p>
      <div className="course-tags">
        {course.tags.map(tag => (
          <span key={tag} className="course-tag">{tag}</span>
        ))}
      </div>
      <button onClick={() => onSelect(course)} className="details-btn">Details</button>
      <button onClick={() => onFavorite(course.id)} className={course.favorite ? "favorite-btn active" : "favorite-btn"}>
        {course.favorite ? "★ Favorite" : "☆ Favorite"}
      </button>
    </div>
  );
}
