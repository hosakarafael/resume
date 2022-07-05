import React, { useState } from "react";
import getAxios from "../../utils/getAxios";
import css from "./register.module.scss";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const axios = getAxios();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("/users", {
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className={css["register__container"]}>
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
          type="text"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button className="btn btn--primary">Create</button>
      </form>
    </div>
  );
};

export default Register;
