import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import Experience from "../../models/Experience";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const experiences = await Experience.find({});
      return res.status(200).json({ success: true, data: experiences });
    }

    if (req.method === "POST") {
      const newExperience = await Experience.create(req.body);
      return res.status(201).json({ success: true, data: newExperience });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await Experience.findByIdAndDelete(id);
      return res
        .status(204)
        .json({ success: true, message: "Experience deleted successfully" });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as TypeError).message });
  }
}
