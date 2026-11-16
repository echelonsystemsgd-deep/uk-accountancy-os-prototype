import { useEffect } from "react";

/**
 * useScrollLock hook
 * Completely locks background body & html scrolling when a modal, lightbox,
 * drawer, or sidebar is open, preventing background jumping or scrolling.
 * Compensates for scrollbar width to avoid layout shift.
 */
export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock || typeof window === "undefined") return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalBodyTouchAction = document.body.style.touchAction;

    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Prevent wheel/touch bubbling on the window when cursor/finger is on non-scrollable parts
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(".modal-scrollable")) {
        e.preventDefault();
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.body.style.touchAction = originalBodyTouchAction;
    };
  }, [lock]);
}
