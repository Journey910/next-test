"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    try {
      setIsLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 6) 서버가 내려준 error 메시지를 그대로 화면에 노출
        const serverError =
          (data && typeof data.error === "string" && data.error) ||
          "요청 중 오류가 발생했습니다.";
        setError(serverError);
        return;
      }

      const reply =
        data.reply && typeof data.reply === "string"
          ? data.reply
          : "답변을 가져오지 못했습니다.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (err: any) {
      console.error(err);
      // 네트워크 오류 등 예외적인 경우에만 여기로 들어옵니다.
      setError("일시적인 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 sm:text-sm">
              Portfolio
            </p>
            <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              안녕하세요.
              <br />
              IT 보안 전문가를 꿈꾸는 김지현입니다.
            </h1>
            <p className="mb-8 max-w-xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg">
              AWS 기반 인프라와 보안 구조에 관심을 가지고 공부하고 있습니다.
              네트워크, 리눅스, 시스템 구조를 이해하며 안전하고 효율적인 환경을 만드는 것을 목표로 합니다.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 sm:px-5 sm:py-3">
                프로젝트 확인
              </button>
              <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 sm:px-5 sm:py-3">
                이메일 문의
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold sm:text-xl">포트폴리오 챗봇</h2>
                <p className="text-xs text-slate-400 sm:text-sm">
                제 프로젝트, 기술 스택, 학습 내용에 대해 답변하는 챗봇입니다.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-slate-950 p-3 sm:space-y-4 sm:p-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold sm:h-10 sm:w-10 sm:text-sm">
                  AI
                </div>
                <div className="max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-xs leading-5 text-slate-100 sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                안녕하세요. 포트폴리오 방문을 환영합니다. 궁금한 내용을 질문해보세요.
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-indigo-500 px-3 py-2 text-xs leading-5 text-white sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                어떤 기술을 사용했나요?
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold sm:h-10 sm:w-10 sm:text-sm">
                  AI
                </div>
                <div className="max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-xs leading-5 text-slate-100 sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                Next.js, React, Vercel, Gemini API를 활용해 포트폴리오와 챗봇 기능을 구현했습니다.
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="사용한 기술 스택은 무엇인가요?"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-500 sm:px-4 sm:py-3 sm:text-sm"
              />
              <button className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 sm:px-5 sm:py-3">
                전송
              </button>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">강점</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
              <h3 className="mb-2 text-sm font-semibold sm:text-base">기획력</h3>
              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                구조를 이해하고 필요한 화면을 정리하는 데 강점이 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
              <h3 className="mb-2 text-sm font-semibold sm:text-base">학습력</h3>
              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                새로운 도구를 빠르게 익히고 반복해서 적용할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
              <h3 className="mb-2 text-sm font-semibold sm:text-base">실행력</h3>
              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                직접 수정하고 테스트하며 결과물을 만드는 데 집중합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
              <h3 className="mb-2 text-sm font-semibold sm:text-base">성장중</h3>
              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                Next.js, GitHub, Vercel 흐름을 익히며 포트폴리오를 만들고 있습니다.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Gemini 챗봇 섹션 */}
      <section className="border-t border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400 sm:text-sm">
                Gemini Chatbot
              </p>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                포트폴리오 전용 Gemini 챗봇
              </h2>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                이 페이지의 소개나 Next.js, Gemini 사용법에 대해 자유롭게 질문해 보세요.
              </p>
            </div>
            <span className="hidden rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
              실시간 Gemini 응답
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
            <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/60">
              <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold sm:h-9 sm:w-9">
                    AI
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-100 sm:text-sm">
                      Gemini 포트폴리오 챗봇
                    </p>
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      이 페이지와 관련된 내용을 중심으로 대화합니다.
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-medium text-emerald-300 sm:text-xs">
                  Online
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-xs leading-5 text-slate-100 sm:px-4 sm:py-4 sm:text-sm sm:leading-6">
                {messages.length === 0 && (
                  <div className="rounded-2xl bg-slate-900/80 px-3 py-3 text-xs text-slate-400 sm:px-4 sm:py-4 sm:text-sm">
                    간단히 인사하거나, 이 포트폴리오를 어떻게 만들었는지 물어보세요.
                    <br />
                    예시:{" "}
                    <span className="text-slate-200">
                      &quot;이 페이지는 어떤 기술로 만들어졌나요?&quot;
                    </span>
                  </div>
                )}

                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${m.role === "user"
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-800 text-slate-100"
                        }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500 delay-100" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500 delay-200" />
                    <span className="ml-1">생각하는 중...</span>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200 sm:px-4 sm:py-3 sm:text-sm">
                    {error}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800/80 bg-slate-950/60 px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex items-end gap-2 sm:gap-3">
                  <div className="flex-1 space-y-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      rows={2}
                      placeholder="질문을 입력하고 Enter 또는 전송 버튼을 눌러주세요."
                      className="w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:px-4 sm:py-3 sm:text-sm"
                    />
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      개인 정보나 민감한 내용은 입력하지 마세요.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="mb-0.5 inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    {isLoading ? "전송 중..." : "전송"}
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden flex-col gap-4 lg:flex">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-100">
                  챗봇 활용 팁
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li>이 포트폴리오 페이지에 사용된 기술에 대해 물어보세요.</li>
                  <li>Next.js, Gemini API, Cursor 워크플로에 대해 질문해 보세요.</li>
                  <li>포트폴리오 개선 아이디어나 섹션 구성 피드백을 요청해 보세요.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-500/15 via-slate-900 to-fuchsia-500/15 p-4 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  Under the hood
                </p>
                <p className="mt-2 text-xs text-slate-200">
                  이 챗봇은 Next.js App Router 기반 API 라우트와 Gemini 모델을 사용해
                  동작합니다. 클라이언트에서 입력을 받아 `/api/chat`으로 전송하고,
                  응답을 실시간으로 화면에 렌더링합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}