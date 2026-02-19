
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { motion } from "framer-motion";

export default function Navbar() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [hidden, setHidden] = useState(true); // Default to HIDDEN (Taskbar style)
  const pathname = usePathname();

  // 1. Fetch Resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await client.fetch(`*[_type == "profile"][0]{"fileUrl": resume.asset->url}`);
        if (data?.fileUrl) {
          setResumeUrl(`${data.fileUrl}?dl=Raheem_Wardag_Resume.pdf`);
        }
      } catch (error) {
        console.error("Resume fetch failed", error);
      }
    };
    fetchResume();
  }, []);

  // 2. MOUSE POSITION LOGIC (Windows Taskbar Style)
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Thresholds:
      // < 10px: Mouse is at the very top edge -> SHOW
      // < 110px: Mouse is hovering inside the navbar area -> KEEP SHOWING
      // > 110px: Mouse moved away -> HIDE
      
      if (e.clientY < 110) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    };

    // Add event listener only for desktop
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Icons for Mobile
  const navLinks = [
    { 
      name: "Home", href: "/", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    },
    { 
      name: "About", href: "/about",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
    },
    { 
      name: "Projects", href: "/projects",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
    },
    { 
      name: "Certificates", href: "/certification",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
    },
  ];

  return (
    <>
      {/* ======================= */}
      {/* DESKTOP NAVBAR (AUTO-HIDE) */}
      {/* ======================= */}
      
      {/* Invisible Trigger Zone at the very top (so user can activate it) */}
      <div className="hidden md:block fixed top-0 left-0 w-full h-4 z-50 hover:bg-transparent" />

      <motion.nav 
        // Logic: Move UP (-150%) if hidden, Move to 0 if visible
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Smooth "Spring-like" ease
        className="hidden md:flex fixed top-0 left-0 right-0 z-40 px-8 py-4 justify-center"
      >
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
          
          <Link href="/" className="text-xl font-bold tracking-wider text-white">
            RW<span className="text-blue-400">.</span>
          </Link>

          <div className="flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className="relative px-4 py-2 text-sm font-medium">
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="desktop-glow"
                      className="absolute bottom-0 left-0 right-0 h-[2px] w-full bg-blue-400 shadow-[0_0_10px_#60A5FA]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="w-24 flex justify-end">
            {resumeUrl && (
              <a href={resumeUrl} className="bg-white/90 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition duration-300">
                Resume
              </a>
            )}
          </div>
        </div>
      </motion.nav>


      {/* ======================= */}
      {/* MOBILE NAVBAR (BOTTOM)  */}
      {/* ======================= */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        
        {/* Floating Resume Button */}
        {resumeUrl && (
          <a
            href={resumeUrl} 
            className="fixed top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-full text-white hover:bg-blue-600 transition shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </a>
        )}

        {/* The Dock */}
        <div className=" bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-2 py-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex justify-between items-center max-w-sm mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className="relative flex flex-col items-center justify-center w-full py-1">
                {isActive && (
                  <motion.div
                    layoutId="mobile-glow"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-blue-400" : "text-gray-400"}`}>
                  {link.icon}
                </span>
                {isActive && (
                   <motion.div 
                     layoutId="mobile-dot"
                     className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_5px_#60A5FA]"
                   />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}