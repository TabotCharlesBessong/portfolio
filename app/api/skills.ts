import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import Skill from "../../models/Skill";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const skills = await Skill.find({});
      return res.status(200).json({ success: true, data: skills });
    }

    if (req.method === "POST") {
      const newSkill = await Skill.create(req.body);
      return res.status(201).json({ success: true, data: newSkill });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await Skill.findByIdAndDelete(id);
      return res
        .status(204)
        .json({ success: true, message: "Skill deleted successfully" });
    }

    // Method not allowed
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as TypeError).message });
  }
}
