"use client"

// components/Projects.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../component/common/Modal";

interface Project {
  _id?: string;
  name: string;
  skills: string[];
  image: string;
  duration: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    name: "",
    skills: [],
    image: "",
    duration: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/projects");
      console.log(response)
      setProjects(response.data.projects);
      console.log(projects)
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProject = async () => {
    try {
      await axios.post("/api/projects", newProject);
      fetchProjects();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ul className="space-y-4">
        {projects?.map((project) => (
          <li key={project._id} className="flex items-center space-x-4">
            <img
              src={project.image}
              alt={project.name}
              className="w-20 h-20 object-cover"
            />
            <div>
              <p className="font-semibold">{project.name}</p>
              <p className="text-sm">Skills: {project.skills.join(", ")}</p>
              <p className="text-sm">Duration: {project.duration}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Project
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Project"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProject();
          }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProject.image}
              onChange={(e) =>
                setNewProject({ ...newProject, image: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              value={newProject.skills.join(", ")}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  skills: e.target.value.split(", "),
                })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., 3 months)"
              value={newProject.duration}
              onChange={(e) =>
                setNewProject({ ...newProject, duration: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Project
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;
