import { CookieSerializeOptions } from "cookie";

export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "strict",
  maxAge: 3600,
  path: "/",
} as CookieSerializeOptions;
