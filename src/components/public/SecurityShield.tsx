"use client";

import { useEffect } from "react";

/**
 * SecurityShield — client-side deterrents against casual code/file inspection.
 *
 * Limitations (be honest about them):
 *   - Anything delivered to the browser can be read by a determined attacker.
 *   - These measures raise the bar for casual inspection (right-click, view-source,
 *     F12 DevTools, image drag-to-download, text selection). They do not stop
 *     someone with DevTools already open, a proxy, or `view-source:`.
 *   - Server-side code and env vars never reach the browser and remain safe.
 *
 * Place this once in the root layout so it mounts on every page.
 */
export default function SecurityShield() {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const alt = e.altKey;

      // F12 — DevTools
      // Ctrl+Shift+I / Cmd+Opt+I — DevTools
      // Ctrl+Shift+J / Cmd+Opt+J — Console
      // Ctrl+Shift+C / Cmd+Opt+C — Inspect element
      // Ctrl+U / Cmd+U — View page source
      // Ctrl+S / Cmd+S — Save page
      // Ctrl+P / Cmd+P — Print
      // F5 / Ctrl+R — Hard refresh (less critical, but keeps flow controlled)
      if (
        key === "f12" ||
        (ctrl && shift && (key === "i" || key === "j" || key === "c")) ||
        (ctrl && key === "u") ||
        (ctrl && key === "s") ||
        (ctrl && key === "p") ||
        (alt && key === "printscreen")
      ) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const copy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    const cut = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    const dragstart = (e: DragEvent) => {
      // Block dragging images out of the page (image download via drag).
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const drop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    const contextmenu = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    document.addEventListener("keydown", keydown, true);
    document.addEventListener("copy", copy, true);
    document.addEventListener("cut", cut, true);
    document.addEventListener("dragstart", dragstart, true);
    document.addEventListener("drop", drop, true);
    document.addEventListener("contextmenu", contextmenu, true);

    // Silence console in production so DevTools console is less useful.
    if (process.env.NODE_ENV === "production") {
      const noop = () => {};
      ["log", "warn", "info", "debug", "trace", "table", "dir", "group", "groupEnd"].forEach((method) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (console as any)[method] = noop;
      });
      // console.error is intentionally NOT silenced so genuine crashes remain
      // visible to the operator.
    }

    return () => {
      document.removeEventListener("keydown", keydown, true);
      document.removeEventListener("copy", copy, true);
      document.removeEventListener("cut", cut, true);
      document.removeEventListener("dragstart", dragstart, true);
      document.removeEventListener("drop", drop, true);
      document.removeEventListener("contextmenu", contextmenu, true);
    };
  }, []);

  return null;
}
