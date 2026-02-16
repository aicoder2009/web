"use client";

import { useRef, useState, ComponentPropsWithoutRef } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlockWrapper(
  props: ComponentPropsWithoutRef<"pre">
) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper group relative">
      <pre ref={preRef} {...props} />
      <button
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 code-copy-btn"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
