"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutBox() {
  const [showFullCard, setShowFullCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(""); // 'client' or 'recruiter'
  const [formData, setFormData] = useState({});

  const bioData = {
    name: "Raheem Ejaz",
    profession: "Software Engineer & Web Developer",
    location: "Karachi, Pakistan",
    email: "ejazmuqudus.@gmail.com",
    phone: "+92 123 456 7890",
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Node.js"],
    experience: [
      "2 years experience in web development",
      "Worked on multiple freelance and client projects",
    ],
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit:", { userType, formData });
    alert("Your info has been submitted. Resume download will start.");
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "/images/Raheem  Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowModal(false);
    setFormData({});
    setUserType("");
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          layout
          onClick={() => setShowFullCard(!showFullCard)}
          className={`
            bg-[#31572C] text-[#FAF4D3] rounded-3xl p-6
            cursor-pointer box-pop transition-all duration-300
            flex flex-col gap-4 mx-auto

            /* default small card aligned with SkillsBox on desktop/laptop */
            ${!showFullCard ? "w-[440px] h-[360px] md:w-[340px] md:h-[360px] max-sm:w-full max-sm:h-auto max-sm:p-4" : ""}

            /* when expanded: mobile = in-flow, md+ = overlay scaled */
            ${showFullCard ? `
              max-sm:relative max-sm:w-full max-sm:h-auto max-sm:flex-col max-sm:items-center
              md:fixed md:inset-10 md:z-50 md:overflow-auto
              md:w-auto md:max-w-[95vw] md:max-h-[95vh]
            ` : ""}
          `}
        >
          {/* Top section */}
          <div className={`flex ${showFullCard ? "flex-col items-center text-center" : "flex-row items-center gap-6"}`}>
            {/* Profile circle */}
            <div
              className={`
                rounded-full border-8 border-[#FAF4D3] bg-[#23401f] aspect-square
                ${showFullCard ? "md:w-48 md:h-48 w-48 h-48" : "w-32 h-32"}
                max-sm:w-24 max-sm:h-24
              `}
            />

            <div className={`${showFullCard ? "text-center" : ""}`}>
              <h2 className={`${showFullCard ? "text-4xl" : "text-3xl"} font-bold`}>
                Hey There, <br /> Raheem Here!
              </h2>

              {!showFullCard && (
                <button
                  onClick={handleDownloadClick}
                  className="mt-4 px-4 py-2 bg-[#F7E6AF] text-[#31572C] rounded-lg font-semibold hover:scale-105 transition"
                >
                  Resume
                </button>
              )}
            </div>
          </div>

          {/* Full bio content */}
          {showFullCard && (
            <div className="mt-6 space-y-3 text-left max-w-4xl mx-auto">
              <p><span className="font-semibold">Name:</span> {bioData.name}</p>
              <p><span className="font-semibold">Profession:</span> {bioData.profession}</p>
              <p><span className="font-semibold">Location:</span> {bioData.location}</p>
              <p><span className="font-semibold">Email:</span> {bioData.email}</p>
              <p><span className="font-semibold">Phone:</span> {bioData.phone}</p>

              <div>
                <p className="font-semibold">Skills:</p>
                <ul className="list-disc ml-5">
                  {bioData.skills.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>

              <div>
                <p className="font-semibold">Experience:</p>
                <ul className="list-disc ml-5">
                  {bioData.experience.map((exp, i) => <li key={i}>{exp}</li>)}
                </ul>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleDownloadClick}
                  className="px-6 py-3 bg-[#F7E6AF] text-[#31572C] rounded-lg font-semibold hover:scale-105 transition"
                >
                  Download Resume
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal / form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-[#31572C] text-[#FAF4D3] rounded-2xl p-6 max-w-md w-full">
            {!userType ? (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-center">I am a:</h2>
                <div className="flex gap-4 justify-center mt-2">
                  <button
                    onClick={() => setUserType("client")}
                    className="px-4 py-2 bg-[#F7E6AF] text-[#31582C] rounded-lg font-semibold"
                  >
                    Client
                  </button>
                  <button
                    onClick={() => setUserType("recruiter")}
                    className="px-4 py-2 bg-[#F7E6AF] text-[#31582C] rounded-lg font-semibold"
                  >
                    Recruiter
                  </button>
                </div>
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-center mb-2">Enter your details</h2>

                <input type="text" name="name" placeholder="Your Name" required onChange={handleInputChange} className="p-2 rounded-md text-black w-full"/>

                {userType === "client" ? (
                  <input type="email" name="email" placeholder="Your Email" required onChange={handleInputChange} className="p-2 rounded-md text-black w-full"/>
                ) : (
                  <>
                    <input type="text" name="company" placeholder="Company Name" required onChange={handleInputChange} className="p-2 rounded-md text-black w-full"/>
                    <input type="email" name="hrEmail" placeholder="HR Email" required onChange={handleInputChange} className="p-2 rounded-md text-black w-full"/>
                    <input type="text" name="city" placeholder="Company City" required onChange={handleInputChange} className="p-2 rounded-md text-black w-full"/>
                    <input type="text" name="country" placeholder="Company Country" required onChange={handleInputChange} className="p-2 rounded-md text-black w-full"/>
                  </>
                )}

                <div className="flex justify-between mt-4">
                  <button type="button" onClick={() => { setShowModal(false); setUserType(""); }} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-[#F7E6AF] text-[#31582C] rounded-lg font-semibold">Submit</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
