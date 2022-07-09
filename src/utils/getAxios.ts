import axios from "axios";

export default function getAxios() {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/`,
    withCredentials: true,
  });

  return instance;
}
