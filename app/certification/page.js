
"use client";
import { useState, useEffect } from "react";
import { client, urlFor } from "@/sanity/lib/client";

export default function CertificationPage() {
  const [certifications, setCertifications] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Touch state for swipe detection
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 1. Fetch Data from Sanity
  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const query = `*[_type == "certification"]{
          _id,
          title,
          certificateImage,
          issuer
        }`;
        const data = await client.fetch(query);
        setCertifications(data);
      } catch (error) {
        console.error("Failed to fetch certs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCerts();
  }, []);

  // 2. Navigation Logic
  const handleNav = (index) => {
    if (index < 0 || index >= certifications.length) return;
    setActiveIndex(index);
  };

  const nextSlide = () => {
    if (activeIndex < certifications.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // Loop back to start
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(certifications.length - 1); // Loop to end
    }
  };

  // 3. Swipe Handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // ------------------------------------------
  // SKELETON LOADING STATE
  // ------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0808A1] via-[#09056C] to-[#0A0000] text-white flex flex-col items-center justify-start p-4 pt-24 sm:pt-32">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
          Certifications
        </h1>
        <div className="relative w-full max-w-6xl h-[400px] flex items-center justify-center">
          {/* Skeleton Card */}
          <div className="absolute z-30 w-full sm:w-[420px] h-[350px] bg-white/10 backdrop-blur-md rounded-3xl p-4 animate-pulse flex flex-col gap-4">
            <div className="w-full h-48 bg-slate-600/50 rounded-2xl"></div>
            <div className="h-6 w-3/4 bg-slate-600/50 rounded mx-auto"></div>
            <div className="h-10 w-32 bg-slate-600/50 rounded-full mx-auto mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // EMPTY STATE (If no certs in Sanity)
  // ------------------------------------------
  if (!isLoading && certifications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0808A1] via-[#09056C] to-[#0A0000] text-white flex flex-col items-center justify-center">
        <p className="text-xl">No certifications found.</p>
      </div>
    );
  }

  // ------------------------------------------
  // REAL CONTENT RENDER
  // ------------------------------------------
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#0808A1] via-[#09056C] to-[#0A0000] text-white flex flex-col items-center justify-start p-4 pt-24 sm:pt-32"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
        Certifications
      </h1>

      <div className="relative w-full max-w-6xl h-[400px] sm:h-[420px] flex items-center justify-center">
        
        {/* LEFT ARROW (Desktop) */}
        <button 
          onClick={prevSlide}
          className="hidden sm:block absolute left-4 z-40 p-3 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {certifications.map((cert, index) => {
          const isActive = index === activeIndex;
          const offset = index - activeIndex;

          // Logic to hide cards far away
          let visualState = "z-10 scale-75 translate-y-8 opacity-0 pointer-events-none"; // hidden by default

          if (isActive) {
            visualState = "z-30 scale-100 translate-x-0 opacity-100";
          } else if (offset === 1 || (activeIndex === certifications.length - 1 && index === 0)) {
            // Right neighbor (or wrap around)
            visualState = "z-20 scale-90 translate-x-0 sm:translate-x-60 opacity-100";
          } else if (offset === -1 || (activeIndex === 0 && index === certifications.length - 1)) {
            // Left neighbor (or wrap around)
            visualState = "z-20 scale-90 translate-x-0 sm:-translate-x-60 opacity-100";
          }

          return (
            <div
              key={cert._id}
              className={`absolute transition-all duration-700 ease-in-out rounded-3xl backdrop-blur-md bg-white/10 p-3 m-2 sm:m-4 flex flex-col items-center justify-end w-full sm:w-[420px] transform ${visualState}`}
              style={{
                top: isActive ? "0px" : "40px",
              }}
            >
              <div className="w-full aspect-[3/2] overflow-hidden rounded-2xl shadow-lg relative">
                {cert.certificateImage && (
                  <img
                    src={urlFor(cert.certificateImage).width(600).url()}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center text-sm sm:text-base p-2">
                  {cert.title}
                  {/* Optional: Show issuer if available */}
                  {cert.issuer && <span className="block text-xs text-gray-300">{cert.issuer}</span>}
                </div>
              </div>
              
              {/* Download Button (Forces download via Sanity URL param) */}
              <a
                href={`${urlFor(cert.certificateImage).url()}?dl=`} 
                className="mt-4 bg-white text-black px-4 py-2 text-sm sm:text-base rounded-full hover:bg-blue-400 hover:text-white transition cursor-pointer"
              >
                Download
              </a>
            </div>
          );
        })}

        {/* RIGHT ARROW (Desktop) */}
        <button 
          onClick={nextSlide}
          className="hidden sm:block absolute right-4 z-40 p-3 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>

      {/* Navigation Dots */}
      <div className="mt-8 flex space-x-3">
        {certifications.map((_, i) => (
          <button
            key={i}
            onClick={() => handleNav(i)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition ${
              i === activeIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}