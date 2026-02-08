"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { ChevronDown, Lightbulb, Wrench, Rocket } from "lucide-react";
import TextShimmer from "./TextShimmer";

/* ── Reasoning compound component (prompt-kit) ─────────────────── */

type ReasoningCtx = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ReasoningContext = createContext<ReasoningCtx | undefined>(undefined);

function useReasoning() {
  const ctx = useContext(ReasoningContext);
  if (!ctx) throw new Error("useReasoning must be inside <Reasoning>");
  return ctx;
}

function Reasoning({
  children,
  isStreaming,
}: {
  children: React.ReactNode;
  isStreaming: boolean;
}) {
  const [isOpen, setIsOpen] = useState(isStreaming);
  const [wasAutoOpened, setWasAutoOpened] = useState(false);

  useEffect(() => {
    if (isStreaming && !wasAutoOpened) {
      setIsOpen(true);
      setWasAutoOpened(true);
    }
    if (!isStreaming && wasAutoOpened) {
      setIsOpen(false);
      setWasAutoOpened(false);
    }
  }, [isStreaming, wasAutoOpened]);

  return (
    <ReasoningContext.Provider value={{ isOpen, onOpenChange: setIsOpen }}>
      <div>{children}</div>
    </ReasoningContext.Provider>
  );
}

function ReasoningTrigger({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpenChange } = useReasoning();

  return (
    <button
      className="flex cursor-pointer items-center gap-2 text-foreground/50 hover:text-foreground/70 transition-colors"
      onClick={() => onOpenChange(!isOpen)}
    >
      <span>{children}</span>
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
}

function ReasoningContent({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useReasoning();

  useEffect(() => {
    if (!contentRef.current || !innerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (contentRef.current && innerRef.current && isOpen) {
        contentRef.current.style.maxHeight = `${innerRef.current.scrollHeight}px`;
      }
    });

    observer.observe(innerRef.current);

    if (isOpen) {
      contentRef.current.style.maxHeight = `${innerRef.current.scrollHeight}px`;
    }

    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div
      ref={contentRef}
      className="overflow-hidden transition-[max-height] duration-150 ease-out"
      style={{ maxHeight: isOpen ? undefined : "0px" }}
    >
      <div ref={innerRef} className="pt-3 pb-1">
        {children}
      </div>
    </div>
  );
}

/* ── Chain of thought steps (prompt-kit pattern) ───────────────── */

const STEPS = [
  { icon: Lightbulb, label: "Spark of an idea…" },
  { icon: Wrench, label: "Tinkering with the prototype…" },
  { icon: Rocket, label: "Ready for launch…" },
];

function ChainOfThoughtSteps({ isVisible }: { isVisible: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setVisibleCount(0);
      return;
    }

    setVisibleCount(1);
    const timers = STEPS.slice(1).map((_, i) =>
      setTimeout(() => setVisibleCount(i + 2), (i + 1) * 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div>
      {STEPS.slice(0, visibleCount).map((step, i) => {
        const Icon = step.icon;
        const isLast = i === visibleCount - 1;
        return (
          <div key={i} className="chat-msg-fade-in" data-last={isLast}>
            {/* Step trigger: icon + label */}
            <div className="flex items-center gap-2 text-sm text-foreground/50">
              <span className="inline-flex w-4 h-4 items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </span>
              <span>{step.label}</span>
            </div>
            {/* Vertical connector line between steps (hidden on last) */}
            {!isLast && (
              <div className="flex justify-start">
                <div className="ml-[7px] h-4 w-px bg-foreground/15" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Exported ChainOfThought ───────────────────────────────────── */

export default function ChainOfThought({
  isVisible,
}: {
  isVisible: boolean;
}) {
  if (!isVisible) return null;

  return (
    <div className="py-2">
      <Reasoning isStreaming={isVisible}>
        <ReasoningTrigger>
          <TextShimmer duration={2} spread={25} className="text-xs">
            Thinking…
          </TextShimmer>
        </ReasoningTrigger>
        <ReasoningContent>
          <ChainOfThoughtSteps isVisible={isVisible} />
        </ReasoningContent>
      </Reasoning>
    </div>
  );
}
