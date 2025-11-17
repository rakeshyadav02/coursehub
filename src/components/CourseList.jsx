import React from "react";
import CourseCard from "./CourseCard";

export default function CourseList({ courses, onSelect, onFavorite }) {
  return (
    <div className="course-list">
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        courses.map(course => (
          <CourseCard key={course.id} course={course} onSelect={onSelect} onFavorite={onFavorite} />
        ))
      )}
    </div>
  );
}
