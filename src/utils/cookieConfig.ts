import { CookieSerializeOptions } from "cookie";

export const cookieConfig = {
  httpOnly: true,
  secure: true,
  domain: process.env.COOKIE_DOMAIN,
  sameSite: "strict",
  maxAge: 3600,
  path: "/",
} as CookieSerializeOptions;
