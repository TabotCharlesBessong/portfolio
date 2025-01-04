import mongoose, { Schema, model, models } from "mongoose";

export interface ISkill {
  name: string;
  icon: string;
  duration: string;
  rating: number;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  duration: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

export default models.Skill || model<ISkill>("Skill", SkillSchema);
