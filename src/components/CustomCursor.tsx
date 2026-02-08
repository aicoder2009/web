"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
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
    const el = cursorRef.current;
    if (!el) return;
    const hovering = hoveringRef.current;
    const selecting = selectingRef.current;
    // Hovering links: bigger + translucent | Selecting text: smaller + opaque | Default: normal
    const size = hovering ? 28 : selecting ? 12 : 16;
    el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.marginLeft = `${-size / 2}px`;
    el.style.marginTop = `${-size / 2}px`;
    el.style.opacity = visibleRef.current ? (hovering ? "0.6" : "1") : "0";
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const interactiveSelector = "a, button, [role='button'], input, select, textarea, [tabindex], .group";

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        hoveringRef.current = true;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateCursor);
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        hoveringRef.current = false;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateCursor);
      }
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

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "16px",
        height: "16px",
        marginLeft: "-8px",
        marginTop: "-8px",
        backgroundColor: "#e65f2e",
        borderRadius: "999px",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition:
          "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out, opacity 0.2s ease-out",
        willChange: "transform",
        transform: "translate(-100px, -100px)",
      }}
    />
  );
}
