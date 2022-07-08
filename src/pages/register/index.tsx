import React, { useState } from "react";
import getAxios from "../../utils/getAxios";
import css from "./register.module.scss";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const axios = getAxios();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={css["register__container"]}>
      <div className={css["register"]}>
        <h1 className={css["header"]}>Signup</h1>
        <form className={css["form"]} onSubmit={(e) => handleSubmit(e)}>
          <span className="form-label">First name</span>
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <span className="form-label">Last name</span>
          <input
            className="form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
          <span className="form-label">E-mail</span>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <span className="form-label">Password</span>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className="btn btn--small btn--primary my-2">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
