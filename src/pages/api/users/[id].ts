import dbConnect from "../../../utils/dbConnect";
import UserRepository from "../../../schema/UserRepository";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await UserRepository.findById(id);

        if (!user) {
          return res.status(400);
        }

        res.status(200).json({ user });
      } catch (error) {
        res.status(400);
      }
      break;
    case "PUT":
      try {
        const user = await UserRepository.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidator: true,
        });

        if (!user) {
          return res.status(400);
        }

        res.status(200).json({ user });
      } catch (error) {
        res.status(400);
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await UserRepository.deleteOne({ _id: id });

        if (!deletedUser) {
          return res.status(400);
        }

        return res.status(200).json({});
      } catch (error) {
        return res.status(400);
      }
      break;
    default:
      return res.status(400);
      break;
  }
  return res.status(400);
};
