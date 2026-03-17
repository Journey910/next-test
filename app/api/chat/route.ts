import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

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

    // resume.txt 파일 읽기
    const resumePath = path.join(process.cwd(), "data", "resume.txt");
    const resumeText = fs.readFileSync(resumePath, "utf-8");

    // Gemini에 보낼 프롬프트 만들기
    const prompt = `
너는 사용자의 포트폴리오 챗봇이다.

아래 규칙을 반드시 지켜라:
1. 반드시 [이력서 내용]에 근거해서만 답변한다.
2. 이력서에 없는 내용은 추측하거나 지어내지 않는다.
3. 정보가 없으면 "이력서 기준으로는 확인되지 않습니다."라고 답한다.
4. 답변은 자연스럽고 간결한 한국어로 작성한다.
5. 사용자가 경력, 강점, 기술, 업무 경험, 이직 준비와 관련된 질문을 하면 이력서 내용을 우선 참고한다.
6. 마크다운 기호(**, ##, -, 백틱 등)는 사용하지 말고 일반 텍스트로 답변한다.

[이력서 내용]
${resumeText}

[사용자 질문]
${message.trim()}
`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
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

      if (
        status === 429 ||
        rawErrorMessage.toLowerCase().includes("quota")
      ) {
        errorMessage = "현재 Gemini 사용 한도를 초과했습니다. 잠시 후 다시 시도해주세요.";
      }

      const returnStatus =
        status === 429 || errorMessage.includes("한도") ? 429 : 500;

      return NextResponse.json(
        { error: errorMessage },
        { status: returnStatus }
      );
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