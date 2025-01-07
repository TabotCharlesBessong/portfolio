// components/Testimonials.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./common/Modal";

interface Testimonial {
  _id?: string;
  name: string;
  email: string;
  description: string;
  dateCreated: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    name: "",
    email: "",
    description: "",
    dateCreated: "",
    rating: 0,
  });

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonials");
      setTestimonials(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTestimonial = async () => {
    try {
      await axios.post("/api/testimonials", newTestimonial);
      fetchTestimonials();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <ul className="space-y-4">
        {testimonials.map((testimonial) => (
          <li key={testimonial._id} className="border p-4 rounded shadow">
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm">{testimonial.email}</p>
            <p className="mt-2">{testimonial.description}</p>
            <p className="text-sm mt-1">Rating: {testimonial.rating} / 5</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Testimonial
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Testimonial"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTestimonial();
          }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newTestimonial.name}
              onChange={(e) =>
                setNewTestimonial({ ...newTestimonial, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newTestimonial.email}
              onChange={(e) =>
                setNewTestimonial({ ...newTestimonial, email: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newTestimonial.description}
              onChange={(e) =>
                setNewTestimonial({
                  ...newTestimonial,
                  description: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={newTestimonial.rating}
              onChange={(e) =>
                setNewTestimonial({
                  ...newTestimonial,
                  rating: parseInt(e.target.value, 10),
                })
              }
              className="w-full border p-2 rounded"
              min={1}
              max={5}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Testimonial
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Testimonials;
