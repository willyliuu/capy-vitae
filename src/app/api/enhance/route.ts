import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = 'nodejs';
export const maxDuration = 60; // 60s max duration

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, role, company, style, type = "bullet" } = body;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing Groq API Key on server." }, { status: 500 });
    }

    let styleInstruction = "";
    switch (style) {
      case "metric":
        styleInstruction = "Make the bullet points highly metric-driven. Emphasize quantifiable achievements, percentages, numbers, and impact.";
        break;
      case "leadership":
        styleInstruction = "Make the bullet points leadership-focused. Emphasize leading teams, mentoring, managing stakeholders, driving strategy, and taking initiative.";
        break;
      case "simple":
        styleInstruction = "Keep the bullet points simple, clear, and concise. Ensure perfect grammar and a professional tone, but avoid overly complex buzzwords.";
        break;
      default:
        styleInstruction = "Make the text professional and impactful.";
    }

    let systemPrompt = "";
    let userMessage = "";

    if (type === "summary") {
      systemPrompt = `You are an expert CV/Resume writer. The user wants to enhance their professional summary for their role as a "${role || 'professional'}".
      
Your task is to rewrite the provided summary to be compelling, concise, and professional. It should act as a strong hook for the CV.

Style Instructions:
${styleInstruction}

IMPORTANT: 
- Return ONLY the rewritten summary text. 
- Do NOT include markdown formatting, introductory text, or concluding text. Just the raw text.
- Do NOT hallucinate entirely new skills or experiences; enhance what is there or infer reasonable context based on the role.`;

      userMessage = `Here is the professional summary to enhance:\n\n${text}`;
    } else {
      systemPrompt = `You are an expert CV/Resume writer. The user wants to enhance a specific bullet point for their experience as a "${role || 'professional'}" at "${company || 'a company'}".
      
Your task is to rewrite the provided single bullet point using the XYZ Formula (Accomplished [X] as measured by [Y], by doing [Z]), or a similar strong action-oriented format.

Style Instructions:
${styleInstruction}

IMPORTANT: 
- Return ONLY the rewritten bullet point text on a single line. 
- Do NOT include markdown formatting, bullet characters (like -, *, or •), introductory text, or concluding text. Just the raw text.
- Do NOT hallucinate entirely new skills or experiences; enhance what is there or infer reasonable context based on the role.`;

      userMessage = `Here is the bullet point to enhance:\n\n${text}`;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from Groq");
    }

    // Clean up response in case it added dashes or bullets
    const cleanedResponse = aiResponse
      .split('\n')
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(line => line.length > 0)
      .join('\n');

    return NextResponse.json({ enhancedText: cleanedResponse }, { status: 200 });

  } catch (error: unknown) {
    console.error("Enhance API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to enhance text" },
      { status: 500 }
    );
  }
}
