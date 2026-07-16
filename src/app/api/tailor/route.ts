import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = 'nodejs';
export const maxDuration = 60;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy_key_for_build",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription, resumeData } = body;

    if (!jobDescription || !resumeData) {
      return NextResponse.json({ error: "Job description and resume data are required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing Groq API Key on server." }, { status: 500 });
    }

    const systemPrompt = `You are an expert CV/Resume writer and ATS optimizer. The user wants to tailor their resume to a specific Job Description (JD).
Your task is to take their current resume JSON and the Job Description, and return an optimized version of the resume data.

Instructions:
1. Re-order the "skills" array so that skills mentioned in or highly relevant to the JD appear first. You may slightly rephrase existing skills to match the JD's exact vocabulary if appropriate, but do not fabricate completely new skills they don't possess.
2. Rewrite the "summary" to strongly align with the company's stated needs in the JD, highlighting relevant experience.
3. Tweak the "description" bullet points inside the "experience", "education", and "projects" arrays to mirror the vocabulary and priorities found in the JD. Maintain the core truth of their achievements but frame them to match what the employer is looking for.
4. Keep the exact same JSON structure, IDs, dates, companies, and roles. ONLY modify the summary, skills array, and description arrays.

IMPORTANT: You MUST respond ONLY with a valid JSON object matching this exact structure, with no markdown formatting, no code blocks, and no extra text outside the JSON:

{
  "summary": "string",
  "skills": "comma separated string of skills",
  "experience": [
    {
      "id": "original-id",
      "description": ["tweaked bullet 1", "tweaked bullet 2"]
    }
  ],
  "education": [
    {
      "id": "original-id",
      "description": ["tweaked bullet 1"]
    }
  ],
  "projects": [
    {
      "id": "original-id",
      "description": ["tweaked bullet 1"]
    }
  ]
}

Note: The "skills" should be returned as a single comma-separated string if that is how it was provided in the input, or array if provided as array. Return it as a comma-separated string.`;

    const userMessage = `Job Description:\n${jobDescription}\n\nCurrent Resume Data:\n${JSON.stringify({
      summary: resumeData.summary,
      skills: resumeData.skills,
      experience: resumeData.experience.map((e: any) => ({ id: e.id, description: e.bulletPoints?.map((b:any)=>b.text) })),
      education: resumeData.education.map((e: any) => ({ id: e.id, description: e.bulletPoints?.map((b:any)=>b.text) })),
      projects: resumeData.projects.map((e: any) => ({ id: e.id, description: e.bulletPoints?.map((b:any)=>b.text) })),
    })}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from Groq");
    }

    const parsedData = JSON.parse(aiResponse);

    return NextResponse.json(parsedData, { status: 200 });

  } catch (error: unknown) {
    console.error("Tailor API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to tailor CV" },
      { status: 500 }
    );
  }
}
