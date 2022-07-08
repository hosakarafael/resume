import { CookieSerializeOptions } from "cookie";

export const cookieConfig = {
  httpOnly: true,
  domain:
    process.env.NODE_ENV === "development"
      ? ".localhost"
      : ".resume-steel-six.vercel.app",
  secure: process.env.NODE_ENV !== "development",
  sameSite: "strict",
  maxAge: 3600,
  path: "/",
} as CookieSerializeOptions;
