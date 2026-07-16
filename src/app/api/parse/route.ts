import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import PDFParser from "pdf2json";

// Force Node.js runtime since PDF parsing requires Node APIs
export const runtime = 'nodejs';
export const maxDuration = 60; // 60s max duration for Groq + PDF processing

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const background = formData.get("background") as string || "Professional";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing Groq API Key on server." }, { status: 500 });
    }

    // 1. Read PDF file and extract text
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let pdfText = "";
    try {
      pdfText = await new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser(null, true);
        pdfParser.on("pdfParser_dataError", (errData: Error | { parserError: Error }) => reject(new Error(errData instanceof Error ? errData.message : errData.parserError.message)));
        pdfParser.on("pdfParser_dataReady", () => {
          resolve(pdfParser.getRawTextContent());
        });
        pdfParser.parseBuffer(buffer);
      });
    } catch (e: unknown) {
      console.error("Failed to parse PDF:", e);
      return NextResponse.json({ error: "Failed to parse PDF file. " + ((e as Error)?.message || String(e)) }, { status: 400 });
    }

    // 2. Query Groq AI
    const systemPrompt = `You are an expert CV/Resume writer. The user is a "${background}".
Your task is to read the raw text extracted from a LinkedIn PDF export, and return a clean, professional, ATS-optimized JSON object containing their resume data.

IMPORTANT: You MUST respond ONLY with a valid JSON object matching this exact structure, with no markdown formatting, no code blocks, and no extra text outside the JSON:

{
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "website": "string",
    "role": "string"
  },
  "summary": "string",
  "experience": [
    {
      "id": "unique-string",
      "role": "string",
      "company": "string",
      "location": "string",
      "startDate": "string (e.g. Jan 2020)",
      "endDate": "string (e.g. Present or Dec 2022)",
      "description": ["bullet point 1", "bullet point 2"]
    }
  ],
  "education": [
    {
      "id": "unique-string",
      "degree": "string",
      "institution": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "description": ["bullet point 1"]
    }
  ],
  "projects": [
    {
      "id": "unique-string",
      "title": "string",
      "link": "string",
      "startDate": "string",
      "endDate": "string",
      "description": ["bullet point 1"]
    }
  ],
  "skills": ["skill 1", "skill 2"]
}

Rules:
- Infer the "role" in personalInfo based on their most recent experience.
- Enhance and professionalize bullet points in experience (use strong action verbs, focus on impact).
- Keep the summary concise but impactful.
- If data is missing (e.g. no phone number), leave it as an empty string "".
- Return ONLY the JSON object.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the raw LinkedIn text to parse:\n\n${pdfText}` }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1, // Low temperature for deterministic JSON output
      response_format: { type: "json_object" }
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from Groq");
    }

    const parsedData = JSON.parse(aiResponse);

    return NextResponse.json(parsedData, { status: 200 });

  } catch (error: unknown) {
    console.error("Parse API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to process PDF" },
      { status: 500 }
    );
  }
}
