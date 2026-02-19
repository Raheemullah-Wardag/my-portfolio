"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Fetch only skills (Title only, sorted alphabetically)
        const query = `*[_type == "skill"] | order(title asc) { _id, title }`;
        const data = await client.fetch(query);
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  // Don't render anything if no skills found
  if (skills.length === 0) return null;

  return (
    <div className="mb-8 w-full">
      <p className="text-xs uppercase tracking-widest text-blue-300 mb-3 opacity-80 text-center sm:text-left">
        Tech Stack
      </p>
      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
        {skills.map((skill) => (
          <span
            key={skill._id}
            className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs sm:text-sm text-gray-200 font-medium hover:bg-white/20 transition-all duration-300 cursor-default shadow-sm backdrop-blur-sm"
          >
            {skill.title}
          </span>
        ))}
      </div>
    </div>
  );
}