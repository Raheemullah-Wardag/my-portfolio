
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/client";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetching tags as 'tech' to match your design structure
        const query = `*[_type == "project"]{
          _id,
          title,
          description,
          screenshot,
          tags, 
          githubLink,
          liveLink
        }`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // -------------------------------------------
  // SKELETON LOADING STATE (Visual Optimization)
  // -------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0808A1] via-[#09056C] to-[#0A0000] text-white py-24 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg animate-pulse"
            >
              <div className="w-full h-48 bg-slate-600/50"></div>
              <div className="p-6 flex flex-col gap-3">
                <div className="h-8 w-3/4 bg-slate-600/50 rounded"></div>
                <div className="h-4 w-full bg-slate-600/50 rounded"></div>
                <div className="h-4 w-2/3 bg-slate-600/50 rounded"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-6 w-16 bg-slate-600/50 rounded-full"></div>
                  <div className="h-6 w-16 bg-slate-600/50 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -------------------------------------------
  // REAL DATA RENDER
  // -------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0808A1] via-[#09056C] to-[#0A0000] text-white py-24 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg transition transform hover:-translate-y-2 flex flex-col"
          >
            {/* Project Image */}
            <div className="w-full h-48 bg-black/20">
              {project.screenshot ? (
                <img
                  src={urlFor(project.screenshot).width(800).url()}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3 flex-grow">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="text-sm text-white/80 line-clamp-3">{project.description}</p>
              
              {/* Tech Stack Tags */}
              {project.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/20 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Links - Only show if they exist in Sanity */}
              <div className="flex gap-4 mt-auto pt-4">
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    className="text-sm text-blue-300 hover:underline"
                  >
                    GitHub
                  </Link>
                )}
                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    className="text-sm text-blue-300 hover:underline"
                  >
                    Live Demo
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}