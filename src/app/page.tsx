"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CapybaraClassic } from "@/components/templates/CapybaraClassic";
import { BambooModern } from "@/components/templates/BambooModern";
import { RiverFlow } from "@/components/templates/RiverFlow";
import { CanopyBold } from "@/components/templates/CanopyBold";
import { ResumeData } from "@/types/resume";

const janeDoeMockData: Record<string, ResumeData> = {
  "bamboo-modern": {
    personalInfo: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@techcorp.com",
      phone: "+1 (555) 019-2834",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/janedoe",
      website: "janedoe.dev",
      role: "Lead Software Engineer",
    },
    summary: "Innovative and results-driven Software Engineer with 8+ years of experience designing, building, and deploying scalable web applications. Expert in React, Node.js, and cloud architecture.",
    experience: [
      {
        id: "exp-1",
        role: "Senior Software Engineer",
        company: "CloudScale Systems",
        location: "San Francisco, CA",
        startDate: "2021",
        endDate: "Present",
        description: [
          "Led a team of 5 engineers to migrate legacy monolith to microservices, improving deployment speed by 40%.",
          "Designed and implemented a real-time analytics dashboard using React and WebSockets, handling 10k+ concurrent users.",
          "Optimized database queries and introduced Redis caching, reducing API response times by 35%."
        ]
      },
      {
        id: "exp-2",
        role: "Software Engineer",
        company: "AppForge Inc.",
        location: "Oakland, CA",
        startDate: "2018",
        endDate: "2021",
        description: [
          "Developed and launched a cross-platform mobile application using React Native, achieving 4.8 stars on the App Store.",
          "Collaborated with UX designers to build a reusable UI component library, reducing frontend dev cycles by 25%."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "B.S. in Computer Science",
        institution: "Stanford University",
        location: "Stanford, CA",
        startDate: "2014",
        endDate: "2018",
        description: ["Specialized in Software Systems", "Graduated with Honors"]
      }
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "GraphQL", "AWS", "Docker", "PostgreSQL", "Redis", "Git", "CI/CD"],
  },
  "river-flow": {
    personalInfo: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@doecreative.com",
      phone: "+1 (555) 014-9876",
      location: "New York, NY",
      linkedin: "linkedin.com/in/janedoecreative",
      website: "janedoe.design",
      role: "Senior Graphic Designer",
    },
    summary: "Award-winning Graphic Designer and Creative Director with over 7 years of experience in visual brand strategy, digital illustration, and user interface design. Passionate about creating visually striking and meaningful design solutions.",
    experience: [
      {
        id: "exp-1",
        role: "Lead Creative Designer",
        company: "Vivid Agency",
        location: "New York, NY",
        startDate: "2022",
        endDate: "Present",
        description: [
          "Spearheaded complete visual rebrand for a Fortune 500 fintech client, boosting brand engagement by 50%.",
          "Mentored a team of 4 junior designers and established standard design system guidelines.",
          "Directed design strategy for social media campaigns, achieving 2M+ organic impressions."
        ]
      },
      {
        id: "exp-2",
        role: "Graphic Designer",
        company: "Studio Bloom",
        location: "Brooklyn, NY",
        startDate: "2019",
        endDate: "2022",
        description: [
          "Created visually compelling digital assets, print collateral, and packaging designs for direct-to-consumer brands.",
          "Collaborated with copywriters and marketing managers to design high-converting email newsletters."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "B.F.A. in Graphic Design",
        institution: "Rhode Island School of Design",
        location: "Providence, RI",
        startDate: "2015",
        endDate: "2019",
        description: ["Outstanding Creative Achievement Award", "Minor in Art History"]
      }
    ],
    skills: ["Brand Strategy", "Typography", "Adobe Creative Suite", "Figma", "Digital Illustration", "UI/UX Design", "Print & Packaging", "Motion Graphics"],
  },
  "canopy-bold": {
    personalInfo: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@globalcorp.com",
      phone: "+1 (555) 017-1234",
      location: "Chicago, IL",
      linkedin: "linkedin.com/in/janedoemarketing",
      website: "janedoemarketing.com",
      role: "Marketing Director",
    },
    summary: "Dynamic and analytical Marketing Director with a track record of driving revenue growth and market share. Proven success in executing multi-channel digital campaigns, public relations, and cross-functional leadership.",
    experience: [
      {
        id: "exp-1",
        role: "Director of Marketing",
        company: "Summit Growth Tech",
        location: "Chicago, IL",
        startDate: "2021",
        endDate: "Present",
        description: [
          "Designed and executed growth strategy that increased ARR from $10M to $25M in under 2 years.",
          "Managed a $2.5M annual marketing budget across SEO, PPC, paid social, and event channels.",
          "Supervised a high-performing department of 12 marketing professionals."
        ]
      },
      {
        id: "exp-2",
        role: "Senior Growth Marketer",
        company: "LeadStream Corp",
        location: "Chicago, IL",
        startDate: "2018",
        endDate: "2021",
        description: [
          "Optimized paid search campaigns to reduce overall Cost Per Acquisition (CPA) by 30%.",
          "Authored industry whitepapers and case studies that generated over 5,000 qualified enterprise leads."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "M.B.A. in Marketing Strategy",
        institution: "Northwestern University",
        location: "Evanston, IL",
        startDate: "2016",
        endDate: "2018",
        description: ["Kellogg Marketing Fellowship", "Dean's List"]
      }
    ],
    skills: ["Growth Marketing", "Campaign Management", "SEO & SEM", "Data Analytics", "Content Strategy", "Public Relations", "Team Leadership", "Budgeting & Forecasting"],
  },
  "capybara-classic": {
    personalInfo: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@datainsight.org",
      phone: "+1 (555) 013-4321",
      location: "Boston, MA",
      linkedin: "linkedin.com/in/janedoedata",
      website: "janedoedata.org",
      role: "Lead Data Scientist",
    },
    summary: "Senior Data Scientist with a strong mathematical background and 6+ years of experience applying machine learning, predictive modeling, and statistical analysis to solve complex business problems.",
    experience: [
      {
        id: "exp-1",
        role: "Lead Data Scientist",
        company: "Quantum Analytics",
        location: "Boston, MA",
        startDate: "2021",
        endDate: "Present",
        description: [
          "Developed an NLP-driven customer sentiment model, improving recommendation accuracy by 18%.",
          "Designed and executed A/B tests that led to a 12% increase in user retention rates.",
          "Built end-to-end machine learning pipelines using Python, Docker, and Kubernetes on AWS."
        ]
      },
      {
        id: "exp-2",
        role: "Data Scientist",
        company: "Insight Partners",
        location: "Cambridge, MA",
        startDate: "2018",
        endDate: "2021",
        description: [
          "Constructed predictive models to forecast customer churn with 89% precision, saving $1.2M in annual revenue.",
          "Collaborated with data engineers to optimize SQL databases and Spark processing jobs."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Ph.D. in Statistics",
        institution: "Harvard University",
        location: "Cambridge, MA",
        startDate: "2013",
        endDate: "2018",
        description: ["Thesis on High-Dimensional Statistical Inference", "Teaching Assistant for Linear Models"]
      }
    ],
    skills: ["Python", "R", "SQL", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Spark", "AWS", "Data Visualization", "Statistical Analysis"],
  }
};

function MiniPreview({ templateId, mockData }: { templateId: string, mockData: ResumeData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setScale(width / 800);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const renderTemplate = () => {
    switch (templateId) {
      case "bamboo-modern": return <BambooModern data={mockData} />;
      case "river-flow": return <RiverFlow data={mockData} />;
      case "canopy-bold": return <CanopyBold data={mockData} />;
      case "capybara-classic": default: return <CapybaraClassic data={mockData} />;
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-white rounded-xl shadow-inner group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow">
      <div 
        style={{ 
          width: '800px', 
          minHeight: '1131px',
          transform: `scale(${scale})`, 
          transformOrigin: 'top left',
          pointerEvents: 'none'
        }}
        className="absolute top-0 left-0 bg-white"
      >
        {renderTemplate()}
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Preview Layout</div>
      </div>
    </div>
  );
}

const mockExamples = [
  {
    id: 1,
    title: "Software Engineer",
    templateId: "bamboo-modern",
    templateName: "Bamboo Modern",
    description: "Clean, structured, and modern layout designed specifically for developers, data scientists, and tech professionals.",
    color: "bg-slate-100",
    headerAlign: "items-start",
  },
  {
    id: 2,
    title: "Graphic Designer",
    templateId: "river-flow",
    templateName: "River Flow",
    description: "A creative, flowing layout featuring visually distinct visual accents—perfect for designers, writers, and marketers.",
    color: "bg-stone-100",
    headerAlign: "items-center",
  },
  {
    id: 3,
    title: "Marketing Manager",
    templateId: "canopy-bold",
    templateName: "Canopy Bold",
    description: "Traditional corporate structure with prominent headers, built for highlighting sales growth, metrics, and leadership KPIs.",
    color: "bg-zinc-100",
    headerAlign: "items-center",
  },
  {
    id: 4,
    title: "Data Scientist",
    templateId: "capybara-classic",
    templateName: "Capybara Classic",
    description: "The gold standard of formal CVs. Traditional, clean serif structure suitable for corporate finance, law, or academic roles.",
    color: "bg-gray-100",
    headerAlign: "items-start",
  },
];

export default function Home() {
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activePreviewTemplate) return;
    const updateScale = () => {
      if (modalWrapperRef.current) {
        const availableWidth = modalWrapperRef.current.clientWidth - 48; // padding
        setScale(Math.min(1, availableWidth / 800));
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (modalWrapperRef.current) {
      observer.observe(modalWrapperRef.current);
    }
    window.addEventListener("resize", updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [activePreviewTemplate]);

  const renderActiveTemplate = () => {
    if (!activePreviewTemplate) return null;
    const mockData = janeDoeMockData[activePreviewTemplate];
    if (!mockData) return null;

    switch (activePreviewTemplate) {
      case "bamboo-modern":
        return <BambooModern data={mockData} />;
      case "river-flow":
        return <RiverFlow data={mockData} />;
      case "canopy-bold":
        return <CanopyBold data={mockData} />;
      case "capybara-classic":
      default:
        return <CapybaraClassic data={mockData} />;
    }
  };

  return (
    <div className="min-h-screen text-foreground relative flex flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative z-50 mt-6 shrink-0 px-8"
      >
        <div className="container mx-auto h-20 flex items-center justify-between bg-white/5 backdrop-blur-md px-8 py-3 rounded-[40px] border border-white/10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 drop-shadow-md translate-y-1">
              <Image src="/assets/mascot/capybara_logo.png" alt="Capy Logo" fill sizes="64px" className="object-contain" priority />
            </div>
            <span className="font-heading font-bold text-3xl tracking-tight text-white drop-shadow-sm">CapyVitae</span>
          </div>

          <nav className="hidden md:flex gap-10 items-center font-medium text-sm text-gray-300">
            <Link href="#" className="hover:text-white transition-colors duration-200">Home</Link>
            <button onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors duration-200 text-left">Templates</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/build">
              <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-[#A17757] to-[#8B5E3C] hover:from-[#8B5E3C] hover:to-[#6E492E] text-white font-semibold border-none text-base shadow-[0_4px_14px_0_rgba(161,119,87,0.39)] hover:shadow-[0_6px_20px_rgba(161,119,87,0.23)] transition-all duration-300">
                Build Your CV
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Main Content Hero */}
      <main className="container mx-auto px-8 flex flex-col justify-center py-4 relative z-10 w-full max-w-7xl min-h-[calc(100vh-104px)]">

        <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 mb-6 min-h-0">
          {/* Right Column: Mascot Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 1.3, rotate: -5 }}
            animate={{ opacity: 1, scale: 1.5, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 relative w-full h-full flex items-center justify-center order-2 lg:order-2 min-h-[300px] lg:min-h-[450px]"
          >
            <div className="absolute inset-0 max-w-xl mx-auto drop-shadow-[0_0_40px_rgba(46,74,53,0.4)] transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src="/assets/mascot/capybara_hero.png"
                alt="Capy the Mascot"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col items-start text-left shrink-0 max-w-xl order-1 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400 font-sans"
            >
              Create a Captivating CV<br />
              with CapyVitae.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="text-base text-gray-300 font-medium leading-relaxed mb-6"
            >
              The relaxing way to build your perfect resume. Craft your professional story with ease using simple, modern templates inspired by the calm of nature.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/build">
                <Button size="lg" className="h-12 px-8 text-base font-semibold rounded-full bg-[#A17757] hover:bg-[#8B5E3C] text-white border-none shadow-[0_4px_14px_0_rgba(161,119,87,0.39)] hover:shadow-[0_6px_20px_rgba(161,119,87,0.23)] transition-all duration-300">
                  Build Your CV
                </Button>
              </Link>
              <button onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })} className="h-12 px-8 text-sm font-semibold rounded-full border border-white/20 hover:bg-white/10 text-white transition-all duration-300">
                See Examples
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 }
            }
          }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0"
        >
          {/* Card 1 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[24px] flex flex-col items-start shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-[16px] bg-white/5 flex items-center justify-center mb-4 border border-white/10 text-[#A17757] group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            </div>
            <span className="text-[#A17757] font-bold text-xs tracking-wider uppercase mb-1">Step 1</span>
            <h3 className="text-lg font-bold text-white mb-2">Modern Templates</h3>
            <p className="text-gray-300 leading-relaxed text-[14px]">
              Choose from a variety of sleek, professional layouts designed to make your experience stand out.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[24px] flex flex-col items-start shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-[16px] bg-white/5 flex items-center justify-center mb-4 border border-white/10 text-[#A17757] group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <span className="text-[#A17757] font-bold text-xs tracking-wider uppercase mb-1">Step 2</span>
            <h3 className="text-lg font-bold text-white mb-2">Intuitive Builder</h3>
            <p className="text-gray-300 leading-relaxed text-[14px]">
              Our smart editor takes the hassle out of formatting so you can focus purely on your content.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[24px] flex flex-col items-start shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-[16px] bg-white/5 flex items-center justify-center mb-4 border border-white/10 text-[#A17757] group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <span className="text-[#A17757] font-bold text-xs tracking-wider uppercase mb-1">Step 3</span>
            <h3 className="text-lg font-bold text-white mb-2">Professional Results</h3>
            <p className="text-gray-300 leading-relaxed text-[14px]">
              Export pixel-perfect PDF resumes that pass ATS scanners and impress recruiters instantly.
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Examples Section */}
      <section id="examples" className="w-full relative z-10 pt-24 pb-32 mt-12 bg-black/20 border-t border-white/5">
        <div className="container mx-auto px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-br from-white via-white to-gray-400">
              See What You Can Build
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Browse examples of real resumes built with CapyVitae. Whether you&apos;re in tech, design, or business, we have a layout that fits your story.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {mockExamples.map((ex) => (
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
                key={ex.id}
                onClick={() => setActivePreviewTemplate(ex.templateId)}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl"
              >
                {/* Mini CV Preview */}
                <div className="w-full aspect-[210/297] mb-6 relative">
                  <MiniPreview templateId={ex.templateId} mockData={janeDoeMockData[ex.templateId]} />
                </div>

                {/* Details */}
                <h3 className="text-xl font-bold text-white mb-1">{ex.title}</h3>
                <p className="text-[#A17757] font-semibold text-sm mb-3">{ex.templateName}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{ex.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-20 text-center"
          >
            <Link href="/build">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold rounded-full bg-[#A17757] hover:bg-[#8B5E3C] text-white border-none shadow-[0_4px_14px_0_rgba(161,119,87,0.39)] transition-all duration-300">
                Start Building
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activePreviewTemplate && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-white capitalize">
                    {mockExamples.find(e => e.templateId === activePreviewTemplate)?.templateName || "Template"} Preview
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Mock profile for Jane Doe</p>
                </div>
                <button 
                  onClick={() => setActivePreviewTemplate(null)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content - Scrollable scaled preview */}
              <div 
                ref={modalWrapperRef} 
                className="flex-1 overflow-y-auto p-6 flex flex-col items-center bg-black/40 min-h-[300px]"
              >
                <div 
                  style={{ 
                    width: '800px', 
                    minHeight: '1131px',
                    transform: `scale(${scale})`, 
                    transformOrigin: 'top center',
                    marginBottom: `-${800 * (1 - scale)}px`
                  }} 
                  className="shadow-2xl bg-white rounded-sm overflow-hidden"
                >
                  {renderActiveTemplate()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/20 shrink-0">
                <p className="text-sm text-gray-400">
                  Ready to write your own CV using this layout?
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActivePreviewTemplate(null)}
                    className="px-6 py-3 rounded-full text-sm font-semibold border border-white/10 hover:bg-white/5 text-white transition-colors"
                  >
                    Close Preview
                  </button>
                  <Link href={`/build?template=${activePreviewTemplate}`}>
                    <Button className="rounded-full px-6 py-3 bg-[#A17757] hover:bg-[#8B5E3C] text-white font-semibold flex items-center gap-2 border-none">
                      Use this Template <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
