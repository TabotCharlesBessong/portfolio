import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import Project from "../../models/Project";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const projects = await Project.find({});
      return res.status(200).json({ success: true, data: projects });
    }

    if (req.method === "POST") {
      const newProject = await Project.create(req.body);
      return res.status(201).json({ success: true, data: newProject });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await Project.findByIdAndDelete(id);
      return res
        .status(204)
        .json({ success: true, message: "Project deleted successfully" });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as TypeError).message });
  }
}
