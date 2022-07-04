import dbConnect from "../../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { s3uploadFile } from "../../../../utils/s3";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    s3uploadFile();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
