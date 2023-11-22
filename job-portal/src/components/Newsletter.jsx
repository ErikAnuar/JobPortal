import React from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Newsletter = () => {
  const { t } = useTranslation(); // useTranslation hook

  return (
    <div>
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          {" "}
          <FaEnvelopeOpenText /> {t("emailMeForJobs")}
        </h3>
        <p className="text-primary/75 text-base mb-4">
          {t("emailMeForJobsDescription")}
        </p>
        <div className="w-full space-y-4">
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value={t("subscribe")}
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>

      {/* 2nd section */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket /> {t("getNoticedFaster")}
        </h3>
        <p className="text-primary/75 text-base mb-4">
          {t("getNoticedFasterDescription")}
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value={t("uploadResume")}
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
