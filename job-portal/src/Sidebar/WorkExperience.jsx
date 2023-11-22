import React from "react";
import InputField from "../components/InputField";
import { useTranslation } from "react-i18next";

const WorkExperience = ({ handleChange }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">{t("workExperience")}</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="0" name="exp" />
          <span className="checkmark"></span>
          {t("noExperience")}
        </label>
        <InputField
          handleChange={handleChange}
          value="1-3"
          title={t("oneToThreeYears")}
          name="exp"
        />
        <InputField
          handleChange={handleChange}
          value="3-6"
          title={t("threeToSixYears")}
          name="exp"
        />
        <InputField
          handleChange={handleChange}
          value="6+"
          title={t("overSixYears")}
          name="exp"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
