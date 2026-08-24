"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Quote a 2-bedroom from SoMa to Oakland.",
  "Can Atlas move a concert grand?",
  "Which cities are live this week?",
];

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Oracle online. I dispatch the Humanoid Movers fleet — quotes, inventory, Atlas/Finch capability, and live corridors. How can I stage your move?",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.body) {
        const json = await res.json().catch(() => null);
        const fallback = json?.text ?? "Oracle is rerouting. Try dispatch@humanoidmovers.com.";
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: fallback };
          return copy;
        });
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Link dropped. The fleet is still live — retry, or write dispatch@humanoidmovers.com.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3 border border-line bg-panel/90 px-3 py-3 backdrop-blur-xl hover:border-cyan sm:px-4"
        aria-expanded={open}
        aria-controls="oracle-panel"
      >
        <span className="dot" />
        <span className="mono text-[11px] tracking-[0.18em] uppercase text-champagne">
          <span className="sm:hidden">{open ? "Close" : "Oracle"}</span>
          <span className="hidden sm:inline">{open ? "Close Oracle" : "Ask Oracle"}</span>
        </span>
      </button>

      {open && (
        <div
          id="oracle-panel"
          className="fixed bottom-20 right-5 z-50 flex h-[min(72vh,560px)] w-[min(92vw,420px)] flex-col border border-line bg-void/95 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="kicker">SpaceXAI · Grok 4.6</p>
              <p className="display mt-1 text-sm tracking-tight">ORACLE</p>
            </div>
            <span className="mono text-[10px] tracking-[0.16em] text-cyan">LIVE</span>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <p className="mono mb-1 text-[10px] tracking-[0.16em] uppercase text-mute">
                  {m.role === "user" ? "You" : "Oracle"}
                </p>
                <p
                  className={`inline-block max-w-[92%] whitespace-pre-wrap px-3 py-2 text-[14px] leading-relaxed ${
                    m.role === "user" ? "border border-line text-champagne" : "bg-elev text-fog"
                  }`}
                >
                  {m.content || (busy ? "…" : "")}
                </p>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="mono border border-line px-2 py-1 text-[10px] tracking-wide text-fog hover:border-cyan hover:text-cyan"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex border-t border-line"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a move…"
              className="field border-0 bg-transparent"
              aria-label="Message Oracle"
            />
            <button type="submit" className="btn btn-primary rounded-none px-5" disabled={busy}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
