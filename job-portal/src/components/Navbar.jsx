// Navbar.js
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation(); // useTranslation hook

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // menu toggle btn
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const navItems = [
    { path: "/", title: t("startSearch") },
    { path: "/my-job", title: t("myJobs") },
    { path: "/salary", title: t("salaryEstimate") },
    { path: "/post-job", title: t("postJob") },
    { path: "/favorites", title: t("favorites") },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobPortal</span>
        </a>

        {/* nav items */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* language select */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className="py-2 px-5 border rounded"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="kz">Қазақша</option>
          </select>
        </div>

        {/* sign up signout btn */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {user ? (
            <>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-2 overflow-hidden">
                  {user?.photoURL ? (
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="py-2 px-5 border rounded hover:bg-blue hover:text-white"
                >
                  {t("logOut")}
                </button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <Link to="/login" className="py-2 px-5 border rounded">
                {t("logIn")}
              </Link>
              <Link
                to="/sign-up"
                className="bg-blue py-2 px-5 text-white rounded"
              >
                {t("signUp")}
              </Link>
            </>
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <>
                <FaXmark className="w-5 h-5 text-primary/75" />
              </>
            ) : (
              <>
                <FaBarsStaggered className="w-5 h-5 text-primary/75" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="text-white py-1">
            <Link to="login">{t("logIn")}</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
