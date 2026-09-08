"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger offset in seconds */
  delay?: number;
  /** translate distance in px while hidden */
  y?: number;
  as?: ElementType;
};

/**
 * Scroll-in for a section's content.
 *
 * Visible by default: server-rendered and no-JS output is fully shown, and
 * anything already on screen at mount never dips to hidden (no flash). Only
 * content still below the fold is offset, then eased in once when it enters
 * view. Instant under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const onScreen =
      el.getBoundingClientRect().top < window.innerHeight * 0.92;

    if (reduce || onScreen) return;

    setArmed(true);
    setShown(false);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    const failsafe = window.setTimeout(() => setShown(true), 1600);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const hidden = armed && !shown;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${y}px)` : "none",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}
