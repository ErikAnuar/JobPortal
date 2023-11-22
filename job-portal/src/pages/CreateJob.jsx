/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import PageHeader from "../components/PageHeader"

const CreateJob = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    fetch("http://localhost:5000/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          alert(t("JobPostedSuccessfully"));
        }
        reset(); // Reset the form
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
      <PageHeader title={t("PostAJob")} path={t("post job")} />
      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("JobTitle")}</label>
              <input
                defaultValue="Web Developer"
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("CompanyName")}</label>
              <input
                placeholder="Ex: Microsoft"
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
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">{t("MaximumSalary")}</label>
              <input
                placeholder="$100k"
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
                placeholder="Ex: New York"
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
                placeholder="Ex: 2023-11-03"
                type="date"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                {t("workExperience")}
              </label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="0">{t("noExperience")}</option>
                <option value="1-3">{t("oneToThreeYears")}</option>
                <option value="3-6">{t("threeToSixYears")}</option>
                <option value="6+">{t("overSixYears")}</option>
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
              defaultValue={selectedOption}
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
                placeholder="Paste your image url: https://weshare.com/img1.jpg"
                {...register("companyLogo")}
                className="create-job-input"
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
              defaultValue={
                "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
              }
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">{t("JobPostedBy")}</label>
            <input
              type="email"
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("postedBy")}
              placeholder={t("YourEmail")}
              value={user?.email}
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

export default CreateJob;
