import React from "react";
import InputField from "../components/InputField";

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Тип занятости</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>Любой
        </label>
        <InputField
          handleChange={handleChange}
          value="full-time"
          title="Полная занятость"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="temporary"
          title="Временная работа"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="part-time"
          title="Частичная занятость"
          name="test"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
