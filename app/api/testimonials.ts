import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import Testimonial from "../../models/Testimonial";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await connectToDatabase();

  try {
    if (req.method === "GET") {
      const testimonials = await Testimonial.find({});
      return res.status(200).json({ success: true, data: testimonials });
    }

    if (req.method === "POST") {
      const newTestimonial = await Testimonial.create(req.body);
      return res.status(201).json({ success: true, data: newTestimonial });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await Testimonial.findByIdAndDelete(id);
      return res
        .status(204)
        .json({ success: true, message: "Testimonial deleted successfully" });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as TypeError).message });
  }
}
