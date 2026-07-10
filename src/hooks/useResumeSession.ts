"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";

const SESSION_KEY = "capyvitae_resume_data";

const defaultData: ResumeData = {
  personalInfo: {
    firstName: "Capy",
    lastName: "Bara",
    email: "capy@vitae.com",
    phone: "+1 234 567 890",
    location: "Amazon Rainforest, BR",
    linkedin: "linkedin.com/in/capybara",
    website: "capyvitae.com",
    role: "Senior Chill Engineer",
  },
  summary: "A highly adaptable and exceptionally chill Senior Engineer with over 5 years of experience in cross-species team collaboration, ecosystem maintenance, and advanced aquatic operations. Proven ability to remain completely unbothered in high-stress environments.",
  experience: [
    {
      id: "exp-1",
      role: "Lead River Navigator",
      company: "Amazon Wetlands Inc.",
      location: "Brazil",
      startDate: "Jan 2021",
      endDate: "Present",
      description: [
        "Orchestrated daily aquatic migrations for a team of 40+ capybaras, improving transit efficiency by 30%.",
        "Implemented a new 'chill-first' methodology, reducing team stress levels to zero.",
        "Collaborated cross-functionally with local bird and turtle populations for mutual ecosystem benefits."
      ]
    },
    {
      id: "exp-2",
      role: "Grass Management Specialist",
      company: "Savanna Landscaping",
      location: "Argentina",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      description: [
        "Maintained over 50 acres of premium grassland through sustainable grazing techniques.",
        "Awarded 'Most Relaxed Employee' for 36 consecutive months."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Ecosystem Management",
      institution: "University of Capybara",
      location: "Wetlands",
      startDate: "2014",
      endDate: "2018",
      description: ["Graduated Magna Cum Laude", "President of the Swimming Club"]
    }
  ],
  skills: ["Advanced Chilling", "Aquatic Navigation", "Cross-species Diplomacy", "Grass Eating", "Stress Management", "Agile Methodologies"],
  templateId: "capybara-classic",
};

export function useResumeSession() {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load resume data from session storage", e);
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: Partial<ResumeData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setData(defaultData);
  };

  return { data, updateData, clearSession, isLoaded };
}
