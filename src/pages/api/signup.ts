import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { UserPersonalDataService } from "../../service/userService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  let user = req.body;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  hash(user.password, 10, async function (err, hash) {
    if (!err && hash) {
      user.password = hash;
      const createdUser = await UserPersonalDataService.create(user);
      return res.status(201).json(createdUser);
    } else {
      return res.status(500).json({ message: err });
    }
  });
};
