import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CapyVitae - AI CV Builder",
  description: "Build your CV with the help of Capy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#1A1F1D] print:bg-white text-foreground print:text-black relative">
        {/* Decorative Background Elements (Global) */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 print:hidden">
          <svg className="absolute w-full h-full text-[#4CAF50]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Abstract dark green blob - bottom right */}
            <path d="M 60% 100% C 70% 70%, 100% 60%, 100% 100% Z" fill="#1A281E" opacity="0.8" />
            
            {/* Abstract dark green blob - top left */}
            <path d="M 0% 0% C 20% 0%, 30% 30%, 0% 40% Z" fill="#18231B" opacity="0.6" />

            {/* Large thin geometric rings */}
            <circle cx="85%" cy="5%" r="35%" fill="none" stroke="#2C4032" strokeWidth="1" opacity="0.8" />
            <circle cx="95%" cy="15%" r="20%" fill="none" stroke="#3A5542" strokeWidth="1" opacity="0.4" />
            
            <circle cx="15%" cy="95%" r="30%" fill="none" stroke="#2C4032" strokeWidth="1" opacity="0.6" />
            
            <path d="M -10% 50% Q 20% 30% 50% 60% T 110% 40%" fill="none" stroke="#25352A" strokeWidth="1" opacity="0.5" />

            {/* Glowing diamond particles */}
            <rect x="80%" y="45%" width="8" height="8" fill="currentColor" transform="rotate(45 80% 45%)" className="opacity-60 drop-shadow-[0_0_8px_rgba(76,175,80,0.8)]" />
            <rect x="15%" y="75%" width="10" height="10" fill="currentColor" transform="rotate(45 15% 75%)" className="opacity-40 drop-shadow-[0_0_8px_rgba(76,175,80,0.8)]" />
            <rect x="75%" y="15%" width="6" height="6" fill="currentColor" transform="rotate(45 75% 15%)" className="opacity-80 drop-shadow-[0_0_8px_rgba(76,175,80,0.8)]" />
            <rect x="35%" y="85%" width="8" height="8" fill="currentColor" transform="rotate(45 35% 85%)" className="opacity-50 drop-shadow-[0_0_8px_rgba(76,175,80,0.8)]" />
            <rect x="55%" y="25%" width="6" height="6" fill="currentColor" transform="rotate(45 55% 25%)" className="opacity-30 drop-shadow-[0_0_8px_rgba(76,175,80,0.8)]" />
          </svg>

          {/* Soft glowing gradients */}
          <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#3A6045]/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#2A4533]/20 blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#1F3325]/30 blur-[100px] mix-blend-screen" />
        </div>
        
        {/* Main Application Content */}
        <div className="relative z-10 flex-1 flex flex-col h-full w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
