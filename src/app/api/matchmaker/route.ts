import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = 'nodejs';
export const maxDuration = 60; // 60s max duration

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy_key_for_build",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetRole, summary } = body;

    if (!targetRole) {
      return NextResponse.json({ error: "No target role provided" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing Groq API Key on server." }, { status: 500 });
    }

    const systemPrompt = `You are an expert AI Resume Matchmaker and Designer.
Your task is to analyze the user's Target Role and optionally their professional summary, and generate a highly optimized resume layout and theme.

Return a strict JSON object with the following schema:
{
  "templateId": "generative",
  "reason": "A 1-2 sentence explanation of why this specific theme and layout perfectly matches their role.",
  "theme": {
    "primaryColor": "#hexcode", // Choose a color that fits the vibe of the role (e.g. Navy for Finance, Vibrant Purple for Creative)
    "backgroundColor": "#hexcode", // Usually #ffffff or a very light tint
    "textColor": "#hexcode", // Usually #1f2937 or #000000
    "fontFamily": "font-sans" | "font-serif" | "font-mono", // Serif for traditional, Sans for modern/tech
    "spacing": "compact" | "normal" | "relaxed" // Compact for lots of text, Relaxed for design roles
  },
  "layout": {
    "columns": 1 | 2, // 1 for executive/dense resumes, 2 for junior/creative or when skills are prominent
    "headerStyle": "centered" | "left-aligned" | "split",
    "sidebar": ["skills", "education"], // Optional, only if columns is 2. Must be an array of strings from: "personalInfo", "skills", "education", "summary", "experience".
    "main": ["summary", "experience"] // Array of strings from: "summary", "experience", "education", "skills". Define the order of sections!
  }
}

Important Layout Rules:
- If columns is 1, omit the "sidebar" property completely and put everything in "main".
- "main" and "sidebar" arrays combined must contain the exact sections (e.g., ["summary", "experience", "education", "skills"]). Do not duplicate sections between them.
- Order matters. E.g., for Junior devs, maybe put "education" before "experience".

Do NOT include any markdown or text outside of the JSON object.`;

    const userMessage = `Target Role: ${targetRole}\nSummary: ${summary || 'None'}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from Groq");
    }

    const parsedResponse = JSON.parse(aiResponse);

    return NextResponse.json(parsedResponse, { status: 200 });

  } catch (error: unknown) {
    console.error("Matchmaker API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to match template" },
      { status: 500 }
    );
  }
}
