"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AboutBox from "@/components/About/AboutBox";
import ContactBox from "@/components/Contact/ContactBox";
import ProjectsBox from "@/components/Projects/ProjectsBox";
import SkillsBox from "@/components/Skills/SkillsBox";
import QualificationBox from "@/components/Qualification/QualificationBox";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Tablet range: scale proportionally so the whole dashboard looks like a smaller desktop
      if (width >= 768 && width < 1024) {
        setScale(0.78); // tweak this number if you want slightly larger/smaller
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DashboardLayout = () => (
    <div
      className="
        grid grid-cols-1 gap-4 pt-8
        md:grid-cols-3 md:gap-6
        max-sm:px-3
      "
    >
      <div className="col-span-1">
        <AboutBox />
      </div>

      <div className="col-span-1 md:row-span-2">
        <ProjectsBox />
      </div>

      <div className="col-span-1">
        <ContactBox />
      </div>

      <div className="col-span-1">
        <SkillsBox />
      </div>

      <div className="col-span-1">
        <QualificationBox />
      </div>
    </div>
  );

  const sectionComponents = {
    dashboard: <DashboardLayout />,
    about: <AboutBox />,
    projects: <ProjectsBox />,
    skills: <SkillsBox />,
    qualification: <QualificationBox />,
    contact: <ContactBox />,
  };

  return (
    <main className="flex bg-black min-h-screen w-full overflow-x-hidden">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* scaling wrapper: scales whole dashboard on tablet range */}
      <div className="bg-[#F7E6AF] w-full ml-0 md:ml-48 lg:ml-64 mt-16 md:mt-0 overflow-x-hidden flex justify-center">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            transition: "transform 0.25s ease",
            width: "100%",
            maxWidth: "1440px",
          }}
          className="max-sm:scale-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              {sectionComponents[activeSection]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
