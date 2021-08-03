import React, { useState } from "react";
import swal from "sweetalert";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const [validateCapt, setvalidateCapt] = useState(false);
  const { t } = useTranslation();

  const [name, setname] = useState("");
  const [userRole, setuserRole] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");

  // const [userData, setuserData] = useState({
  //   name: name,
  //   userRole: userRole,
  //   email: email,
  //   mobile: mobile,
  //   password: password,
  //   confrimPassword: confrimPassword,
  // });
  function register() {
    console.log(name, email, userRole, mobile, password, confrimPassword);
    // console.log(userData);
    swal("Registration Completed ! ", " ", "success");
  }

  function validateCaptcha() {
    setvalidateCapt(true);
  }

  return (
    <div>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>
            <b>
              <label>{t("singup_btn")}</label>
            </b>
          </h1>
          <form className="formStyle">
            <div className="firstName">
              <input
                className="input"
                //   className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder={t("name")}
                type="text"
                name={name}
                onChange={(e) => setname(e.target.value)}
                noValidate
                //   onChange={this.handleChange}
              />
              {/* {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )} */}
            </div>
            <div className="role">
              {/* <input
                //   className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                //   onChange={this.handleChange}
              /> */}
              <select
                placeholder="User Role"
                name={userRole}
                onChange={(e) => setuserRole(e.target.value)}
                type="select"
              >
                <option>{t("selectRole")}</option>
                <option>Customer</option>
                <option>Provider</option>
              </select>
            </div>
            <div className="email">
              <input
                //   className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder={t("email")}
                type="text"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                noValidate
                //   onChange={this.handleChange}
              />
              {/* {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )} */}
            </div>

            <div className="mobile">
              <input
                //   className={formErrors.password.length > 0 ? "error" : null}
                placeholder={t("mobile")}
                type="number"
                name={mobile}
                onChange={(e) => setmobile(e.target.value)}
                noValidate
                //   onChange={this.handleChange}
              />
            </div>

            <div className="password">
              <input
                //   className={formErrors.email.length > 0 ? "error" : null}
                placeholder={t("password_placeholder")}
                type="password"
                name={password}
                onChange={(e) => setpassword(e.target.value)}
                noValidate
                //   onChange={this.handleChange}
              />
            </div>
            <div className="confirmPassword">
              <input
                //   className={formErrors.password.length > 0 ? "error" : null}
                placeholder={t("confirmPassword")}
                type="password"
                name={confrimPassword}
                onChange={(e) => setconfrimPassword(e.target.value)}
                noValidate
                //   onChange={this.handleChange}
              />
            </div>
            <div className="captcha">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={validateCaptcha}
              />
            </div>
            <div className="createAccount">
              <button disabled={!validateCapt} type="button" onClick={register}>
                {t("singup_btn")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
