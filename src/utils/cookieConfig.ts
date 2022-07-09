import { CookieSerializeOptions } from "cookie";

export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  domain: `.${process.env.NEXT_PUBLIC_APP_URL}`,
  sameSite: "strict",
  maxAge: 3600,
  path: "/",
} as CookieSerializeOptions;
