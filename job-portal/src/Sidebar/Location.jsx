import React from "react";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <select
        onChange={handleChange}
        className="sidebar-select"
        name="location"
      >
        <option value="">All</option>
        <option value="london">London</option>
        <option value="seattle">Seattle</option>
        <option value="madrid">Madrid</option>
        <option value="boston">Boston</option>
      </select>
    </div>
  );
};

export default Location;
