"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsBox() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Dynamic projects array
  const projects = [
    {
      name: "Marvel Play",
      image: "/images/Marvel Play.png",
      link: "https://marvel-play.com",
    },
    {
      name: "ASCII Code Converter",
      image: "/images/Ascicode.png",
      link: "https://ascii-converter.com",
    },
     {
      name: "Vogue Dental and Aesthatics",
      image: "/images/Vogue.png",
      link: "https://marvel-play.com",
    }
    // Add more projects here
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          layout
          className={`
            bg-[#31572C] text-[#FAF4D3] rounded-3xl p-6
            cursor-pointer box-pop transition-all duration-300
            flex flex-col gap-4 mx-auto

            /* Default card size aligned with AboutBox/SkillsBox */
            w-[440px] h-[660px] md:w-[340px] md:h-[660px] max-sm:w-full max-sm:h-auto max-sm:p-4
          `}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Projects</h2>

          {/* Projects Grid */}
          <div
            className={`
              grid gap-4
              grid-cols-1 sm:grid-cols-2
            `}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                layout
                onClick={() => handleToggle(index)}
                className={`
                  bg-[#23401f] rounded-2xl p-4 cursor-pointer transition-all duration-300
                  flex flex-col items-center gap-2
                  ${expandedIndex === index ? "col-span-full" : ""}
                `}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className={`
                    object-contain rounded-lg
                    ${expandedIndex === index ? "w-[300px] md:w-[400px]" : "w-[150px] md:w-[180px]"}
                    transition-all duration-300
                  `}
                />
                <p className="text-center font-semibold">{project.name}</p>

                {/* Expanded view */}
                {expandedIndex === index && (
                  <div className="mt-3 text-center space-y-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#F7E6AF] text-[#31572C] rounded-lg font-semibold inline-block hover:scale-105 transition"
                    >
                      Visit Project
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
