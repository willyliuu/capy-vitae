import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export function CapybaraClassic({ data }: Props) {
  const { personalInfo, summary, experience, education, projects, skills } = data;

  return (
    <div className="w-full bg-white text-black p-10 font-serif min-h-[1131px]">
      <header className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-700">{personalInfo.role}</p>
        <div className="text-sm text-gray-600 mt-2 flex justify-center space-x-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between font-bold">
                  <h3>{exp.role}</h3>
                  <span>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between text-sm italic mb-2">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex justify-between font-bold">
                  <h3>{proj.title} {proj.link && <a href={proj.link} className="text-xs font-normal text-blue-500 hover:underline ml-2">({proj.link})</a>}</h3>
                  <span>{proj.startDate} – {proj.endDate}</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {proj.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex justify-between font-bold">
                  <h3>{edu.degree}</h3>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between text-sm italic mb-2">
                  <span>{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {edu.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">Skills</h2>
          <p className="text-sm leading-relaxed">{skills.join(" • ")}</p>
        </section>
      )}
    </div>
  );
}
