import { useRef, useState, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { getMentorReply, mentorWelcome } from "../lib/chatMentor";
import { useStudent } from "../context/StudentContext";
import { Disclaimer } from "../components/Disclaimer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  "Which career is best for me?",
  "Engineering or design?",
  "What can I do after Commerce?",
  "How do I become a data scientist?",
  "Which stream after 10th?",
];

export function ChatPage() {
  const { profile } = useStudent();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: mentorWelcome },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    const reply = getMentorReply(trimmed, { profile });
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    }, 400);
    setInput("");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-10" style={{ minHeight: "calc(100dvh - 8rem)" }}>
      <div className="mb-4">
        <h1 className="font-display text-3xl font-bold text-slate-900">AI Chat Mentor</h1>
        <p className="mt-1 text-slate-500">
          Friendly career counselor — practical answers for Indian students.
        </p>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {quickPrompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => send(p)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:border-brand-300 hover:bg-brand-50"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white card-shadow">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" style={{ maxHeight: "50vh" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "user" ? "bg-brand-500 text-white" : "bg-mint-400/30 text-brand-700"
                }`}
              >
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-500 text-white"
                    : "bg-slate-50 text-slate-800 whitespace-pre-wrap"
                }`}
              >
                {msg.content.split("**").map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2 border-t border-slate-100 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your career question..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          <button
            type="submit"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="mt-4">
        <Disclaimer compact />
      </div>
    </div>
  );
}
