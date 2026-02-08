"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

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

export default function ChatMessage({
  role,
  content,
  quotedText,
  suggestions,
  onSuggestionClick,
  isStreaming,
}: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex flex-col items-end chat-msg-fade-in">
        <div className="max-w-[320px] bg-background text-foreground px-4 py-3 border border-foreground/10">
          {quotedText && (
            <div className="mb-2 text-xs text-foreground-light border-l-2 border-accent/30 pl-2 italic">
              &ldquo;{quotedText}&rdquo;
            </div>
          )}
          <p className="text-sm whitespace-pre-wrap !text-current">{content}</p>
        </div>
      </div>
    );
  }

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-start chat-msg-fade-in group/msg">
      <div className="max-w-[320px] text-foreground">
        <div className="text-sm py-4 prose prose-sm max-w-none prose-p:my-2 prose-p:leading-relaxed prose-strong:text-current prose-em:text-current prose-code:text-current prose-code:bg-foreground/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-ul:my-2 prose-li:my-1 text-current">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          {isStreaming && <span className="streaming-cursor" />}
        </div>
        {!isStreaming && content && (
          <div className="flex justify-end -mt-2 mb-1">
            <button
              onClick={handleCopy}
              className="p-1 rounded opacity-0 group-hover/msg:opacity-50 hover:!opacity-100 max-md:opacity-50 transition-opacity duration-200"
              aria-label="Copy message"
            >
              {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
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
