// components/Skills.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./common/Modal";

interface Skill {
  _id?: string;
  name: string;
  icon: string;
  experience: string;
  proficiency: number;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    icon: "",
    experience: "",
    proficiency: 1,
  });

  const fetchSkills = async () => {
    try {
      const response = await axios.get("/api/skills");
      setSkills(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSkill = async () => {
    try {
      await axios.post("/api/skills", newSkill);
      fetchSkills();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <ul className="space-y-4">
        {skills.map((skill) => (
          <li key={skill._id} className="flex items-center space-x-4">
            <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
            <div>
              <p className="font-semibold">{skill.name}</p>
              <p className="text-sm">Experience: {skill.experience}</p>
              <p className="text-sm">Proficiency: {skill.proficiency} / 5</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Skill
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Skill"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddSkill();
          }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Icon URL"
              value={newSkill.icon}
              onChange={(e) =>
                setNewSkill({ ...newSkill, icon: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Experience (e.g., 2 years)"
              value={newSkill.experience}
              onChange={(e) =>
                setNewSkill({ ...newSkill, experience: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Proficiency (1-5)"
              min="1"
              max="5"
              value={newSkill.proficiency}
              onChange={(e) =>
                setNewSkill({
                  ...newSkill,
                  proficiency: Number(e.target.value),
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Skill
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Skills;
