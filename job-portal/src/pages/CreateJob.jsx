/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaDollarSign } from "react-icons/fa";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // const { user } = useContext(AuthContext);

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
        // console.log(result);
        if (result.acknowledged === true) {
          alert("Job Posted Successfully!!");
        }
        reset(); // Reset the form
      });

    // console.log(data)
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  // console.log(watch("example"));

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* <PageHeader title={"Опубликовать вакансию"} path={"Создать вакансию"} /> */}

      {/* Форма */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1-я строка */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Название вакансии</label>
              <input
                defaultValue="Web Developer"
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Название компании</label>
              <input
                placeholder="Например: Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2-я строка */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Минимальная зарплата</label>
              <input
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                Максимальная зарплата
              </label>
              <input
                placeholder="$100k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3-я строка */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Тип зарплаты</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Выберите тип зарплаты</option>
                <option value="Hourly">Почасовая</option>
                <option value="Monthly">Ежемесячная</option>
                <option value="Yearly">Ежегодная</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Место работы</label>
              <input
                placeholder="Например: Нью-Йорк"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4-я строка */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                Дата размещения вакансии
              </label>
              <input
                className="create-job-input"
                {...register("postingDate")}
                placeholder="Например: 2023-11-03"
                type="date"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Уровень опыта</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="">Выберите ваш уровень опыта</option>
                <option value="NoExperience">Без опыта</option>
                <option value="Internship">Стажировка</option>
                <option value="Work remotely">Удаленная работа</option>
              </select>
            </div>
          </div>

          {/* 5-я строка */}
          <div className="">
            <label className="block mb-2 text-lg">Необходимые навыки:</label>
            <CreatableSelect
              className="create-job-input py-4"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6-я строка */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Логотип компании</label>
              <input
                type="url"
                placeholder="Вставьте URL вашего изображения: https://weshare.com/img1.jpg"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Тип занятости</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value="">Выберите тип занятости</option>
                <option value="Full-time">Полная занятость</option>
                <option value="Part-time">Частичная занятость</option>
                <option value="Temporary">Временная работа</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Описание вакансии</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              {...register("description")}
              placeholder="Описание вакансии"
              defaultValue={
                "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
              }
            />
          </div>

          {/* Последняя строка */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Опубликовано вакансией</label>
            <input
              type="email"
              // value={user?.email}
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("postedBy")}
              placeholder="ваш адрес электронной почты"
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
