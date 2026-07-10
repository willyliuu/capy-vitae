import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-900/30 blur-[150px] mix-blend-screen" />
      </div>

      {/* Navigation Bar */}
      <header className="w-full border-b border-white/5 bg-background/40 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/assets/mascot/default.png" alt="Capy Logo" fill className="object-contain" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tight text-white">CapyVitae</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center font-medium text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>

            <Link href="/build">
              <Button className="rounded-full px-6 font-bold">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-20 z-10">

        {/* Left Column: Text & CTA */}
        <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">CapyVitae AI is now in Beta</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black font-heading tracking-tight leading-[1.1] mb-6 text-white">
            Build Your <span className="text-primary">Perfect CV</span>, <br />
            Stress-Free.
          </h1>

          {/* Glassmorphism Card for Subtext */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl mb-10 shadow-xl">
            <p className="text-lg lg:text-xl text-gray-300 font-medium leading-relaxed">
              Let Capy guide you. Import your LinkedIn profile and watch our AI instantly generate a beautiful, ATS-friendly resume tailored to your industry. No registration required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/build" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-10 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform duration-300">
                Build CV Now
              </Button>
            </Link>

          </div>
        </div>

        {/* Right Column: Mascot Graphic */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-xl aspect-square flex items-center justify-center">
          {/* Circular backdrop for mascot */}
          <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-emerald-500/10 rounded-full blur-2xl animate-pulse duration-3000"></div>

          {/* Glass card floating behind mascot */}
          <div className="absolute top-10 right-10 w-48 h-64 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl rotate-12 -z-10 hidden md:block"></div>
          <div className="absolute bottom-10 left-10 w-56 h-40 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl -rotate-6 -z-10 hidden md:block"></div>

          <Image
            src="/assets/mascot/default.png"
            alt="Capy the Mascot"
            fill
            className="object-contain drop-shadow-2xl z-10 p-8 lg:p-0 hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
        </div>
      </main>
    </div>
  );
}
