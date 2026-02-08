"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useChat } from "./ChatProvider";

export default function TextSelectionPopover() {
  const { setSelectedText, setIsChatOpen } = useChat();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setVisible(false);
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 3 || text.length > 500) {
      setVisible(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Don't show popover for selections inside chat sidebar
    const target = range.startContainer.parentElement;
    if (target?.closest("[data-chat-sidebar]")) {
      setVisible(false);
      return;
    }

    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
    });
    setVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);

    const handleMouseDown = (e: MouseEvent) => {
      if (popoverRef.current?.contains(e.target as Node)) return;
      setVisible(false);
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleSelection]);

  const handleClick = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || "";
    if (text) {
      setSelectedText(text);
      setIsChatOpen(true);
      selection?.removeAllRanges();
    }
    setVisible(false);
  }, [setSelectedText, setIsChatOpen]);

  if (!visible || !position) return null;

  return (
    <button
      ref={popoverRef}
      data-selection-popover
      onClick={handleClick}
      className="fixed z-[100] pointer-events-auto bg-accent text-white pl-2 pr-2.5 py-1.5 rounded-full text-sm border border-foreground/10 hover:opacity-70 active:scale-95 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -100%)",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      {/* White sparkle icon — matches source */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 30 30"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M14.5231 29.2759C12.6685 22.5706 7.42938 17.3315 0.724097 15.4769C0.240255 15.3431 0.240255 14.657 0.724097 14.5231C7.42938 12.6685 12.6685 7.42939 14.5231 0.724099C14.6569 0.240257 15.343 0.240257 15.4769 0.724099C17.3315 7.42939 22.5706 12.6685 29.2759 14.5231C29.7597 14.657 29.7597 15.343 29.2759 15.4769C22.5706 17.3315 17.3315 22.5706 15.4769 29.2759C15.343 29.7597 14.657 29.7597 14.5231 29.2759Z"
          fill="white"
        />
      </svg>
      Ask ArunLM
    </button>
  );
}
