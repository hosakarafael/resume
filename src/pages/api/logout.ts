import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    "auth=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  res.status(200).json({});
};
