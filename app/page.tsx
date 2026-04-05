"use client";

import { useState } from "react";

const skillTags = [
  "Next.js",
  "React",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Git",
  "GitHub",
  "Vercel",
];

const portfolioExampleQuestions = [
  "어떤 분야의 경험이 있나요?",
  "실무에서 강점으로 보이는 부분은 무엇인가요?",
  "어떤 기술로 포트폴리오를 만들었나요?",
  "대표 프로젝트를 설명해주세요.",
  "협업이나 커뮤니케이션 역량은 어떤가요?",
];

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

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

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

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err: unknown) {
      console.error(err);
      setError("일시적인 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/90 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(99,102,241,0.08),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 top-32 h-[28rem] w-[28rem] rounded-full bg-sky-100/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-1/3 h-72 w-72 rounded-full bg-violet-100/40 blur-3xl"
        aria-hidden
      />

      {/* Portfolio sections */}
      <div className="relative mx-auto max-w-6xl space-y-12 px-4 pb-20 sm:space-y-16 sm:px-6 sm:pb-24">
        <header className="mx-auto max-w-4xl pt-8 text-center sm:pt-10 md:pt-12">
          <p className="mb-5 inline-flex items-center rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-sm sm:text-xs">
            Personal Portfolio
          </p>
          <h1 className="mx-auto max-w-4xl text-balance text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:leading-tight">
            <span className="block">
              안녕하세요,{" "}
              <span className="text-violet-700">클라우드 엔지니어</span>를
            </span>
            <span className="mt-1 block sm:mt-2">
              목표로 꾸준히 성장하고 있습니다.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            실무 경험을 바탕으로 문제를 정리하고, 웹 기술과 AI 프로젝트를 직접
            구현하며 역량을 키우고 있습니다.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <nav
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            aria-label="페이지 내 이동"
          >
            <a
              href="#projects"
              className="inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
            >
              프로젝트 보기
            </a>
            <a
              href="#skills"
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-200 hover:text-violet-800"
            >
              기술 스택 보기
            </a>
            <a
              href="#contact"
              className="inline-flex rounded-2xl border border-transparent px-6 py-3 text-sm font-semibold text-violet-700 underline-offset-4 transition hover:underline"
            >
              연락하기
            </a>
          </nav>
          <div
            id="contact"
            className="scroll-mt-24 flex w-full justify-center lg:justify-end"
          >
            <div className="shrink-0 rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-sm sm:max-w-xs sm:px-4 sm:py-3.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-violet-600">
                  Contact
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  연락처
                </span>
              </div>
              <a
                href="mailto:subinyouae@naver.com"
                className="mt-1.5 block break-all text-xs font-medium text-violet-700 underline-offset-2 transition hover:underline"
              >
                subinyouae@naver.com
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <article
            id="career"
            className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm sm:p-10"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Career / Experience
            </h3>
            <p className="mt-4 text-lg font-bold text-slate-900">
              실무 커뮤니케이션과 운영 경험
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              <li className="flex gap-3 border-l-2 border-violet-200 pl-4">
                <span>
                  <strong className="font-semibold text-slate-800">
                    제약·헬스케어 인근 업계
                  </strong>
                  에서 현장 이슈를 정리하고, 일정·품질 관점에서 이해관계자와
                  소통한 경험이 있습니다.
                </span>
              </li>
              <li className="flex gap-3 border-l-2 border-violet-200 pl-4">
                <span>
                  <strong className="font-semibold text-slate-800">
                    이커머스·유통 맥락
                  </strong>
                  의 업무를 이해하며, 운영·고객 응대와 협업 프로세스에 익숙합니다.
                </span>
              </li>
              <li className="flex gap-3 border-l-2 border-violet-200 pl-4">
                <span>
                  보고·공유 습관을 바탕으로{" "}
                  <strong className="font-semibold text-slate-800">
                    문서화와 피드백 반영
                  </strong>
                  에 익숙합니다.
                </span>
              </li>
            </ul>
          </article>

          <article
            id="skills"
            className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm sm:p-10"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Skills
            </h3>
            <p className="mt-4 text-lg font-bold text-slate-900">
              웹 프론트엔드 · 협업 도구
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              포트폴리오와 개인 프로젝트에서 아래 기술을 사용해 왔습니다.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {skillTags.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-slate-500">
              AWS, 네트워크, Linux 등 인프라·보안 기초도 학습하며 범위를 넓히고
              있습니다.
            </p>
          </article>
        </div>

        <article
          id="projects"
          className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm sm:p-10 lg:p-12"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Projects
          </h3>
          <p className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
            대표 프로젝트
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 transition hover:border-violet-100 hover:bg-white">
              <h4 className="font-semibold text-slate-900">
                개인 포트폴리오 웹사이트
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Next.js App Router로 구성한 반응형 메인 페이지입니다. 섹션형
                레이아웃과 밝은 톤의 UI로 프로필을 전달하는 데 초점을 두었습니다.
              </p>
              <p className="mt-4 text-xs font-medium text-violet-700">
                Next.js · React · Tailwind CSS · Vercel
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 transition hover:border-violet-100 hover:bg-white">
              <h4 className="font-semibold text-slate-900">
                이력서 기반 Gemini 연동
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                서버 API에서 Gemini를 호출해 이력서 텍스트 범위 안에서만 답변하도록
                구성한 보조 Q&A 기능입니다. (필요 시 대화 로그 저장 구조 확장 가능)
              </p>
              <p className="mt-4 text-xs font-medium text-violet-700">
                Next.js API Route · Gemini API · TypeScript
              </p>
            </div>
          </div>
        </article>

        <section
          id="resume-qa"
          className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white to-violet-50/40 px-6 py-10 shadow-sm sm:px-10 sm:py-12"
          aria-labelledby="resume-qa-heading"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600 sm:text-xs">
              Portfolio Q&A Chatbot
            </p>
            <h2
              id="resume-qa-heading"
              className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
            >
              Ask About Me
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              제 포트폴리오를 더 빠르게 둘러볼 수 있도록 준비한 Q&A
              공간입니다. 경력, 실무 경험, 기술 스택, 프로젝트, 성장 과정에 대해
              궁금한 점을 질문해 보세요.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-white/90 p-4 sm:p-5">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                이렇게 물어보셔도 좋아요
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-1 sm:gap-2.5">
                {portfolioExampleQuestions.map((q) => (
                  <li
                    key={q}
                    className="flex gap-2 text-sm leading-snug text-slate-700"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400"
                      aria-hidden
                    />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
              <div className="min-h-[120px] space-y-5 text-sm leading-relaxed sm:min-h-[140px]">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={
                      m.role === "user"
                        ? "rounded-xl border border-violet-100 bg-violet-50/50 px-4 py-3"
                        : "rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                    }
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {m.role === "user" ? "질문" : "답변"}
                    </p>
                    <p
                      className={`mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed ${m.role === "user" ? "text-slate-800" : "text-slate-700"}`}
                    >
                      {m.content}
                    </p>
                  </div>
                ))}
                {isLoading && (
                  <p className="text-sm text-slate-500">답변을 준비하고 있어요…</p>
                )}
                {error && (
                  <p className="rounded-xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-800">
                    {error}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-stretch">
                <label className="sr-only" htmlFor="resume-question">
                  질문 입력
                </label>
                <textarea
                  id="resume-question"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={2}
                  placeholder="궁금한 질문을 입력해 주세요. 예: 어떤 경험과 강점을 가지고 있나요?"
                  className="min-h-[4.5rem] w-full flex-1 resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-500/15"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="inline-flex min-w-[5.5rem] shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none sm:self-end"
                >
                  {isLoading ? "…" : "Ask"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-200/90 bg-white/80 py-8 text-center text-xs text-slate-500 sm:text-sm">
        <p>© {new Date().getFullYear()} 김지현 · 개인 포트폴리오</p>
      </footer>
    </main>
  );
}
