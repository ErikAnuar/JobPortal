import { useTranslation } from "react-i18next";

const Jobs = ({ result }) => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2">{result.length} {t("jobs")}</h3>
      </div>
      <section className="card-container">{result}</section>
    </>
  );
};

export default Jobs;
