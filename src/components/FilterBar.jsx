import React from "react";

export default function FilterBar({ categories, selected, onSelect }) {
  return (
    <div className="filter-bar">
      <span>Filter by Category:</span>
      <select value={selected} onChange={e => onSelect(e.target.value)}>
        <option value="">All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
