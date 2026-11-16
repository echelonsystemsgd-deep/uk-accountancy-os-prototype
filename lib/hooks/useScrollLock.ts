import { useEffect } from "react";

/**
 * useScrollLock hook
 * Completely locks background body scrolling when a modal, lightbox,
 * drawer, or sidebar is open, preventing background jumping or scrolling.
 * Preserves exact scroll position without resetting to top.
 * Compensates for scrollbar width to avoid layout shift.
 */
export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock || typeof window === "undefined") return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalBodyTouchAction = document.body.style.touchAction;

    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Prevent touch/wheel bubbling to document body when touch/cursor is outside scrollable area
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(".modal-scrollable")) {
        e.preventDefault();
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.classList.remove("modal-open");
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.body.style.touchAction = originalBodyTouchAction;
    };
  }, [lock]);
}
