"use client"
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function ContactBox() {
  // Replace these with your actual profiles
  const email = "ejazmuqudus.@gmail.com";
  const phone = "+923170444090";
  const instagram = "https://www.instagram.com/raheemullah_02/";
  const whatsapp = "https://wa.me/923170444090";

  return (
    <div
      className="
        bg-[#31572C] text-[#FAF4D3] rounded-3xl p-6 
        w-[470px] h-[260px] 
        box-pop delay-2 cursor-pointer
        transition-all duration-300
        flex flex-col justify-center text-center

        /* Tablet proportional scaling */
        md:w-[370px] md:h-[260px]

        /* Mobile adjustments */
        max-sm:w-full max-sm:h-auto max-sm:p-4
      "
    >
      <h2 className="text-3xl font-bold mb-6">Contact</h2>

      {/* Social Icons */}
      <div className="flex justify-center gap-8 text-4xl mb-6">
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
          <MdEmail className="hover:text-[#F7E6AF] transition-colors" />
        </a>
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-[#F7E6AF] transition-colors" />
        </a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="hover:text-[#F7E6AF] transition-colors" />
        </a>
      </div>

      {/* Contact Info Placeholders */}
      <div className="text-left space-y-2 text-sm sm:text-base">
        <p>
          Email:{" "}
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FAF4D3] font-medium hover:underline"
          >
            {email}
          </a>
        </p>
        <p>
          Phone:{" "}
          <a
            href={`tel:${phone}`}
            className="text-[#FAF4D3] font-medium hover:underline"
          >
            {phone}
          </a>
        </p>
      </div>
    </div>
  );
}
