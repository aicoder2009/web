"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, RotateCcw, Info, ArrowUp, ArrowDown } from "lucide-react";
import { useChat } from "./ChatProvider";
import ChatMessage from "./ChatMessage";
import { getSuggestions, getFollowUpSuggestions } from "@/data/chatSuggestions";
import ChainOfThought from "./ChainOfThought";

const MAX_INPUT_CHARS = 1333; // ~333 tokens

interface Message {
  role: "user" | "assistant";
  content: string;
  quotedText?: string;
  feedback?: "up" | "down" | null;
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
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
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
      if (!content.trim() || isStreaming || dailyLimitReached) return;
      if (content.length > MAX_INPUT_CHARS) return;

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
        // Collect feedback from the most recent assistant message
        const lastAssistant = [...messages].reverse().find(
          (m) => m.role === "assistant" && m.feedback
        );
        const pendingFeedback = lastAssistant?.feedback
          ? { type: lastAssistant.feedback, message: lastAssistant.content.slice(0, 200) }
          : undefined;

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content.trim(),
            responseId,
            pageContext: { page: pageContext },
            context: quotedText || undefined,
            feedback: pendingFeedback,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 429) {
            const data = await res.json().catch(() => null);
            if (data?.error === "daily_limit_reached") {
              setDailyLimitReached(true);
              throw new Error(data.message);
            }
            throw new Error("Sorry, I can't afford that many requests at once. Please come back soon... maybe in 30 min");
          } else if (res.status === 400) {
            const data = await res.json().catch(() => null);
            if (data?.error === "prompt_too_long") {
              throw new Error(data.message);
            }
            throw new Error("Invalid request. Please try again.");
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
    [messages, isStreaming, dailyLimitReached, pageContext, setSelectedText]
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

  const handleMessageFeedback = useCallback(
    (index: number, type: "up" | "down" | null) => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], feedback: type };
        return updated;
      });
    },
    []
  );

  const hasMessages = messages.length > 0;

  // Follow-up suggestions for the last assistant message (keyword-based)
  // Memoize so they don't reshuffle on every keystroke
  const lastAssistantMsg =
    hasMessages && messages[messages.length - 1]?.role === "assistant"
      ? messages[messages.length - 1].content
      : null;

  const followUpSuggestions = useMemo(() => {
    if (isStreaming || !lastAssistantMsg) return [];
    return getFollowUpSuggestions(
      lastAssistantMsg,
      messages.map((m) => m.content)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStreaming, lastAssistantMsg]);

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
              dailyLimitReached={dailyLimitReached}
              onClearSelection={() => setSelectedText("")}
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
              onSuggestionClick={handleSuggestionClick}
              onMessageFeedback={handleMessageFeedback}
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
              dailyLimitReached={dailyLimitReached}
              onClearSelection={() => setSelectedText("")}
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
              onSuggestionClick={handleSuggestionClick}
              onMessageFeedback={handleMessageFeedback}
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
  dailyLimitReached,
  onClearSelection,
  onSubmit,
  onKeyDown,
  onSuggestionClick,
  onMessageFeedback,
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
  dailyLimitReached: boolean;
  onClearSelection: () => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSuggestionClick: (s: string) => void;
  onMessageFeedback: (index: number, type: "up" | "down" | null) => void;
  onReset: () => void;
  onClose: () => void;
  mobile?: boolean;
}) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Track scroll position to show/hide scroll-to-bottom button
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const isNearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
      setShowScrollButton(!isNearBottom);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [scrollRef]);

  const inputTooLong = input.length > MAX_INPUT_CHARS;
  const inputNearLimit = input.length > MAX_INPUT_CHARS * 0.85;

  // Auto-resize textarea
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      const ta = e.target;
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    },
    [setInput]
  );

  // Reset textarea height when input is cleared (after send)
  useEffect(() => {
    if (!input && inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  }, [input, inputRef]);

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
              <div className="absolute bg-background border border-foreground/10 z-50 top-7 -left-2 min-w-[280px] p-3">
                <div className="absolute -top-1 left-3 w-2 h-2 bg-background border-l border-t border-foreground/10 rotate-45" />
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
      <div className="relative flex-1 overflow-hidden">
        <div ref={scrollRef} className="flex flex-col overflow-y-auto p-4 gap-4 h-full chat-scrollbar">
          <div className="flex flex-col flex-1 space-y-4">
            {/* Welcome state — pushed to bottom like source */}
            {!hasMessages && (
              <div className="flex flex-col justify-end flex-1 space-y-4">
                <h3 className="text-[22px] font-medium !text-foreground font-serif">
                  {welcomeHeading}
                </h3>
                <div className="w-full">
                  <div className="grid gap-1">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => onSuggestionClick(s)}
                        className="text-left py-2.5 -mx-2 px-2 hover:bg-accent/5 transition-colors text-[15px] text-foreground/70 flex items-start gap-1.5 group hover:text-accent rounded-md"
                      >
                        <SubdirectoryArrowRight className="text-foreground/70 mt-[1px] shrink-0 group-hover:text-accent" />
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
                onFeedback={msg.role === "assistant" ? (type) => onMessageFeedback(i, type) : undefined}
              />
            ))}

            {/* Chain of thought: visible while streaming and no content yet */}
            <ChainOfThought
              isVisible={
                isStreaming &&
                (messages[messages.length - 1]?.role === "user" ||
                  (messages[messages.length - 1]?.role === "assistant" &&
                    !messages[messages.length - 1]?.content))
              }
            />
          </div>
        </div>

        {/* Scroll-to-bottom button */}
        <button
          onClick={scrollToBottom}
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center bg-accent/10 rounded-full text-accent hover:bg-accent/15 transition-all duration-200 ${
            showScrollButton ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll to bottom"
        >
          <ArrowDown size={16} />
        </button>
      </div>

      {/* Input area */}
      <div className="p-4 pt-0">
        {/* Daily limit notice */}
        {dailyLimitReached && (
          <div className="mb-2 px-3 py-2 bg-foreground/5 border border-foreground/10 text-sm text-foreground/70 leading-relaxed">
            You&apos;ve hit the daily limit. Come back tomorrow for more conversations!
          </div>
        )}

        {/* Input too long warning */}
        {inputTooLong && (
          <div className="mb-2 px-3 py-2 bg-red-50 border border-red-200 text-sm text-red-600 leading-relaxed">
            Message too long — please keep it under ~333 tokens ({MAX_INPUT_CHARS.toLocaleString()} characters).
          </div>
        )}

        <div className="flex flex-col p-2 gap-2 border border-foreground/10 bg-background">
          {/* Quoted text preview — inside the input container */}
          {selectedText && (
            <div className="w-full text-foreground/80 bg-foreground/5 px-3 py-2 flex items-start gap-2 group">
              <div className="flex items-center pt-1">
                <svg width="15" height="12" viewBox="0 0 5 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.695992 1.54784H1.15199C1.48799 1.61984 1.69199 1.84784 1.69199 2.24384C1.69199 2.69984 1.34399 2.99984 0.899992 2.99984C0.299992 2.99984 -7.7635e-06 2.51984 -7.7635e-06 1.89584C-7.7635e-06 0.911835 0.551992 0.0958357 1.94399 -0.000164509V0.479836C1.06799 0.611835 0.695992 0.971836 0.695992 1.54784ZM3.05999 1.54784H3.51599C3.85199 1.61984 4.05599 1.84784 4.05599 2.24384C4.05599 2.69984 3.70799 2.99984 3.26399 2.99984C2.66399 2.99984 2.36399 2.51984 2.36399 1.89584C2.36399 0.911835 2.91599 0.0958357 4.30799 -0.000164509V0.479836C3.43199 0.611835 3.05999 0.971836 3.05999 1.54784Z" fill="currentColor" />
                </svg>
              </div>
              <p className="flex-1 text-sm leading-relaxed line-clamp-2">
                {selectedText}
              </p>
              <button
                onClick={onClearSelection}
                className="p-0.5 hover:opacity-50 rounded transition-colors flex-shrink-0"
                aria-label="Dismiss"
              >
                <X size={14} className="text-foreground/50" />
              </button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              placeholder={dailyLimitReached ? "Daily limit reached..." : selectedText ? "Ask about this quote..." : "Ask about Karthick..."}
              disabled={dailyLimitReached}
              className="flex-1 px-2 py-1 text-foreground placeholder:text-foreground/50 focus:outline-none disabled:opacity-50 bg-transparent resize-none min-h-[24px] max-h-[120px] leading-normal overflow-y-auto"
              style={{ fontSize: "16px" }}
              rows={1}
            />
            <button
              onClick={onSubmit}
              disabled={!input.trim() || isStreaming || inputTooLong || dailyLimitReached}
              className="w-8 h-8 flex items-center justify-center bg-accent/10 rounded-full text-accent hover:bg-accent/5 disabled:opacity-50 disabled:bg-foreground/0 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <ArrowUp size={16} />
            </button>
          </div>
          {/* Character counter when near limit */}
          {inputNearLimit && (
            <div className={`text-xs text-right px-1 ${inputTooLong ? "text-red-500" : "text-foreground/40"}`}>
              {input.length.toLocaleString()}/{MAX_INPUT_CHARS.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
