import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { secret } from "./jwtConfig";

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth!, secret, async function (err, decoded) {
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

const isAuthenticated = (jwt: string) => {
  var flag = false;
  verify(jwt, secret, function (err, decoded) {
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

  return isAuthenticated(cookie);
};
