import axios from "axios";

export default function getAxios() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  return instance;
}
