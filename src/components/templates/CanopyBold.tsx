import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export function CanopyBold({ data }: Props) {
  const { personalInfo, summary, experience, education, projects, skills } = data;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-900 font-sans shadow-lg min-h-[1056px]">
      <header className="bg-[#0F1A0F] text-white p-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-2xl font-bold text-[#8B5A2B] uppercase tracking-widest">{personalInfo.role}</p>
        
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-gray-300">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      <div className="p-12 space-y-10">
        {summary && (
          <section>
            <h2 className="text-xl font-black uppercase tracking-widest border-b-4 border-[#0F1A0F] pb-2 mb-4">Summary</h2>
            <p className="text-base leading-relaxed font-medium text-gray-700">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase tracking-widest border-b-4 border-[#0F1A0F] pb-2 mb-6">Professional Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-xl font-bold text-[#0F1A0F]">{exp.role}</h3>
                    <span className="text-sm font-bold text-[#8B5A2B] bg-orange-50 px-3 py-1 rounded-sm mt-1 sm:mt-0">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-base font-bold text-gray-500 mb-3 uppercase tracking-wide">
                    {exp.company} | {exp.location}
                  </div>
                  <ul className="list-square list-inside text-sm text-gray-800 space-y-2 font-medium">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#8B5A2B] mr-2">■</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-indigo-900 mb-4 border-l-4 border-indigo-600 pl-3">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{proj.title} {proj.link && <a href={proj.link} className="text-xs font-normal text-blue-500 hover:underline ml-2">({proj.link})</a>}</h3>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">{proj.startDate} - {proj.endDate}</span>
                  </div>
                  <ul className="list-disc list-outside ml-5 text-gray-700 text-sm space-y-2 mt-2">
                    {proj.description.map((desc, idx) => (
                      <li key={idx} className="pl-2 leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase tracking-widest border-b-4 border-[#0F1A0F] pb-2 mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-lg font-bold text-[#0F1A0F]">{edu.degree}</h3>
                    <span className="text-sm font-bold text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-base font-bold text-[#8B5A2B] mb-2 uppercase tracking-wide">
                    {edu.institution} | {edu.location}
                  </div>
                  <ul className="list-square list-inside text-sm text-gray-800 space-y-2 font-medium">
                    {edu.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#8B5A2B] mr-2">■</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase tracking-widest border-b-4 border-[#0F1A0F] pb-2 mb-4">Core Competencies</h2>
            <p className="text-base font-bold leading-relaxed text-gray-700 uppercase">
              {skills.join(" • ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
