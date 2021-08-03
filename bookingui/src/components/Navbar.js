import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [state, setstate] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info"))
      setstate(JSON.parse(localStorage.getItem("user-info")).username);
    console.log(state);

    return () => {
      "cleanup;";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    localStorage.clear();
    window.location.pathname = "/landing";
    history.push("/landing");
  }
  return (
    <div>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
        <div className="container-fluid">
          <a
            className="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold"
            href="/home"
          >
            <div>
              <img alt="" className="imageWidth" src="img/carLogo.svg" />
            </div>
          </a>
          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarnav"
            aria-controls="navbarnav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarnav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="/home" className="nav-link">
                  {t("navbarHomeLink")}
                </a>
              </li>
              <li className="nav-item">
                <a href="/admin" className="nav-link">
                  {t("navbarAdminLink")}
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown bi bi-person-circle">
                <a
                  className="nav-link dropdown-toggle nav-user-img"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 17"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  {state}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="/" onClick={logout}>
                    {t("logout")}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
