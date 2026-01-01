"use client"
export default function Footer() {
  return (
    <footer className="bg-[#31582C] text-[#FAF4D3] w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm sm:text-base">
        <p className="font-medium">
          &copy; {new Date().getFullYear()} Raheem. All rights reserved.
        </p>
        <p className="mt-1 text-xs sm:text-sm">
          Any misuse of the information contained herein is strictly 
          <span className="font-semibold"> punishable by law</span>.
        </p>
      </div>
    </footer>
  );
}
