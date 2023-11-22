import React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

const Salary = ({ handleChange, handleClick }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">{t("salary")}</h4>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="salary" />
          <span className="checkmark"></span>
          {t("any")}
        </label>

        <InputField
          handleChange={handleChange}
          value={100}
          title={t("lessThan100K")}
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={250}
          title={t("lessThan250K")}
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={500}
          title={t("lessThan500K")}
          name="salary"
        />

        <InputField
          handleChange={handleChange}
          value={1000}
          title={t("lessThan1M")}
          name="salary"
        />
      </div>
    </div>
  );
};

export default Salary;
