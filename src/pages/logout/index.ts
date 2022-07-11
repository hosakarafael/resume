import { useEffect } from "react";
import getAxios from "../../utils/getAxios";
import { useUserContext } from "../../context/userContext";
import Router from "next/router";

const Logout = () => {
  const { setUser } = useUserContext();

  useEffect(() => {
    getAxios().delete("/logout");
    setUser?.(null);
    Router.replace("/login");
  }, []);

  return;
};

export const REDIRECT_REQUEST_LOGOUT = {
  redirect: { destination: "/logout", permanent: false },
  props: {},
};

export default Logout;
