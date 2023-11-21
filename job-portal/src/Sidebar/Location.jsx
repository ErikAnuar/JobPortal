import { Input } from "postcss";
import React from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Локация</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>Все
        </label>
        <InputField
          handleChange={handleChange}
          value="london"
          title="Astana"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="seattle"
          title="Almaty"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="madrid"
          title="Kostanay"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="boston"
          title="Pavlodar"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
