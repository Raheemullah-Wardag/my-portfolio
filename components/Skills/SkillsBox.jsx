"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsBox() {
  const [showFullCard, setShowFullCard] = useState(false);

  // Dynamic certifications data
  const certifications = [
    {
      title: "Microsoft Office Specialist",
      image: "/images/MOS Word.png", // replace with your image path
    },
    {
      title: "Web Designer and Developer",
      image: "/images/Raheem Cerificate of Web Developer.jpg", // replace with your image path
    },
    // Add more objects here for future certificates
  ];

  return (
    <>
      <AnimatePresence>
        <motion.div
          layout
          onClick={() => setShowFullCard(!showFullCard)}
          className={`
            bg-[#31572C] text-[#FAF4D3] rounded-3xl p-6
            cursor-pointer box-pop delay-3 transition-all duration-300
            mx-auto flex flex-col gap-4

            /* default small card aligned with AboutBox on desktop/laptop */
            ${!showFullCard ? "w-[340px] h-[360px] max-sm:w-full max-sm:h-auto max-sm:p-4" : ""}

            /* when expanded: mobile = in-flow, md+ = overlay scaled */
            ${showFullCard ? `
              max-sm:relative max-sm:w-full max-sm:h-auto max-sm:flex-col max-sm:items-center
              md:fixed md:inset-10 md:z-50 md:overflow-auto
              md:w-auto md:max-w-[95vw] md:max-h-[95vh]
            ` : ""}
          `}
        >
          {/* Title */}
          <h2 className={`${showFullCard ? "text-3xl text-center" : "text-2xl"} font-bold mb-3`}>
            Certifications
          </h2>

          {/* Certificates grid */}
          <div className={`
            grid gap-4
            ${showFullCard ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}
          `}>
            {certifications.map((cert, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className={`
                    object-contain rounded-lg
                    ${showFullCard ? "w-[200px] h-auto md:w-[300px]" : "w-[100px] h-[100px]"}
                    transition-all duration-300
                  `}
                />
                <p className="text-center text-sm sm:text-base">{cert.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
