
"use client";
import { useEffect, useState } from "react";
import { client, urlFor } from "@/sanity/lib/client";
import TechStack from "../components/TechStack";
import { PortableText } from "@portabletext/react";

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Updated Query: We rely on 'profile' for the image now.
      const query = `{
        "profile": *[_type == "profile"][0]{ 
          fullName, 
          profileImage, 
          socialLinks 
        },
        "about": *[_type == "about"][0]{ 
          story, 
          experience, 
          education 
        }
      }`;
      const res = await client.fetch(query);
      setData(res);
      setTimeout(() => setShowCard(true), 100);
    };
    fetchData();
  }, []);

  if (!data) return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0808A1_0%,_#09056C_30%,_#0A0000_84%)]"></div>
  );

  const { profile, about } = data;

  return (
    <main className="min-h-screen  bg-[radial-gradient(ellipse_at_top,_#0808A1_0%,_#09056C_30%,_#0A0000_84%)] text-white flex items-center justify-center p-4 sm:p-8 overflow-hidden pt-24">
      
      <div
        className={`transition-all duration-[1500ms] mt-12 ease-out transform ${
          showCard ?  "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-[2rem] p-8 sm:p-12 shadow-2xl border border-white/10`}
      >
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-6 shadow-lg bg-black/20">
             {/* STRICTLY using Profile Image now */}
             {profile?.profileImage && (
               <img 
                 src={urlFor(profile.profileImage).width(300).url()} 
                 alt={profile.fullName} 
                 className="w-full h-full object-cover" 
               />
             )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">About Me</h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
        </div>

        {/* 1. THE STORY (Rich Text) */}
        <div className="text-lg sm:text-xl text-gray-200 leading-loose text-center sm:text-left max-w-3xl mx-auto mb-12 prose prose-invert">
          {about?.story ? (
            <PortableText value={about.story} />
          ) : (
            <p className="text-center opacity-50">Content coming soon...</p>
          )}
        </div>

        {/* 2. TECH STACK */}
        <div className="mt-8 max-w-3xl mx-auto border-t border-white/10 pt-8">
             <TechStack />
        </div>

        {/* 3. EXPERIENCE SECTION */}
        {about?.experience && (
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-blue-200">Experience</h3>
            <div className="space-y-6">
              {about.experience.map((job, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/5 hover:bg-white/10 transition duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h4 className="text-xl font-semibold">{job.role}</h4>
                    <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full mt-2 sm:mt-0">{job.duration}</span>
                  </div>
                  <p className="text-blue-300 mb-2 font-medium">{job.company}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. EDUCATION SECTION */}
        {about?.education && (
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-blue-200">Education</h3>
            <div className="space-y-4">
              {about.education.map((edu, i) => (
                <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 last:border-0">
                  <div>
                    <h4 className="text-lg font-semibold">{edu.degree}</h4>
                    <p className="text-gray-400">{edu.school}</p>
                  </div>
                  <span className="text-sm text-blue-300 mt-2 sm:mt-0 font-mono">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links Section */}
        <div className="mt-16 flex flex-col items-center border-t border-white/10 pt-10">
          <h3 className="text-xl font-semibold mb-6 text-gray-300">Connect with me</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {profile?.socialLinks?.map((link, index) => (
              <a 
                key={index} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition duration-300 backdrop-blur-md"
              >
                {link.includes('github') ? 'GitHub' : link.includes('linkedin') ? 'LinkedIn' : 'Social'}
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}