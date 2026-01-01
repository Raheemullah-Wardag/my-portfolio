"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, User, Book, Clipboard, Award, Mail } from "lucide-react";

export default function Sidebar({ setActiveSection, activeSection }) {
  const cardColor = "#31582C";
  const webBgColor = "#F7E6AF";

  const menuItems = [
    { id: "dashboard", icon: <Home size={50} color={webBgColor} /> },
    { id: "about", icon: <User size={40} color={webBgColor} /> },
    { id: "skills", icon: <Clipboard size={40} color={webBgColor} /> },
    { id: "projects", icon: <Book size={40} color={webBgColor} /> },
    { id: "qualification", icon: <Award size={40} color={webBgColor} /> },
    { id: "contact", icon: <Mail size={40} color={webBgColor} /> },
  ];

  const visibleItems = menuItems.filter((item) => item.id !== activeSection);

  return (
    <>
      {/* Desktop / Laptop */}
      <div className="hidden md:flex h-screen w-64 fixed left-0 top-0 p-6 flex-col gap-6 bg-[#F7E6AF]">
        <div
          className="absolute right-0 top-0 h-screen w-[6px]"
          style={{ backgroundColor: cardColor }}
        />
        {visibleItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            whileTap={{ scale: 0.96 }}
            className="w-full rounded-2xl shadow-lg flex flex-col justify-center items-center text-white font-semibold hover:opacity-85 transition px-4"
            style={{
              backgroundColor: cardColor,
              border: "2px solid #23401f",
              height: "160px",
            }}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      {/* Tablet (sm...md) - smaller vertical sidebar */}
      <div className="hidden sm:flex md:hidden h-screen w-44 fixed left-0 top-0 p-4 flex-col gap-4 bg-[#F7E6AF]">
        <div
          className="absolute right-0 top-0 h-screen w-[6px]"
          style={{ backgroundColor: cardColor }}
        />
        {visibleItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            whileTap={{ scale: 0.96 }}
            className="w-full rounded-2xl shadow-lg flex flex-col justify-center items-center text-white font-semibold transition px-2"
            style={{
              backgroundColor: cardColor,
              border: "2px solid #23401f",
              height: "100px",
            }}
          >
            {React.cloneElement(item.icon, { size: Math.floor(item.icon.props.size * 0.7) })}
          </motion.button>
        ))}
      </div>

      {/* Mobile - top navbar with small card-styled icons */}
      <div className="flex sm:hidden w-full p-2 justify-around fixed top-0 left-0 z-50 bg-[#F7E6AF] shadow-lg">
        {visibleItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col justify-center items-center w-16 h-16 rounded-2xl shadow-lg transition"
            style={{
              backgroundColor: "#31582C",
              border: "2px solid #23401f",
            }}
          >
            {React.cloneElement(item.icon, { size: Math.floor(item.icon.props.size * 0.5), color: "#F7E6B0" })}
          </motion.button>
        ))}
      </div>
    </>
  );
}
