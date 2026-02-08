"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, RotateCcw, Info, ArrowUp } from "lucide-react";
import { useChat } from "./ChatProvider";
import ChatMessage from "./ChatMessage";
import { getSuggestions, getFollowUpSuggestions } from "@/data/chatSuggestions";

interface Message {
  role: "user" | "assistant";
  content: string;
  quotedText?: string;
}

// MUI SubdirectoryArrowRight icon — matches source
function SubdirectoryArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className={className}>
      <path d="m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9z" />
    </svg>
  );
}

export default function ChatSidebar() {
  const {
    isChatOpen,
    setIsChatOpen,
    pageContext,
    selectedText,
    setSelectedText,
    inputRef,
  } = useChat();

  const welcomeMessages = [
    "Hey, ask away.",
    "Hey there, I'm ArunLM.",
    "Ask me anything.",
    "What would you like to know?",
    "Welcome to ArunLM.",
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [welcomeHeading, setWelcomeHeading] = useState(
    () => welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
  );
  const [responseId, setResponseId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Get page-specific suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);
  useEffect(() => {
    setSuggestions(getSuggestions(pageContext));
  }, [pageContext]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Focus input when opening
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen, inputRef]);

  // Focus input when selected text arrives
  useEffect(() => {
    if (selectedText && isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [selectedText, isChatOpen, inputRef]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setIsStreaming(false);
    setSelectedText("");
    setResponseId(null);
    setSuggestions(getSuggestions(pageContext));
    setWelcomeHeading(
      welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
    );
  }, [pageContext, setSelectedText, welcomeMessages]);

  const sendMessage = useCallback(
    async (content: string, quotedText?: string) => {
      if (!content.trim() || isStreaming) return;

      const userMessage: Message = {
        role: "user",
        content: content.trim(),
        quotedText,
      };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setSelectedText("");
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content.trim(),
            responseId,
            pageContext: { page: pageContext },
            context: quotedText || undefined,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 429) {
            throw new Error("Sorry, I can't afford that many requests at once. Please come back soon... maybe in 30 min");
          } else if (res.status === 500) {
            throw new Error("There's a server configuration issue. Please check the console for more details.");
          } else {
            throw new Error("Sorry, I'm having trouble connecting right now. Please try again later!");
          }
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let assistantContent = "";
        let buffer = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              // Capture responseId from first event
              if (parsed.responseId && !parsed.content) {
                setResponseId(parsed.responseId);
              } else if (parsed.done) {
                // Stream complete
              } else if (parsed.content) {
                assistantContent += parsed.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed lines
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          const errorMessage = (err as Error).message.startsWith("Sorry,") || (err as Error).message.startsWith("There's")
            ? (err as Error).message
            : "Sorry, I'm having trouble connecting right now. Please try again later!";
          setMessages((prev) => [
            ...prev,
            ...(prev[prev.length - 1]?.role === "assistant" &&
            !prev[prev.length - 1]?.content
              ? []
              : []),
            {
              role: "assistant" as const,
              content: errorMessage,
            },
          ]);
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming, pageContext, setSelectedText]
  );

  const handleSubmit = useCallback(() => {
    const quoted = selectedText || undefined;
    sendMessage(input, quoted);
  }, [input, selectedText, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
    },
    [sendMessage]
  );

  const hasMessages = messages.length > 0;

  // Follow-up suggestions for the last assistant message (keyword-based)
  const followUpSuggestions =
    !isStreaming && hasMessages && messages[messages.length - 1]?.role === "assistant"
      ? getFollowUpSuggestions(
          messages[messages.length - 1].content,
          messages.map((m) => m.content)
        )
      : [];

  return (
    <AnimatePresence>
      {isChatOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            className="md:hidden fixed inset-0 bg-background z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsChatOpen(false)}
          />

          {/* Desktop sidebar */}
          <motion.div
            data-chat-sidebar
            className="hidden md:flex flex-col h-screen bg-foreground-light/5 border-l border-foreground/10 overflow-hidden relative"
            initial={{ width: 0 }}
            animate={{ width: 384 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ minWidth: 0 }}
          >
            <SidebarContent
              messages={messages}
              input={input}
              setInput={setInput}
              isStreaming={isStreaming}
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              scrollRef={scrollRef}
              inputRef={inputRef}
              hasMessages={hasMessages}
              suggestions={suggestions}
              followUpSuggestions={followUpSuggestions}
              selectedText={selectedText}
              welcomeHeading={welcomeHeading}
              onClearSelection={() => setSelectedText("")}
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
              onSuggestionClick={handleSuggestionClick}
              onReset={reset}
              onClose={() => setIsChatOpen(false)}
            />
          </motion.div>

          {/* Mobile bottom sheet */}
          <motion.div
            data-chat-sidebar
            className="md:hidden fixed inset-x-0 bottom-0 z-[60] bg-foreground-light/5 border-t border-foreground/10 flex flex-col overflow-hidden"
            style={{ height: "100vh", maxHeight: "100vh", overscrollBehavior: "contain" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <SidebarContent
              messages={messages}
              input={input}
              setInput={setInput}
              isStreaming={isStreaming}
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              scrollRef={scrollRef}
              inputRef={inputRef}
              hasMessages={hasMessages}
              suggestions={suggestions}
              followUpSuggestions={followUpSuggestions}
              selectedText={selectedText}
              welcomeHeading={welcomeHeading}
              onClearSelection={() => setSelectedText("")}
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
              onSuggestionClick={handleSuggestionClick}
              onReset={reset}
              onClose={() => setIsChatOpen(false)}
              mobile
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarContent({
  messages,
  input,
  setInput,
  isStreaming,
  showInfo,
  setShowInfo,
  scrollRef,
  inputRef,
  hasMessages,
  suggestions,
  followUpSuggestions,
  selectedText,
  welcomeHeading,
  onClearSelection,
  onSubmit,
  onKeyDown,
  onSuggestionClick,
  onReset,
  onClose,
  mobile,
}: {
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  isStreaming: boolean;
  showInfo: boolean;
  setShowInfo: (v: boolean) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  hasMessages: boolean;
  suggestions: string[];
  followUpSuggestions: string[];
  selectedText: string;
  welcomeHeading: string;
  onClearSelection: () => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSuggestionClick: (s: string) => void;
  onReset: () => void;
  onClose: () => void;
  mobile?: boolean;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Mobile drag handle */}
      {mobile && (
        <div className="flex justify-center pt-2 pb-0">
          <div className="w-8 h-1 rounded-full bg-foreground/20" />
        </div>
      )}

      {/* Header — p-4 with ::after pseudo border */}
      <div className="p-4 flex justify-between relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-foreground/10">
        <div className="flex p-1 gap-2 items-center relative h-[32px]">
          <h4 className="text-lg font-medium !text-foreground !text-[15px] font-[family-name:var(--font-geist-mono)] uppercase">
            ArunLM
          </h4>
          <div className="relative">
            <button
              onClick={() => setShowInfo(!showInfo)}
              aria-label="Info about ArunLM"
            >
              <Info size={16} className="cursor-pointer mt-1.5 opacity-50 hover:opacity-100 transition-all duration-200" />
            </button>
            {showInfo && (
              <div className="absolute bg-background border border-foreground/10 z-50 top-9 left-0 min-w-[320px] p-3">
                <div className="absolute -top-1 left-[88px] w-2 h-2 bg-background border-l border-t border-foreground/10 rotate-45" />
                <p className="!text-sm text-foreground/70 leading-relaxed">
                  ArunLM is an AI chatbot. May contain hallucinations.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 w-7 h-7 hover:bg-foreground/10 rounded-full hover:opacity-50 transition-all duration-200"
            aria-label="Reset chat"
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-7 h-7 hover:bg-foreground/10 rounded-full hover:opacity-50 transition-all duration-200"
            aria-label="Close chat"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex flex-col overflow-y-auto p-4 gap-4 h-full chat-scrollbar">
        <div className="space-y-4">
          {/* Welcome state */}
          {!hasMessages && (
            <div className="flex flex-col justify-end flex-1 min-h-[400px] space-y-4">
              <h3 className="text-lg font-medium !text-foreground font-serif">
                {welcomeHeading}
              </h3>
              <div className="w-full space-y-2">
                <div className="grid gap-0.5">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => onSuggestionClick(s)}
                      className="text-left p-2 -mx-2 hover:bg-accent/5 transition-colors text-sm text-foreground/80 flex items-start gap-1 group hover:text-accent rounded-md"
                    >
                      <SubdirectoryArrowRight className="text-foreground/80 mt-[0.25px] shrink-0 group-hover:text-accent" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              role={msg.role}
              content={msg.content}
              quotedText={msg.quotedText}
              isStreaming={
                isStreaming && i === messages.length - 1 && msg.role === "assistant" && msg.content.length > 0
              }
              suggestions={
                i === messages.length - 1 && msg.role === "assistant" && !isStreaming
                  ? followUpSuggestions
                  : undefined
              }
              onSuggestionClick={onSuggestionClick}
            />
          ))}

          {/* Typing indicator */}
          {isStreaming && messages[messages.length - 1]?.role === "user" && (
            <div className="flex items-center gap-1.5 py-2">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.1s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 pt-0">
        {/* Quoted text preview */}
        {selectedText && (
          <div className="flex items-center gap-3 border border-foreground/10 border-b-0 bg-foreground/[0.03] px-3 py-2.5">
            <span className="text-foreground-light/30 text-3xl font-serif leading-none shrink-0">&ldquo;</span>
            <span className="flex-1 text-sm text-foreground-light truncate">
              {selectedText}
            </span>
            <button
              onClick={onClearSelection}
              className="p-0.5 text-foreground-light/40 hover:text-foreground transition-colors shrink-0"
              aria-label="Clear quote"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <div className="flex flex-col p-2 gap-2 border border-foreground/10 bg-background">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={selectedText ? "Ask about this quote..." : "Ask about Karthick..."}
              className="flex-1 px-2 py-1 text-foreground placeholder:text-foreground/50 focus:outline-none disabled:opacity-50 bg-transparent resize-none min-h-[24px] max-h-[120px] leading-normal"
              style={{ fontSize: "16px" }}
              rows={1}
            />
            <button
              onClick={onSubmit}
              disabled={!input.trim() || isStreaming}
              className="w-8 h-8 flex items-center justify-center bg-accent/10 rounded-full text-accent hover:bg-accent/5 disabled:opacity-50 disabled:bg-foreground/0 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
