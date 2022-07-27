import { decode, sign, verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { CookieSerializeOptions } from "cookie";
import { User } from "@prisma/client";

export const SECRET = process.env.BCRYPT_SECRET as string;
export const EXPIRATION = 60 * 60 * 24; //seconds

export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  domain: process.env.COOKIE_DOMAIN,
  sameSite: "strict",
  maxAge: EXPIRATION,
  path: "/",
} as CookieSerializeOptions;

export function generateJWT(user: User) {
  const claims = { sub: user.id, username: user.email };
  return sign(claims, SECRET, { expiresIn: EXPIRATION });
}

export const authenticatedAPI =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth!, SECRET, async function (err, decoded) {
      try {
        if (!err && decoded) {
          return await fn(req, res);
        }
        res.status(401).json({ message: "Not authenticated" });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    });
  };

export const decodeJWT = (jwt: string) => {
  return decode(jwt);
};

const isValidJWT = (jwt: string) => {
  var flag = false;
  const decodedJWT = decodeJWT(jwt);
  if (!decodedJWT || isTokenExpired(decodedJWT)) {
    return false;
  }

  verify(jwt, SECRET, function (err, decoded) {
    if (!err && decoded) {
      flag = true;
    } else {
      flag = false;
    }
  });
  return flag;
};

export const isAuthenticatedRequest = (req: {
  cookies: Partial<{ [key: string]: string }>;
}) => {
  const cookie = req.cookies.auth;
  if (!cookie) {
    return false;
  }

  return isValidJWT(cookie);
};

function isTokenExpired(token: any) {
  const currentDate = new Date();
  if (token.exp * 1000 < currentDate.getTime()) {
    return true;
  } else {
    return false;
  }
}
