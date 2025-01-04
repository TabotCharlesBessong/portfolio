import mongoose, { Schema, model, models } from "mongoose";
import { ISkill } from "./Skill";

interface IProject {
  name: string;
  skills: ISkill[]; // || String[];
  image: string;
  duration: string;
  link?: string;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true,min:3 },
  skills: { type: [String], required: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  link: {type: String}
});

export default models.Project || model<IProject>("Project", ProjectSchema);
