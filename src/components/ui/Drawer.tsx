"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "right" | "top";
  labelledBy?: string;
};

/**
 * Panel with a scrim, escape-to-close, scroll lock and a focus trap simple
 * enough to stay predictable. Slides in from the right, or drops from the top
 * for the fullscreen search.
 */
export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
}: DrawerProps) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  const panelMotion =
    side === "right"
      ? {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        }
      : {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-charcoal/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
          />

          <motion.div
            ref={panelRef}
            {...panelMotion}
            transition={{ duration: reduced ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
            className={
              side === "right"
                ? "absolute right-0 top-0 flex h-full w-full flex-col bg-sand shadow-[-24px_0_60px_-30px_rgba(17,17,15,0.45)] sm:max-w-[27rem]"
                : "absolute inset-x-0 top-0 flex max-h-full flex-col bg-sand"
            }
          >
            <header className="flex items-center justify-between gap-4 border-b border-charcoal/12 px-5 py-5 sm:px-7">
              <h2 className="label">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="-mr-1 grid h-9 w-9 place-items-center text-charcoal transition-colors hover:text-ember"
              >
                <X size={17} strokeWidth={1.25} />
              </button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
