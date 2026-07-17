import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export function BambooModern({ data }: Props) {
  const { personalInfo, summary, experience, education, projects, skills } = data;

  return (
    <div className="w-full bg-white text-gray-800 font-sans flex min-h-[1131px] relative z-0">
      {/* Print Background Hack: Repeats on every PDF page */}
      <div className="hidden print:block fixed inset-y-0 left-0 w-1/3 bg-gray-100 -z-10" />

      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-100 print:bg-transparent p-8 flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {personalInfo.firstName} <br /> {personalInfo.lastName}
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">{personalInfo.role}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-2 mb-4">Contact</h2>
          <div className="text-sm space-y-2 text-gray-600">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p className="truncate">{personalInfo.linkedin}</p>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-2 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8 flex flex-col space-y-8">
        {summary && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                  <div className="text-sm text-gray-500 mb-2 font-medium">
                    {exp.company}{exp.location ? ` • ${exp.location}` : ""} • {exp.startDate} - {exp.endDate}
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
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
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <h3 className="text-lg font-semibold text-gray-900">{proj.title} {proj.link && <a href={proj.link} className="text-xs font-normal text-blue-500 hover:underline ml-2">({proj.link})</a>}</h3>
                  <div className="text-sm text-gray-500 mb-2 font-medium">
                    {proj.startDate} - {proj.endDate}
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
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
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-sm text-gray-500 mb-2 font-medium">
                    {edu.institution}{edu.location ? ` • ${edu.location}` : ""} • {edu.startDate} - {edu.endDate}
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {edu.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
