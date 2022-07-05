import { NextApiRequest, NextApiResponse } from "next";
import { s3uploadFile } from "../../../../utils/s3";
import getAxios from "../../../../utils/getAxios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  const { name, type } = req.body;

  try {
    const url = await s3uploadFile(`users/${id}`, name, type);
    await getAxios().put(`/users/${id}`, {
      fileName: name,
    });
    return res.status(200).json(url);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
