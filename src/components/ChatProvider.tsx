"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";

interface ChatContextType {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  pageContext: string;
  selectedText: string;
  setSelectedText: (text: string) => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}

export default function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const pathname = usePathname();

  // Derive page context from pathname
  const pageContext = pathname === "/"
    ? "home"
    : pathname === "/about"
    ? "about"
    : pathname === "/fun"
    ? "fun"
    : pathname.startsWith("/projects/")
    ? "project"
    : "home";

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => {
      if (prev) {
        // Already open — focus the input instead of closing
        setTimeout(() => inputRef.current?.focus(), 0);
        return true;
      }
      return true;
    });
  }, []);

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (isChatOpen && window.innerWidth < 768) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }
    return () => document.body.classList.remove("chat-open");
  }, [isChatOpen]);

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        toggleChat,
        pageContext,
        selectedText,
        setSelectedText,
        inputRef,
      }}
    >
      {children}

      {/* Mobile FAB — only shown when chat is open (acts as close button) */}
      {isChatOpen && (
        <button
          onClick={() => setIsChatOpen(false)}
          className="md:hidden fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-accent/8 text-foreground shadow-lg flex items-center justify-center hover:text-accent active:scale-95 transition-all duration-200"
          aria-label="Close AI chat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M14.5231 29.2759C12.6685 22.5706 7.42938 17.3315 0.724097 15.4769C0.240255 15.3431 0.240255 14.657 0.724097 14.5231C7.42938 12.6685 12.6685 7.42939 14.5231 0.724099C14.6569 0.240257 15.343 0.240257 15.4769 0.724099C17.3315 7.42939 22.5706 12.6685 29.2759 14.5231C29.7597 14.657 29.7597 15.343 29.2759 15.4769C22.5706 17.3315 17.3315 22.5706 15.4769 29.2759C15.343 29.7597 14.657 29.7597 14.5231 29.2759Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </ChatContext.Provider>
  );
}
