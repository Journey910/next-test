export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-slate-950/60 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[80vh]">
        {/* Header */}
        <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Beginner Chatbot</h1>
            <p className="text-sm text-slate-400">
              Ask anything and imagine an AI answering here.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Demo
          </span>
        </header>

        {/* Chat Area */}
        <section className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Bot message */}
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold">
              AI
            </div>
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3 text-sm leading-relaxed shadow">
              Hi! I&apos;m your practice chatbot. Type a message below to imagine how I would
              respond. This UI is kept simple for beginners learning React and Next.js.
            </div>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-indigo-500 px-4 py-3 text-sm leading-relaxed shadow text-white">
              Can you help me build a modern chatbot interface?
            </div>
          </div>

          {/* Another bot message */}
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold">
              AI
            </div>
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3 text-sm leading-relaxed shadow">
              Absolutely! This page is a static example of a chat layout: header at the top,
              messages in the center, and an input with a send button at the bottom.
            </div>
          </div>
        </section>

        {/* Input Area */}
        <form className="border-t border-slate-800 px-4 py-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-400 active:bg-indigo-500/90 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}