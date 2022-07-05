import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();

        res.status(200).json(users);
      } catch (error) {
        res.status(400);
      }
      break;
    case "POST":
      try {
        const user = await prisma.user.create({ data: req.body });

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
