import React, { useContext, useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiHeart,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

const Card = ({ data }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const {
    _id,
    companyLogo,
    jobTitle,
    companyName,
    jobLocation,
    employmentType,
    minPrice,
    maxPrice,
    postingDate,
    description,
  } = data;

  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    // Check if the job is already in favorites when the component mounts
    const checkFavorites = async () => {
      if (user && user?.favoriteJobs?.includes(_id)) {
        setIsInFavorites(true);
      } else {
        setIsInFavorites(false);
      }
    };

    checkFavorites();

    // Fetch user favorites when the component mounts
    const fetchUserFavorites = async () => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:5000/favorite-jobs/${user.email}`
          );
          const userFavorites = await response.json();
          if (userFavorites.includes(_id)) {
            setIsInFavorites(true);
          } else {
            setIsInFavorites(false);
          }
        } catch (error) {
          console.error("Error fetching user favorites:", error);
        }
      }
    };

    fetchUserFavorites();
  }, [user, _id]);
  
  const handleToggleFavorites = () => {
    // Toggle the state directly
    setIsInFavorites((prevIsInFavorites) => !prevIsInFavorites);

    // Assuming you have the job ID (_id) and user information available
    const jobId = _id;
    const userEmail = user?.email;

    if (isInFavorites) {
      fetch(`http://localhost:5000/favorite-job/${userEmail}/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error deleting favorite:", error));
    } else if (userEmail && jobId) {
      fetch("http://localhost:5000/favorite-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, jobId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error adding favorites:", error));
    }
  };

  return (
    <div>
      <section className="card">
        <div className="flex gap-4 flex-col sm:flex-row items-start">
          <img src={companyLogo} alt={jobTitle} className="w-16 h-16 mb-4" />
          <div className="card-details">
            <h4 className="text-primary mb-1">{companyName}</h4>
            <Link to={`/jobs/${_id}`}>
              <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
            </Link>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2">
                <FiMapPin /> {jobLocation}
              </span>
              <span className="flex items-center gap-2">
                <FiClock /> {employmentType}
              </span>
              <span className="flex items-center gap-2">
                ₸ {minPrice}-{maxPrice}k
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar /> {postingDate}
              </span>
            </div>

            <p className="text-base text-primary/70 ">{description}</p>

            {user && (
              <button
                onClick={handleToggleFavorites}
                className="flex items-center gap-2 text-primary mt-4"
              >
                <FiHeart fill={isInFavorites ? "#45b6fe" : "none"} />{" "}
                {t(isInFavorites ? "removeFromFavorites" : "addToFavorites")}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
