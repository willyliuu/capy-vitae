import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export function RiverFlow({ data }: Props) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="w-full max-w-4xl mx-auto bg-stone-50 text-stone-800 font-sans p-10 shadow-lg min-h-[1056px]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-[#0F1A0F] font-medium mb-4">{personalInfo.role}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <p className="text-sm leading-relaxed text-stone-600">{summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#8B5A2B] mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#8B5A2B] rounded-full mr-3"></span> Experience
              </h2>
              <div className="space-y-8 border-l-2 border-stone-200 ml-4 pl-6 relative">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative break-inside-avoid">
                    <div className="absolute w-3 h-3 bg-white border-2 border-[#8B5A2B] rounded-full left-[-1.95rem] top-1.5"></div>
                    <h3 className="text-lg font-bold text-stone-900">{exp.role}</h3>
                    <div className="text-sm text-[#0F1A0F] font-semibold mb-2">
                      {exp.company} <span className="text-stone-400 font-normal">| {exp.startDate} - {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 text-sm text-stone-600 space-y-1.5">
                      {exp.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#8B5A2B] mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#8B5A2B] rounded-full mr-3"></span> Education
              </h2>
              <div className="space-y-6 border-l-2 border-stone-200 ml-4 pl-6 relative">
                {education.map((edu) => (
                  <div key={edu.id} className="relative break-inside-avoid">
                    <div className="absolute w-3 h-3 bg-white border-2 border-[#8B5A2B] rounded-full left-[-1.95rem] top-1.5"></div>
                    <h3 className="text-lg font-bold text-stone-900">{edu.degree}</h3>
                    <div className="text-sm text-[#0F1A0F] font-semibold mb-2">
                      {edu.institution} <span className="text-stone-400 font-normal">| {edu.startDate} - {edu.endDate}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 text-sm text-stone-600 space-y-1.5">
                      {edu.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-10">
          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#8B5A2B] mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#8B5A2B] rounded-full mr-3"></span> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-[#0F1A0F] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
