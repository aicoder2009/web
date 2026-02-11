"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const emailHoverRef = useRef(false);
  const emailCopiedRef = useRef(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectingRef = useRef(false);
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      ("ontouchstart" in window && window.innerWidth <= 768);
    setIsTouchDevice(isTouch);
  }, []);

  const updateCursor = useCallback(() => {
    const outer = cursorRef.current;
    const pill = pillRef.current;
    const icon = iconRef.current;
    const text = textRef.current;
    if (!outer || !pill || !icon || !text) return;

    const x = posRef.current.x;
    const y = posRef.current.y;
    const emailHover = emailHoverRef.current;
    const hovering = hoveringRef.current;
    const selecting = selectingRef.current;

    if (emailHover) {
      outer.style.transform = `translate(${x - 12}px, ${y}px)`;
      outer.style.opacity = visibleRef.current ? "1" : "0";

      pill.style.width = emailCopiedRef.current ? "160px" : "130px";
      pill.style.height = "30px";
      pill.style.borderRadius = "32px";
      pill.style.padding = "0px 10px";
      pill.style.boxShadow = "rgba(0,0,0,0.08) 0px 2px 8px";
      pill.style.marginLeft = "0px";
      pill.style.marginTop = "-15px";

      icon.style.opacity = "1";
      icon.style.marginRight = "8px";

      text.style.opacity = "1";
      text.style.width = "auto";
    } else if (hovering) {
      const size = 28;
      outer.style.transform = `translate(${x}px, ${y}px)`;
      outer.style.opacity = visibleRef.current ? "0.6" : "0";

      pill.style.width = `${size}px`;
      pill.style.height = `${size}px`;
      pill.style.borderRadius = "999px";
      pill.style.padding = "0";
      pill.style.boxShadow = "none";
      pill.style.marginLeft = `${-size / 2}px`;
      pill.style.marginTop = `${-size / 2}px`;

      icon.style.opacity = "0";
      icon.style.marginRight = "0";

      text.style.opacity = "0";
      text.style.width = "0";
    } else {
      const size = selecting ? 12 : 16;
      outer.style.transform = `translate(${x}px, ${y}px)`;
      outer.style.opacity = visibleRef.current ? "1" : "0";

      pill.style.width = `${size}px`;
      pill.style.height = `${size}px`;
      pill.style.borderRadius = "999px";
      pill.style.padding = "0";
      pill.style.boxShadow = "none";
      pill.style.marginLeft = `${-size / 2}px`;
      pill.style.marginTop = `${-size / 2}px`;

      icon.style.opacity = "0";
      icon.style.marginRight = "0";

      text.style.opacity = "0";
      text.style.width = "0";
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let ticking = false;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          updateCursor();
          ticking = false;
        });
      }
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const interactiveSelector = "a, button, [role='button'], input, select, textarea, [tabindex], .group";

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const emailTarget = target.closest('[data-cursor="email"]');
      if (emailTarget) {
        emailHoverRef.current = true;
        hoveringRef.current = false;
      } else if (target.closest(interactiveSelector)) {
        hoveringRef.current = true;
        emailHoverRef.current = false;
      }
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const emailTarget = target.closest('[data-cursor="email"]');
      if (emailTarget) {
        emailHoverRef.current = false;
      } else if (target.closest(interactiveSelector)) {
        hoveringRef.current = false;
      }
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseDown = () => {
      selectingRef.current = true;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseUp = () => {
      selectingRef.current = false;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const onEmailCopied = () => {
      emailCopiedRef.current = true;
      if (textRef.current) textRef.current.textContent = "EMAIL COPIED!";
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => {
        emailCopiedRef.current = false;
        if (textRef.current) textRef.current.textContent = "COPY EMAIL";
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateCursor);
      }, 2000);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("email-copied", onEmailCopied);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("email-copied", onEmailCopied);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div ref={cursorRef} style={{
      position: "fixed",
      top: 0,
      left: 0,
      pointerEvents: "none",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      opacity: 0,
      transition: "opacity 0.3s ease-out, transform 0.1s ease-out",
      willChange: "transform",
      transform: "translate(-100px, -100px)",
    }}>
      <div ref={pillRef} style={{
        display: "flex",
        alignItems: "center",
        background: "#5B9A6F",
        color: "#fff",
        borderRadius: "999px",
        width: "16px",
        height: "16px",
        fontWeight: 500,
        fontSize: "0.875rem",
        padding: "0",
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        boxShadow: "none",
        transition: "width 0.2s ease-out, height 0.2s ease-out, border-radius 0.2s ease-out, box-shadow 0.2s ease-out, padding 0.2s ease-out, opacity 0.2s ease-out",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}>
        <span ref={iconRef} style={{
          opacity: 0,
          transition: "opacity 0.2s ease-out, margin 0.2s ease-out",
          display: "flex",
          alignItems: "center",
          marginRight: "0",
          width: "16px",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px" }}>
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        </span>
        <span ref={textRef} style={{
          opacity: 0,
          transition: "opacity 0.2s ease-out, width 0.2s ease-out",
          width: "0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }} className="font-[family-name:var(--font-geist-mono)]">
          COPY EMAIL
        </span>
      </div>
    </div>
  );
}
