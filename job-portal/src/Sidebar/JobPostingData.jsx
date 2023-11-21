import React from "react";
import InputField from "../components/InputField";

const JobPostingData = ({ handleChange }) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  // console.log(twentyFourHoursAgo)

  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10);
  console.log(twentyFourHoursAgoDate);
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Дата публикации</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>За всё время
        </label>
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Последние 24 часа"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={SevenDaysAgoDate}
          title="Последние 7 дней"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={ThirtyDaysAgoDate}
          title="Последний месяц"
          name="test"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
