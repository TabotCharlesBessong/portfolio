import mongoose, { Schema, model, models } from "mongoose";

interface ITestimonial {
  name: string;
  email: string;
  description: string;
  dateCreated: Date;
  rating: number;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

export default models.Testimonial ||
  model<ITestimonial>("Testimonial", TestimonialSchema);
