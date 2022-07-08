import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { UserPersonalDataService } from "../../../../service/userService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const id: string = req.query.id as string;

  switch (method) {
    case "GET":
      try {
        const user = await UserPersonalDataService.findById(id);

        if (!user) {
          return res.status(400).json({ message: `User with ${id} not found` });
        }

        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    case "PUT":
      try {
        const user = await UserPersonalDataService.update(id, req.body);

        if (!user) {
          return res.status(400).json({ message: `User with ${id} not found` });
        }

        res.status(200).json(user);
      } catch (error) {
        res.status(400);
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await UserPersonalDataService.delete(id);

        if (!deletedUser) {
          return res.status(400).json({ message: `User with ${id} not found` });
        }

        return res.status(200).json({});
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    default:
      return res.status(500).json({ message: "Method not allowed" });
  }
};
