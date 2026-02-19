
"use client";
import { useEffect, useState } from "react";
import { client, urlFor } from "@/sanity/lib/client";
import Skills from "../components/Skills";


export default function AboutPage() {
  const [data, setData] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    // Fetch Profile Bio & Socials
    client.fetch(`*[_type == "profile"][0]{
      fullName,
      bio, 
      profileImage,
      socialLinks
    }`).then((res) => {
      setData(res);
      // Trigger animation after data load
      setTimeout(() => setShowCard(true), 100);
    });
  }, []);

  if (!data) return (
    // Simple Loader matching background
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0808A1_0%,_#09056C_30%,_#0A0000_84%)]"></div>
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0808A1_0%,_#09056C_30%,_#0A0000_84%)] text-white flex items-center justify-center p-4 sm:p-8 overflow-hidden pt-24">
      
      <div
        className={`transition-all duration-[1500ms] ease-out transform ${
          showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-[2rem] p-8 sm:p-12 shadow-2xl border border-white/10`}
      >
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-6 shadow-lg">
             {data.profileImage && (
               <img src={urlFor(data.profileImage).width(300).url()} alt="Me" className="w-full h-full object-cover" />
             )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">About Me</h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
        </div>

        {/* Dynamic Bio Text */}
        <div className="text-lg sm:text-xl text-gray-200 leading-loose text-center sm:text-left max-w-3xl mx-auto whitespace-pre-line">
          {data.bio || "Welcome to my portfolio! I haven't written my bio in the CMS yet."}
        </div>

        {/* Tech Stack Section (Centered to match bio width) */}
        <div className="mt-12 max-w-3xl mx-auto border-t border-white/10 pt-8">
             <Skills />
        </div>

        {/* Social Links Section */}
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-6 text-blue-200">Connect with me</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.socialLinks?.map((link, index) => (
              <a 
                key={index} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition duration-300 backdrop-blur-md"
              >
                {/* Simple logic to name the buttons based on URL */}
                {link.includes('github') ? 'GitHub' : 
                 link.includes('linkedin') ? 'LinkedIn' : 
                 link.includes('instagram') ? 'Instagram' : 'Social Link'}
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}