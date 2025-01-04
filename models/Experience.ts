import mongoose, { Schema, model, models } from "mongoose";

interface IExperience {
  company: string;
  startDate: Date;
  endDate: Date;
  skills: string[];
  description: string;
}

const ExperienceSchema = new Schema<IExperience>({
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  skills: { type: [String], required: true },
  description: { type: String, required: true },
});

export default models.Experience ||
  model<IExperience>("Experience", ExperienceSchema);
