import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export function GenerativeResume({ data }: Props) {
  const { personalInfo, summary, experience, education, projects, skills, theme, layout } = data;

  // Fallbacks in case the AI didn't generate them or it's a legacy record
  const currentTheme = theme || {
    primaryColor: "#2563eb",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    fontFamily: "font-sans",
    spacing: "normal",
  };

  const currentLayout = layout || {
    columns: 1,
    headerStyle: "centered",
    main: ["summary", "experience", "projects", "education", "skills"],
  };

  const customStyle = {
    "--cv-primary": currentTheme.primaryColor,
    "--cv-bg": currentTheme.backgroundColor,
    "--cv-text": currentTheme.textColor,
  } as React.CSSProperties;

  const getSpacingClass = () => {
    switch (currentTheme.spacing) {
      case "compact": return "p-6 space-y-3";
      case "relaxed": return "p-12 space-y-8";
      case "normal":
      default: return "p-10 space-y-6";
    }
  };

  const getHeaderAlignment = () => {
    switch (currentLayout.headerStyle) {
      case "left-aligned": return "text-left";
      case "split": return "flex justify-between items-end";
      case "centered":
      default: return "text-center";
    }
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 
      className="text-xl font-bold uppercase mb-3 border-b-2" 
      style={{ color: "var(--cv-primary)", borderColor: "var(--cv-primary)" }}
    >
      {title}
    </h2>
  );

  const renderSummary = () => {
    if (!summary) return null;
    return (
      <section key="summary" className="mb-6">
        <SectionHeader title="Professional Summary" />
        <p className="text-sm leading-relaxed" style={{ color: "var(--cv-text)" }}>{summary}</p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!experience || experience.length === 0) return null;
    return (
      <section key="experience" className="mb-6">
        <SectionHeader title="Experience" />
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="break-inside-avoid">
              <div className="flex justify-between font-bold" style={{ color: "var(--cv-text)" }}>
                <h3>{exp.role}</h3>
                <span style={{ color: "var(--cv-primary)" }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="flex justify-between text-sm italic mb-2" style={{ color: "var(--cv-text)" }}>
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1" style={{ color: "var(--cv-text)" }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <section key="projects" className="mb-6">
        <SectionHeader title="Projects" />
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className="break-inside-avoid">
              <div className="flex justify-between font-bold" style={{ color: "var(--cv-text)" }}>
                <h3>{proj.title} {proj.link && <a href={proj.link} className="text-xs font-normal text-blue-500 hover:underline ml-2">({proj.link})</a>}</h3>
                <span style={{ color: "var(--cv-primary)" }}>{proj.startDate} – {proj.endDate}</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2" style={{ color: "var(--cv-text)" }}>
                {proj.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    return (
      <section key="education" className="mb-6">
        <SectionHeader title="Education" />
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="break-inside-avoid">
              <div className="flex justify-between font-bold" style={{ color: "var(--cv-text)" }}>
                <h3>{edu.degree}</h3>
                <span style={{ color: "var(--cv-primary)" }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="flex justify-between text-sm italic mb-2" style={{ color: "var(--cv-text)" }}>
                <span>{edu.institution}</span>
                <span>{edu.location}</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1" style={{ color: "var(--cv-text)" }}>
                {edu.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!skills || skills.length === 0) return null;
    return (
      <section key="skills" className="mb-6">
        <SectionHeader title="Skills" />
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 text-xs rounded-full font-medium"
              style={{ backgroundColor: "var(--cv-primary)", color: "var(--cv-bg)" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const renderSection = (section: string) => {
    switch (section) {
      case "summary": return renderSummary();
      case "experience": return renderExperience();
      case "education": return renderEducation();
        case "projects": return renderProjects();
      case "skills": return renderSkills();
      default: return null;
    }
  };

  return (
    <div 
      className={`w-full min-h-[1131px] ${currentTheme.fontFamily} ${getSpacingClass()}`}
      style={{ ...customStyle, backgroundColor: "var(--cv-bg)" }}
    >
      <header className={`border-b-2 pb-4 mb-6 ${getHeaderAlignment()}`} style={{ borderColor: "var(--cv-primary)" }}>
        {currentLayout.headerStyle === "split" ? (
          <>
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold uppercase mb-1" style={{ color: "var(--cv-primary)" }}>
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="text-lg font-medium" style={{ color: "var(--cv-text)" }}>{personalInfo.role}</p>
              </div>
              <div className="text-sm text-right space-y-1" style={{ color: "var(--cv-text)" }}>
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
                {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold uppercase mb-2" style={{ color: "var(--cv-primary)" }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-lg font-medium mb-3" style={{ color: "var(--cv-text)" }}>{personalInfo.role}</p>
            <div className={`text-sm flex flex-wrap gap-4 ${currentLayout.headerStyle === "centered" ? "justify-center" : "justify-start"}`} style={{ color: "var(--cv-text)" }}>
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </>
        )}
      </header>

      {currentLayout.columns === 2 && currentLayout.sidebar ? (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            {currentLayout.sidebar.map(renderSection)}
          </div>
          <div className="col-span-2 space-y-6">
            {currentLayout.main.map(renderSection)}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {currentLayout.main.map(renderSection)}
        </div>
      )}
    </div>
  );
}
