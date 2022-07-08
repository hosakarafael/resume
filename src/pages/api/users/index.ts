import { NextApiRequest, NextApiResponse } from "next";
import { UserPersonalDataService } from "../../../service/userService";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await UserPersonalDataService.findAll();

        return res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        if (req.body) {
          const user = await UserPersonalDataService.create(req.body);
          return res.status(201).json({ user });
        } else {
          return res.status(400).json({ message: "body empty" });
        }
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
