export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Portfolio
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              안녕하세요.
              <br />
              포트폴리오와 챗봇 데모를 만드는 중입니다.
            </h1>
            <p className="mb-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Next.js와 Cursor를 활용해 웹사이트를 만들고 있습니다.
              깔끔한 포트폴리오 화면과 챗봇 UI를 함께 구성한 데모 페이지입니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400">
                프로젝트 보기
              </button>
              <button className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800">
                연락하기
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">챗봇 데모</h2>
                <p className="text-sm text-slate-400">
                  포트폴리오 안에 들어가는 미니 챗봇 UI
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                Demo
              </span>
            </div>

            <div className="space-y-4 rounded-2xl bg-slate-950 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold">
                  AI
                </div>
                <div className="max-w-[80%] rounded-2xl bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-100">
                  안녕하세요. 포트폴리오 안에 들어갈 챗봇 데모 화면입니다.
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-indigo-500 px-4 py-3 text-sm leading-6 text-white">
                  이 화면을 더 세련되게 만들 수 있나요?
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold">
                  AI
                </div>
                <div className="max-w-[80%] rounded-2xl bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-100">
                  네. 말풍선, 입력창, 버튼, 여백과 색감을 다듬으면 더 제품처럼 보이게 만들 수 있습니다.
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="메시지를 입력하세요"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button className="rounded-xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400">
                전송
              </button>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">강점</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="mb-2 font-semibold">기획력</h3>
              <p className="text-sm leading-6 text-slate-400">
                구조를 이해하고 필요한 화면을 정리하는 데 강점이 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="mb-2 font-semibold">학습력</h3>
              <p className="text-sm leading-6 text-slate-400">
                새로운 도구를 빠르게 익히고 반복해서 적용할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="mb-2 font-semibold">실행력</h3>
              <p className="text-sm leading-6 text-slate-400">
                직접 수정하고 테스트하며 결과물을 만드는 데 집중합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="mb-2 font-semibold">성장중</h3>
              <p className="text-sm leading-6 text-slate-400">
                Next.js, GitHub, Vercel 흐름을 익히며 포트폴리오를 만들고 있습니다.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}