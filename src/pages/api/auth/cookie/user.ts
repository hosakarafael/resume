import { verify } from "jsonwebtoken";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { secret } from "../../../../utils/jwtConfig";
import { UserPersonalDataService } from "../../../../service/userService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.cookies.auth) {
    return res.status(200).json(null);
  }
  const jwt = req.cookies.auth;
  const decodedJwt = verify(jwt, secret);

  const id = decodedJwt.sub as string;

  if (!id) {
    return res.status(200).json(null);
  }

  const user = await UserPersonalDataService.findById(id);

  if (!user) {
    return res.status(200).json(null);
  }

  return res.status(200).json(user);
};
