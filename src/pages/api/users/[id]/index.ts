import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  if (typeof id !== "string") {
    return;
  }

  switch (method) {
    case "GET":
      try {
        const user = await prisma.user.findUnique({ where: { id: id } });

        if (!user) {
          return res.status(400);
        }

        res.status(200).json(user);
      } catch (error) {
        res.status(400);
      }
      break;
    case "PUT":
      try {
        const user = await prisma.user.update({
          where: { id: id },
          data: req.body,
        });

        if (!user) {
          return res.status(400);
        }

        res.status(200).json(user);
      } catch (error) {
        res.status(400);
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await prisma.user.delete({ where: { id: id } });

        if (!deletedUser) {
          return res.status(400);
        }

        return res.status(200).json({});
      } catch (error) {
        return res.status(400);
      }
    default:
      return res.status(400);
  }
  return res.status(400);
};
