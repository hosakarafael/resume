import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { s3downloadFile } from "../../../utils/s3";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    return s3downloadFile(
      "users/62607e0dd1ab6021638bd224",
      "RAFAEL_FOTO.JPG-8071f835-2ad8-4ef4-9e6a-c6d2a48f19ae"
    ).pipe(res);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
