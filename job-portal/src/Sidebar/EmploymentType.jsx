import React from "react";
import InputField from "../components/InputField";
import { useTranslation } from "react-i18next";

const EmploymentType = ({ handleChange }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">{t("employmentType")}</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>
          {t("any")}
        </label>
        <InputField
          handleChange={handleChange}
          value="full-time"
          title={t("fullTime")}
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="temporary"
          title={t("temporary")}
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="part-time"
          title={t("partTime")}
          name="test"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
