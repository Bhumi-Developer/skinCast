import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../utils/axios";

const STORAGE_KEY = "skincast_chat_messages_v1";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      return [
        {
          role: "assistant",
          content:
            "Hi! I'm SkinAI. Ask me about skincare, home remedies, or today's recommendations!",
        },
      ];
    } catch {
      return [
        {
          role: "assistant",
          content:
            "Hi! I'm SkinAI. Ask me about skincare, home remedies, or today's recommendations!",
        },
      ];
    }
  });

  const listRef = useRef(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
    } catch {
      // ignore storage failures
    }
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    setInput("");
    setLoading(true);

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);

    try {
      const res = await api.post("/api/chat", {
        messages: nextMessages.slice(-20),
      });

      const reply = res?.data?.message || "Sorry, I couldn’t generate a reply.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Chat request failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) send();
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-8 z-[60]">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-primary text-white p-4 rounded-full shadow-xl hover:bg-primary-light transition-all animate-bounce"
            aria-label="Open chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
        )}

        {open && (
          <div className="w-80 sm:w-96 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-primary-dull/40 overflow-hidden flex flex-col">
            <div className="bg-primary p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <span className="font-semibold">SkinAI</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setMessages([
                      {
                        role: "assistant",
                        content:
                          "Hi! I'm SkinAI. Ask me about skincare, home remedies, or today's recommendations!",
                      },
                    ]);
                    try {
                      localStorage.removeItem(STORAGE_KEY);
                    } catch {
                      // ignore
                    }
                  }}
                  className="text-white/90 hover:text-primary-dull text-sm"
                  aria-label="Clear chat"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-primary-dull"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              ref={listRef}
              className="h-[500px] overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-primary-dull/10 to-white/50 scrollbar-hide"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-primary-dull/30"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-sm text-gray-600">Thinking…</div>
              )}
              {error && <div className="text-sm text-red-600">{error}</div>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (canSend) send();
              }}
              className="p-3 border-t border-primary-dull/30 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 p-2 bg-white/60 rounded-xl border border-primary-dull/40 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-light transition disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatbotWidget;

