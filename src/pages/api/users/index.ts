import dbConnect from "../../../utils/dbConnect";
import UserRepository from "../../../schema/UserRepository";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await UserRepository.find({});

        res.status(200).json(users);
      } catch (error) {
        res.status(400);
      }
      break;
    case "POST":
      try {
        const user = await UserRepository.create(req.body);

        res.status(201).json({ user });
      } catch (error) {
        res.status(400);
      }
      break;
    default:
      res.status(400);
      break;
  }
};
