"use client";

import { useEffect } from "react";

// Long enough to see on a quick tap.
const MIN_PRESS_MS = 150;

/**
 * Marks a link or button as pressed the moment a finger touches it, and keeps it marked briefly.
 * Touch browsers delay :active (to tell taps from scrolls), so quick taps showed no feedback.
 * The look itself is the [data-pressed] rule in globals.css.
 */
export function PressFeedback() {
  useEffect(() => {
    let pressed: HTMLElement | null = null;
    let pressedAt = 0;

    function press(event: PointerEvent) {
      const target = event.target as Element | null;
      const element = target?.closest<HTMLElement>("a, button:not(:disabled)");
      if (!element) return;
      pressed = element;
      pressedAt = Date.now();
      element.dataset.pressed = "";
    }

    function release() {
      const element = pressed;
      if (!element) return;
      pressed = null;
      const wait = Math.max(0, MIN_PRESS_MS - (Date.now() - pressedAt));
      setTimeout(() => delete element.dataset.pressed, wait);
    }

    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", release);
    return () => {
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
    };
  }, []);

  return null;
}
