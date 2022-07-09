import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { expiration, secret } from "../../utils/jwtConfig";
import cookie from "cookie";
import { cookieConfig } from "../../utils/cookieConfig";
import { UserAllDataService } from "../../service/userService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { email, password },
  } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const user = await UserAllDataService.findByEmail(email);

  if (user) {
    compare(password, user?.password, function (err, result) {
      if (!err && result) {
        const claims = { sub: user.id, username: user.email };
        const jwt = sign(claims, secret, { expiresIn: expiration });
        const config = cookieConfig;
        if (process.env.NODE_ENV === "development") {
          delete config.domain;
        }
        res.setHeader("Set-Cookie", cookie.serialize("auth", jwt, config));
        res.status(200).json(user);
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};
