import React, { useState } from "react";
import getAxios from "../../utils/getAxios";
import css from "./login.module.scss";
import { useAlert } from "../../components/Alert/Alert";
import Router from "next/router";
import { useUserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const axios = getAxios();
  const [alert, dispatchAlert] = useAlert();
  const { setUser: setCurrentUser } = useUserContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", {
        email: email,
        password: password,
      });
      delete data["password"];
      setCurrentUser?.(data);
      Router.replace(`/profile/${data.id}`);
    } catch (error: any) {
      if (error?.response?.data) {
        dispatchAlert(error.response.data.message, "danger");
      }
    }
  };

  return (
    <div className={css["login__container"]}>
      {alert}
      <div className={css["login"]}>
        <h1 className={css["header"]}>Login</h1>
        <form className={css["form"]} onSubmit={(e) => handleSubmit(e)}>
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

          <button className="btn btn--small btn--primary my-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
