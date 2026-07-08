"use client";

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

const CYCLE: Record<ThemeMode, ThemeMode> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const LABELS: Record<ThemeMode, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

function readStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function applyMode(mode: ThemeMode) {
  try {
    if (mode === "system") {
      delete document.documentElement.dataset.theme;
      localStorage.removeItem("theme");
    } else {
      document.documentElement.dataset.theme = mode;
      localStorage.setItem("theme", mode);
    }
  } catch {
    // Storage unavailable (e.g. blocked); the attribute still applies for
    // this page view.
  }
}

/**
 * Tri-state color theme toggle: system → light → dark → system. "System"
 * removes the `data-theme` attribute so the CSS `prefers-color-scheme`
 * rules take over; explicit choices persist in localStorage and are
 * re-applied before first paint by the inline script in the root layout.
 */
export default function ThemeToggle() {
  // `null` until mounted so the server render (system icon) never
  // disagrees with the first client render.
  const [mode, setMode] = useState<ThemeMode | null>(null);

  useEffect(() => {
    setMode(readStoredMode());
  }, []);

  // Applying as an effect (rather than in the click handler) keeps rapid
  // repeated clicks correct: each cycle() uses the functional updater, and
  // the DOM/storage side effect is idempotent.
  useEffect(() => {
    if (mode) applyMode(mode);
  }, [mode]);

  const cycle = () => {
    setMode((prev) => (prev ? CYCLE[prev] : prev));
  };

  const Icon =
    mode === "light"
      ? SunIcon
      : mode === "dark"
        ? MoonIcon
        : ComputerDesktopIcon;

  return (
    <button
      onClick={cycle}
      aria-label={
        mode
          ? `${LABELS[mode]} active. Switch to ${LABELS[CYCLE[mode]].toLowerCase()}.`
          : "Switch color theme"
      }
      title={mode ? LABELS[mode] : undefined}
      className="flex h-11 w-11 items-center justify-center border border-seam text-bone transition-colors hover:border-bone/40"
    >
      <Icon className="h-4" />
    </button>
  );
}
