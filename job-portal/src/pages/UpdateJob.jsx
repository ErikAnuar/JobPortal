import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import PageHeader from "../components/PageHeader";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

const UpdateJob = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
    postedBy,
    skills,
  } = useLoaderData();

  const [selectedOption, setSelectedOption] = useState(null);

  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    fetch(`http://localhost:5000/update-job/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert(t("JobUpdatedSuccessfully"));
        }
      });
  };

  const options = [
    { value: "Communication", label: t("Communication") },
    { value: "ProblemSolving", label: t("ProblemSolving") },
    { value: "TimeManagement", label: t("TimeManagement") },
    { value: "Leadership", label: t("Leadership") },
    { value: "Teamwork", label: t("Teamwork") },
    { value: "Adaptability", label: t("Adaptability") },
    { value: "Creativity", label: t("Creativity") },
    { value: "CriticalThinking", label: t("CriticalThinking") },
    { value: "Organization", label: t("Organization") },
    { value: "Negotiation", label: t("Negotiation") },
    { value: "DecisionMaking", label: t("DecisionMaking") },
    { value: "EmotionalIntelligence", label: t("EmotionalIntelligence") },
    { value: "ConflictResolution", label: t("ConflictResolution") },
    { value: "Networking", label: t("Networking") },
    { value: "Programming", label: t("Programming") },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={t("UpdateThisJob")} path={t("EditJob")} />

      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("JobTitle")}</label>
              <input
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("CompanyName")}</label>
              <input
                placeholder={t("Ex:Microsoft")}
                defaultValue={companyName}
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("MinimumSalary")}</label>
              <input
                placeholder={t("$20k")}
                defaultValue={minPrice}
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("MaximumSalary")}</label>
              <input
                placeholder={t("$100k")}
                defaultValue={maxPrice}
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("JobLocation")}</label>
              <input
                placeholder={t("Ex:NewYork")}
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                {t("JobPostingDate")}
              </label>
              <input
                className="create-job-input"
                {...register("postingDate")}
                placeholder={t("Ex:2023-11-03")}
                type="date"
                defaultValue={postingDate}
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                {t("ExperienceLevel")}
              </label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="NoExperience">{t("NoExperience")}</option>
                <option value="Internship">{t("Internship")}</option>
                <option value="WorkRemotely">{t("WorkRemotely")}</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">
              {t("RequiredSkillSets")}
            </label>
            <CreatableSelect
              className="create-job-input py-4"
              defaultValue={skills}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("CompanyLogo")}</label>
              <input
                type="url"
                placeholder={t("PasteYourImageURL")}
                {...register("companyLogo")}
                className="create-job-input"
                defaultValue={companyLogo}
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                {t("employmentType")}
              </label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">{t("fullTime")}</option>
                <option value="Part-time">{t("partTime")}</option>
                <option value="Temporary">{t("temporary")}</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">{t("JobDescription")}</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              {...register("description")}
              placeholder={t("JobDescriptionPlaceholder")}
              defaultValue={description}
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">{t("JobPostedBy")}</label>
            <input
              type="email"
              value={user?.email}
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("postedBy")}
              placeholder={t("YourEmail")}
              defaultValue={postedBy}
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
