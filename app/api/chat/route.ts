import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message as string | undefined;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { error: "message 필드는 필수입니다. 빈 문자열은 허용되지 않습니다." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "서버 환경 변수 GEMINI_API_KEY가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: message.trim(),
      });

      const reply = response.text;

      if (!reply) {
        return NextResponse.json(
          { error: "Gemini로부터 유효한 텍스트 응답을 받지 못했습니다." },
          { status: 500 }
        );
      }

      return NextResponse.json({ reply });
    } catch (genAiError: any) {
      console.error("[Gemini Error Details]", genAiError);

      let errorMessage = "일시적인 오류가 발생했습니다. 다시 시도해주세요.";
      const status = genAiError?.status || 500;
      const rawErrorMessage = genAiError?.message || "";

      // quota exceeded 또는 429 에러 처리
      if (
        status === 429 ||
        rawErrorMessage.toLowerCase().includes("quota")
      ) {
        errorMessage = "현재 Gemini 사용 한도를 초과했습니다. 잠시 후 다시 시도해주세요.";
      }

      // Check if it's explicitly 429, otherwise return 500
      const returnStatus = (status === 429 || errorMessage.includes("한도")) ? 429 : 500;

      return NextResponse.json({ error: errorMessage }, { status: returnStatus });
    }
  } catch (error) {
    console.error("[Gemini API server error]", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "챗봇 답변 생성 중 서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
