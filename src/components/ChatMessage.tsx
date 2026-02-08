"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, ChevronDown, ThumbsUp, ThumbsDown } from "lucide-react";

const USER_MSG_TRUNCATE = 200; // characters before truncation kicks in

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  quotedText?: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  isStreaming?: boolean;
}

// MUI SubdirectoryArrowRight icon — matches source
function SubdirectoryArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className={className}>
      <path d="m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9z" />
    </svg>
  );
}

function UserMessage({ content, quotedText }: { content: string; quotedText?: string }) {
  const isLong = content.length > USER_MSG_TRUNCATE;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-end chat-msg-fade-in">
      <div
        className={`max-w-[320px] bg-background text-foreground px-4 py-3 border border-foreground/10 overflow-hidden ${isLong && !expanded ? "cursor-pointer" : ""}`}
        onClick={isLong && !expanded ? () => setExpanded(true) : undefined}
      >
        {quotedText && (
          <div className="mb-2 text-xs text-foreground-light border-l-2 border-accent/30 pl-2 italic break-words">
            &ldquo;{quotedText}&rdquo;
          </div>
        )}
        <div className="relative">
          <p
            className={`text-sm whitespace-pre-wrap break-words !text-current ${isLong && !expanded ? "line-clamp-4" : ""}`}
          >
            {content}
          </p>
          {isLong && !expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          )}
        </div>
        {isLong && !expanded && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
            className="flex items-center gap-1 mt-1 text-xs text-accent hover:text-accent/80 transition-colors"
          >
            <span>Show more</span>
            <ChevronDown size={12} />
          </button>
        )}
        {isLong && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="flex items-center gap-1 mt-1 text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
          >
            <span>Show less</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function ChatMessage({
  role,
  content,
  quotedText,
  suggestions,
  onSuggestionClick,
  isStreaming,
}: ChatMessageProps) {
  if (role === "user") {
    return <UserMessage content={content} quotedText={quotedText} />;
  }

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-start chat-msg-fade-in group/msg">
      <div className="max-w-[320px] text-foreground overflow-hidden">
        <div className="text-sm py-4 prose prose-sm max-w-none break-words prose-p:my-2 prose-p:leading-relaxed prose-strong:text-current prose-em:text-current prose-code:text-current prose-code:bg-foreground/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-ul:my-2 prose-li:my-1 text-current">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          {isStreaming && <span className="streaming-cursor" />}
        </div>
        {!isStreaming && content && (
          <div className="flex items-center gap-0.5 -mt-2 mb-1 opacity-0 group-hover/msg:opacity-100 max-md:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-7 h-7 rounded-md text-foreground/40 hover:text-foreground/70 transition-colors"
              aria-label="Copy message"
            >
              {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
            </button>
            <button
              onClick={() => setFeedback(feedback === "up" ? null : "up")}
              className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
                feedback === "up" ? "text-accent" : "text-foreground/40 hover:text-foreground/70"
              }`}
              aria-label="Helpful"
            >
              <ThumbsUp size={13} />
            </button>
            <button
              onClick={() => setFeedback(feedback === "down" ? null : "down")}
              className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
                feedback === "down" ? "text-red-400" : "text-foreground/40 hover:text-foreground/70"
              }`}
              aria-label="Not helpful"
            >
              <ThumbsDown size={13} />
            </button>
          </div>
        )}
        {suggestions && suggestions.length > 0 && (
          <div className="mt-4 pt-2 border-t border-foreground/10 chat-suggestions-fade-in">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onSuggestionClick?.(s)}
                className="text-left py-1.5 hover:text-accent group transition-colors !text-[14px] text-foreground/60 flex items-start gap-1 rounded"
              >
                <SubdirectoryArrowRight className="text-foreground/60 mt-1.5 shrink-0 group-hover:text-accent" />
                <span>{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
