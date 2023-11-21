import React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Зарплата</h4>
      {/* salaryType filtering */}
      <div className="mb-4">
        <Button onClickHandler={handleClick} value="" title="Ежечасно" />
        <Button
          onClickHandler={handleClick}
          value="monthly"
          title="Ежемесячно"
        />
        <Button onClickHandler={handleClick} value="yearly" title="Ежегодно" />
      </div>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>Любая
        </label>

        <InputField
          handleChange={handleChange}
          value={30}
          title="< 30000T"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={50}
          title="< 50000T"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={80}
          title="< 80000T"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={100}
          title="< 100000T"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
