import { CookieSerializeOptions } from "cookie";

export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  domain: process.env.COOKIE_DOMAIN,
  sameSite: "strict",
  maxAge: 60 * 60 * 24,
  path: "/",
} as CookieSerializeOptions;
