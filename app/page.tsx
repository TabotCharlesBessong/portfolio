
"use client"

import React from "react";
import Skills from "./component/Skills";
import Projects from "./component/Projects";
import Experience from "./component/Experience";
import Testimonials from "./component/Testimonials";
import ContactUs from "./component/ContactUs";

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold">Portfolio</h1>
          <div className="space-x-4">
            <a href="#about" className="hover:text-blue-500">
              About
            </a>
            <a href="#skills" className="hover:text-blue-500">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-500">
              Projects
            </a>
            <a href="#experience" className="hover:text-blue-500">
              Experience
            </a>
            <a href="#testimonials" className="hover:text-blue-500">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <main className="pt-16">
        <section
          id="about"
          className="min-h-screen bg-gray-100 flex items-center"
        >
          {/* <About /> */}
        </section>

        <section
          id="skills"
          className="min-h-screen bg-white flex items-center"
        >
          <Skills />
        </section>

        <section
          id="projects"
          className="min-h-screen bg-gray-100 flex items-center"
        >
          <Projects />
        </section>

        <section
          id="experience"
          className="min-h-screen bg-white flex items-center"
        >
          <Experience />
        </section>

        <section
          id="testimonials"
          className="min-h-screen bg-gray-100 flex items-center"
        >
          <Testimonials />
        </section>

        <section
          id="contact"
          className="min-h-screen bg-white flex items-center"
        >
          <ContactUs />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
