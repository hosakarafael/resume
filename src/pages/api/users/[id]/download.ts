import { NextApiRequest, NextApiResponse } from "next";
import getAxios from "../../../../utils/getAxios";
import { User } from "@prisma/client";
import { getUserImage } from "../../../../models/UserEntity";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const response = await getAxios().get(`/users/${id}`);
  const user: User = response.data;

  return res.status(200).json(await getUserImage(user));
};
