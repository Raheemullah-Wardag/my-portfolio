
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/client";
import { motion } from "framer-motion";
// import TechStack from "@/components/TechStack"; // Import your new widget
import Skills from "./components/Skills";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // We ONLY fetch profile data here now. 
        // TechStack fetches its own data.
        const query = `*[_type == "profile"][0]{ fullName, headline, profileImage }`;
        const result = await client.fetch(query);
        setProfile(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const timer = setTimeout(() => setShowCard(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0808A1_0%,_#09056C_30%,_#0A0000_84%)] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/5 backdrop-blur-md rounded-3xl h-96 animate-pulse"></div>
      </main>
    );
  }

  // Animation Variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08, 
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0808A1_0%,_#09056C_30%,_#0A0000_84%)] text-white flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      <div
        className={`transition-all duration-[2000ms] ease-out transform ${
          showCard ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        } w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-3xl px-6 py-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-2xl border border-white/10`}
      >
        {/* Profile Image */}
        <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden flex items-center justify-center border-4 border-white/20 shadow-lg shrink-0 bg-black/20">
          {profile?.profileImage && (
             <img
               src={urlFor(profile.profileImage).width(400).url()}
               alt={profile.fullName}
               className="w-full h-full object-cover"
             />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center sm:text-left flex flex-col h-full justify-between">
          <div>
            {/* TYPEWRITER ANIMATION FOR NAME */}
            <h1 className="text-[5vw] sm:text-5xl font-bold mb-4 flex flex-wrap justify-center sm:justify-start gap-x-2">
              <span>Hi, I'm</span>
              <motion.span
                className="text-blue-200 inline-block"
                variants={sentence}
                initial="hidden"
                animate="visible"
              >
                {profile?.fullName?.split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }} 
              className="text-base sm:text-xl text-gray-200 leading-relaxed mb-6"
            >
              {profile?.headline}
            </motion.p>
          </div>

          {/* PLUG AND PLAY COMPONENT */}
          <Skills/>
          
          <div className="flex justify-center sm:justify-start">
            <Link
              href="/projects"
              className="bg-black/80 hover:bg-black text-white rounded-full w-40 h-12 flex items-center justify-center hover:scale-105 transition duration-300 border border-white/10 shadow-lg font-semibold"
            >
              View My Work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}