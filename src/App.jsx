

import React, { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("/mock-courses.json")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const categories = Array.from(new Set(courses.map(c => c.category)));

  const filteredCourses = courses
    .filter(c =>
      (c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase())) &&
      (category === "" || c.category === category)
    );

  const handleFavorite = id => {
    setCourses(courses =>
      courses.map(c =>
        c.id === id ? { ...c, favorite: !c.favorite } : c
      )
    );
  };

  return (
    <div className="lms-bg">
      <header className="lms-header">
        <div className="lms-header-content">
          <h1>Learning Management System</h1>
          {/* Removed the inspirational designs line as requested */}
        </div>
        <div className="lms-header-search">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar categories={categories} selected={category} onSelect={setCategory} />
        </div>
      </header>
      <main className="lms-main">
        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No courses found" />
            <div>No courses found. Try a different search or filter.</div>
          </div>
        ) : (
          <CourseList courses={filteredCourses} onSelect={setSelectedCourse} onFavorite={handleFavorite} />
        )}

        {selectedCourse && (
          <div className="modal" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>{selectedCourse.title}</h2>
              <img src={selectedCourse.image} alt={selectedCourse.title} />
              <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
              <p>{selectedCourse.description}</p>
              <div>
                <strong>Tags:</strong> {selectedCourse.tags.join(", ")}
              </div>
              <div>
                <strong>Category:</strong> {selectedCourse.category}
              </div>
              <button onClick={() => setSelectedCourse(null)}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
