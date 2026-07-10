import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const mockExamples = [
  {
    id: 1,
    title: "Software Engineer",
    templateName: "Minimalist Developer",
    description: "Clean, ATS-friendly design focusing on technical skills and github contributions.",
    color: "bg-slate-100",
    headerAlign: "items-start",
  },
  {
    id: 2,
    title: "Graphic Designer",
    templateName: "Creative Portfolio",
    description: "A bold, two-column layout that highlights design projects and software proficiency.",
    color: "bg-stone-100",
    headerAlign: "items-center",
  },
  {
    id: 3,
    title: "Marketing Manager",
    templateName: "Executive Standard",
    description: "Traditional corporate structure optimized for highlighting metrics and KPIs.",
    color: "bg-zinc-100",
    headerAlign: "items-center",
  },
  {
    id: 4,
    title: "Data Scientist",
    templateName: "Academic Details",
    description: "Dense, structured format perfect for publications, research, and technical stack.",
    color: "bg-gray-100",
    headerAlign: "items-start",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-foreground relative flex flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="w-full relative z-50 mt-6 shrink-0 px-8">
        <div className="container mx-auto h-20 flex items-center justify-between bg-white/5 backdrop-blur-md px-8 py-3 rounded-[40px] border border-white/10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 drop-shadow-md translate-y-1">
              <Image src="/assets/mascot/capybara_logo.png" alt="Capy Logo" fill sizes="64px" className="object-contain" priority />
            </div>
            <span className="font-heading font-bold text-3xl tracking-tight text-white drop-shadow-sm">CapyVitae</span>
          </div>

          <nav className="hidden md:flex gap-10 items-center font-medium text-sm text-gray-300">
            <Link href="#" className="hover:text-white transition-colors duration-200">Home</Link>
            <Link href="#examples" className="hover:text-white transition-colors duration-200">Templates & Examples</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/build">
              <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-[#A17757] to-[#8B5E3C] hover:from-[#8B5E3C] hover:to-[#6E492E] text-white font-semibold border-none text-base shadow-[0_4px_14px_0_rgba(161,119,87,0.39)] hover:shadow-[0_6px_20px_rgba(161,119,87,0.23)] transition-all duration-300">
                Build Your CV
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="container mx-auto px-8 flex flex-col justify-center py-20 relative z-10 w-full max-w-7xl min-h-[calc(100vh-100px)]">

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          {/* Left Column: Mascot Graphic */}
          <div className="flex-1 relative w-full h-full min-h-[45vh] lg:min-h-[55vh] flex items-center justify-center order-1 lg:order-none">
            <div className="absolute inset-0 max-w-2xl mx-auto drop-shadow-[0_0_40px_rgba(46,74,53,0.4)] transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src="/assets/mascot/capybara_hero.png"
                alt="Capy the Mascot"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column: Text & CTA */}
          <div className="flex-1 flex flex-col items-start text-left shrink-0 max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400 font-sans">
              Create a Captivating CV<br />
              with CapyVitae.
            </h1>

            <p className="text-lg text-gray-400 font-medium leading-relaxed mb-8">
              The relaxing way to build your perfect resume. Craft your professional story with ease using simple, modern templates inspired by the calm of nature.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/build">
                <Button size="lg" className="h-14 px-10 text-lg font-semibold rounded-full bg-[#A17757] hover:bg-[#8B5E3C] text-white border-none shadow-[0_4px_14px_0_rgba(161,119,87,0.39)] hover:shadow-[0_6px_20px_rgba(161,119,87,0.23)] transition-all duration-300">
                  Build Your CV
                </Button>
              </Link>
              <Link href="#examples" className="text-gray-400 hover:text-white underline underline-offset-4 text-base font-medium transition-colors duration-200">
                See Examples
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 shrink-0 mt-8">
          {/* Card 1 */}
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] flex flex-col items-start shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-[20px] bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#A17757] group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Modern Templates</h3>
            <p className="text-gray-400 leading-relaxed text-[15px]">
              Choose from a variety of sleek, professional layouts designed to make your experience stand out.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] flex flex-col items-start shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-[20px] bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#A17757] group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Intuitive Builder</h3>
            <p className="text-gray-400 leading-relaxed text-[15px]">
              Our smart editor takes the hassle out of formatting so you can focus purely on your content.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] flex flex-col items-start shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-[20px] bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#A17757] group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Professional Results</h3>
            <p className="text-gray-400 leading-relaxed text-[15px]">
              Export pixel-perfect PDF resumes that pass ATS scanners and impress recruiters instantly.
            </p>
          </div>
        </div>
      </main>

      {/* Examples Section */}
      <section id="examples" className="w-full relative z-10 pt-24 pb-32 mt-12 bg-black/20 border-t border-white/5">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
              See What You Can Build
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Browse examples of real resumes built with CapyVitae. Whether you're in tech, design, or business, we have a layout that fits your story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockExamples.map((ex) => (
              <div key={ex.id} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl">
                
                {/* Mini CV Preview */}
                <div className={`w-full aspect-[1/1.4] ${ex.color} rounded-xl p-4 shadow-inner flex flex-col gap-3 mb-6 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow`}>
                  
                  {/* Fake Resume Content */}
                  <div className={`w-full border-b border-gray-300 pb-2 flex flex-col ${ex.headerAlign}`}>
                    <div className="w-1/2 h-2.5 bg-gray-800 rounded-full mb-1.5"></div>
                    <div className="w-1/3 h-1.5 bg-gray-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex gap-3 h-full">
                    <div className="w-full flex flex-col gap-3">
                      <div>
                        <div className="w-1/4 h-2 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-full h-1 bg-gray-300 rounded-full mb-1"></div>
                        <div className="w-5/6 h-1 bg-gray-300 rounded-full mb-1"></div>
                        <div className="w-4/6 h-1 bg-gray-300 rounded-full"></div>
                      </div>
                      <div>
                        <div className="w-1/4 h-2 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-full h-1 bg-gray-300 rounded-full mb-1"></div>
                        <div className="w-3/4 h-1 bg-gray-300 rounded-full mb-1"></div>
                        <div className="w-5/6 h-1 bg-gray-300 rounded-full"></div>
                      </div>
                      <div>
                        <div className="w-1/4 h-2 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-full h-1 bg-gray-300 rounded-full mb-1"></div>
                        <div className="w-2/3 h-1 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover overlay button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Preview Layout</div>
                  </div>
                </div>

                {/* Details */}
                <h3 className="text-xl font-bold text-white mb-1">{ex.title}</h3>
                <p className="text-[#A17757] font-semibold text-sm mb-3">{ex.templateName}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{ex.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/build">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold rounded-full bg-[#A17757] hover:bg-[#8B5E3C] text-white border-none shadow-[0_4px_14px_0_rgba(161,119,87,0.39)] transition-all duration-300">
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
