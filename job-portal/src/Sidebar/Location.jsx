import React from "react";
import { useTranslation } from "react-i18next";

const Location = ({ handleChange }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">{t("location")}</h4>
      <select
        onChange={handleChange}
        className="sidebar-select"
        name="location"
      >
        <option value="">{t("all")}</option>
        <option value="remote">{t("remote")}</option>
        <option value="aktobe">{t("aktobe")}</option>
        <option value="astana">{t("astana")}</option>
        <option value="almaty">{t("almaty")}</option>
        <option value="karagandy">{t("karagandy")}</option>
        <option value="pavlodar">{t("pavlodar")}</option>
      </select>
    </div>
  );
};

export default Location;
