// components/ContactUs.tsx
import React, { useState } from "react";
import axios from "axios";

interface Contact {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", contact);
      setIsSubmitted(true);
      setContact({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting the contact form", error);
    }
  };

  return (
    <div className="h-screen p-6 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        {isSubmitted ? (
          <p className="text-green-500 text-center">
            Thank you for your message! We'll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              placeholder="Your Message"
              value={contact.message}
              onChange={(e) =>
                setContact({ ...contact, message: e.target.value })
              }
              className="w-full border p-2 rounded"
              rows={5}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
