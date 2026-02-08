"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = [
  { text: "designs.", color: "#5B8DEF" },  // cornflower blue
  { text: "builds.", color: "#E8913A" },    // warm amber
  { text: "ships.", color: "#3AAFA9" },     // teal
  { text: "markets.", color: "#D95B8C" },   // rose pink
  { text: "engineers.", color: "#5B9A6F" }, // sage green (accent)
  { text: "creates.", color: "#9B72CF" },   // soft purple
  { text: "gives.", color: "#E06B5E" },     // warm coral
];

export default function RotatingText({ duration = 3000 }: { duration?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <span className="inline-flex overflow-hidden align-bottom" style={{ height: '1.15em' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index].text}
          className="inline-block italic"
          style={{ color: words[index].color }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {words[index].text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
