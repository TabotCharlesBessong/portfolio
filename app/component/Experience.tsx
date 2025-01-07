// components/Experience.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./common/Modal";

interface Experience {
  _id?: string;
  companyName: string;
  startDate: string;
  endDate: string;
  totalTime: string;
  skills: string[];
  description: string;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    companyName: "",
    startDate: "",
    endDate: "",
    totalTime: "",
    skills: [],
    description: "",
  });

  const fetchExperiences = async () => {
    try {
      const response = await axios.get("/api/experience");
      setExperiences(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExperience = async () => {
    try {
      await axios.post("/api/experience", newExperience);
      fetchExperiences();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div className="h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      <ul className="space-y-4">
        {experiences.map((exp) => (
          <li key={exp._id} className="space-y-2">
            <h3 className="font-bold">{exp.companyName}</h3>
            <p className="text-sm">Duration: {exp.totalTime}</p>
            <p className="text-sm">Skills: {exp.skills.join(", ")}</p>
            <p className="text-sm">Description: {exp.description}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Experience
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Experience"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddExperience();
          }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Company Name"
              value={newExperience.companyName}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  companyName: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="date"
              placeholder="Start Date"
              value={newExperience.startDate}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  startDate: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) =>
                setNewExperience({ ...newExperience, endDate: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              value={newExperience.skills.join(", ")}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  skills: e.target.value.split(", "),
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
            Add Experience
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Experience;
