import React, { useState } from "react";
import getAxios from "../../utils/getAxios";
import css from "./register.module.scss";
import Router from "next/router";
import { useAlert } from "../../components/Alert/Alert";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const axios = getAxios();
  const [alert, dispatchAlert] = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      dispatchAlert("E-mail does not match", "warning");
      return;
    }

    if (password !== confirmPassword) {
      dispatchAlert("Password does not match", "warning");
      return;
    }

    await axios.post("/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    Router.replace("/login");
  };

  return (
    <div className={css["register__container"]}>
      {alert}
      <div className={css["register"]}>
        <h1 className={css["header"]}>Signup</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={css["form"]}>
            <div className={css["form-group"]}>
              <div className="form-label">First name</div>
              <input
                className="form-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </div>
            <div className={css["form-group"]}>
              <div className="form-label">Last name</div>
              <input
                className="form-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </div>

            <div className={css["form-group"]}>
              <p className="form-label">E-mail</p>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>

            <div className={css["form-group"]}>
              <div className="form-label">Confirm E-mail</div>
              <input
                className="form-input"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.currentTarget.value)}
              />
            </div>
            <div className={css["form-group"]}>
              <div className="form-label">Password</div>
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            <div className={css["form-group"]}>
              <div className="form-label">Confirm Password</div>
              <input
                className="form-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="m2">
            <button className="btn btn--small btn--stretched btn--primary my-2">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
