import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiService from "../ApiService";

export default function Login() {
  // const container = document.querySelector(".container");

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  const { t } = useTranslation();

  function signup() {
    console.log("signup...!");
    window.location.pathname = "/signup";
    history.push("/signup");
  }

  async function login() {
    console.log("login tried..");
    var input = {
      userId: username, //"atul.raut1",
      password: password, //"asdasddddada",
      acType: 1,
      macAddress: "abc",
    };
    console.warn("user details ..", username, password);
    var res = await apiService.login(input);
    console.log("resp", res);
    console.log("okok");
    // if
    if (username && password) {
      const userDetails = {
        username: "Ravi Aglave",
        userId: "raviaglave99@gmail.com",
      };
      localStorage.setItem("user-info", JSON.stringify(userDetails));
      window.location.pathname = "/home";
      history.push("/home");
    }
    // let data = { username, password };
    // let result = await fetch("http://localhost:3001/api/login", {
    //   method: "post",
    //   headers: {
    //     "content-type": "application/x-www-form-urlencoded; charset=utf-8",
    //   },
    //   body: `username=${username}&password=${password}`,
    // });
    // result = await result.json();
    // localStorage.setItem("user-info", JSON.stringify(result));
    // if (result.userValidated) {
    //   localStorage.setItem("username", username);
    //   // setLoggedIn(true);
    //   window.location.pathname = "/landing";
    //   history.push("/landing");
    // }
    //console.log(JSON.stringify(result));
  }

  return (
    // <body>
    <div>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>

      <div className="container">
        <div>
          <div className="signin-signup">
            <form action="#">
              <h2 className="title">{t("sing_in_label")}</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder={t("username_placeholder")}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder={t("password_placeholder")}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" onClick={login} className="btn solid">
                {t("login_btn")}
              </button>
              {/* <p className="social-text">Or Sign in with social platforms</p>
                  <div className="social-media">
                    <a href="#" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-google"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div> */}
            </form>
            {/*  */}
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>{t("new_here_text")}</h3>
              <p>{t("visitng_first_time")}</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={signup}
              >
                {t("singup_btn")}
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          {/* <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              type="submit"
              className="btn transparent"
              id="sign-in-btn"
              onClick={login}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div> */}
        </div>
      </div>
    </div>
  );
}
