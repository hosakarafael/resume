import { NextApiRequest, NextApiResponse } from "next";
import { s3downloadFile } from "../../../../utils/s3";
import getAxios from "../../../../utils/getAxios";
import { User } from "@prisma/client";

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

  if (user?.fileName) {
    try {
      return res
        .status(200)
        .json(await s3downloadFile(`users/${id}`, user.fileName));
    } catch (error) {
      return res.status(200).json("/images/no-picture.jpeg");
    }
  }

  return res.status(200).json("/images/no-picture.jpeg");
};
