"use client"

export default function QualificationBox() {
  return (
    
      <div
        className="
          bg-[#31572C] text-[#FAF4D3] rounded-3xl p-6 
          w-[470px] h-[360px] 
          box-pop delay-4 cursor-pointer
          transition-all duration-300
          mt-2

          /* Tablet proportional scaling */
          md:w-[370px] md:h-[360px]

          /* Mobile adjustments */
          max-sm:w-full max-sm:h-auto max-sm:mb-4 max-sm:p-4
        "
      >
        <h2 className="text-2xl font-bold mb-3">Qualification</h2>

        <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
          <li>Undergraduate Software Engineer</li>
          <li>Intermediate in Computer Sciences</li>
          <li>Matriculation</li>
        </ul>
      </div>
    
  );
}
