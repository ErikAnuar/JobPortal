import React from "react";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingData from "./JobPostingData";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";
import { useTranslation } from "react-i18next";

const Sidebar = ({ handleChange, handleClick }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">{t("filters")}</h3>
      <Location handleChange={handleChange} />
      <Salary handleChange={handleChange} handleClick={handleClick} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
