import { GoogleGenAI } from "@google/genai";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message as string | undefined;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { error: "message 필드는 필수입니다." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "서버 환경 변수 GEMINI_API_KEY가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenAI({ apiKey });

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const reply =
      result.candidates?.[0]?.content?.parts
        ?.map((part: any) => part.text ?? "")
        .join("") ?? "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      { error: "챗봇 답변 생성 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}