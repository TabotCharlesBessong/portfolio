import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import Contact from "../../models/Contact";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await connectToDatabase();

  try {
    if (req.method === "POST") {
      const newMessage = await Contact.create(req.body);
      return res.status(201).json({ success: true, data: newMessage });
    }

    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as TypeError).message });
  }
}
