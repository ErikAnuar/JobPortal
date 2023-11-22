import React from "react";
import InputField from "../components/InputField";
import { useTranslation } from "react-i18next";

const JobPostingData = ({ handleChange }) => {
  const { t } = useTranslation();

  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">{t("dateOfPosting")}</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>
          {t("allTime")}
        </label>
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title={t("last24Hours")}
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={SevenDaysAgoDate}
          title={t("last7Days")}
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={ThirtyDaysAgoDate}
          title={t("lastMonth")}
          name="test"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
