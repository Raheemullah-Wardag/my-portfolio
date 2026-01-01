import Footer from "@/components/Footer";
import "./globals.css";
export const metadata = {
  title: "Raheem Portfolio",
  description: "Portfolio website",
};

export  default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Footer/>
      </body>
    </html>
  );
}
