import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation / Progress */}
      <header className="print:hidden sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 max-w-7xl mx-auto items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
            <div className="relative w-8 h-8">
              <Image src="/assets/mascot/default.png" alt="Capy Logo" fill className="object-contain" />
            </div>
            <span className="font-heading font-bold text-lg hidden sm:inline-block">CapyVitae</span>
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            <span className="hidden sm:inline-block">Onboarding</span>
            <span className="hidden sm:inline-block">&gt;</span>
            <span className="text-foreground font-semibold">Build</span>
            <span className="hidden sm:inline-block">&gt;</span>
            <span className="hidden sm:inline-block">Preview</span>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col print:p-0 print:m-0">
        <div className="w-full h-full print:w-full print:m-0 print:p-0">
          {children}
        </div>
      </main>
    </div>
  );
}
