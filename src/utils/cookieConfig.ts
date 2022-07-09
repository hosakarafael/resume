import { CookieSerializeOptions } from "cookie";

export const devCookieConfig = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 3600,
  path: "/",
} as CookieSerializeOptions;

export const cookieConfig = {
  httpOnly: true,
  secure: true,
  domain: process.env.COOKIE_DOMAIN,
  sameSite: "strict",
  maxAge: 3600,
  path: "/",
} as CookieSerializeOptions;
