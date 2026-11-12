"use client";

import { useLayoutEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const STORAGE_KEY = "theme";

const applyTheme = (theme: "light" | "dark") => {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
};

const getPreferredTheme = (): "light" | "dark" => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Storage blocked hole system preference use korbo.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeToggle = () => {
  // Dev remount e React html class reset kore, tai saved theme abar apply koro.
  useLayoutEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  const toggleTheme = () => {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Persist na hok, current session e theme switch thakbe.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-surface text-ink/70 transition-colors hover:border-ink/20 hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <FiMoon aria-hidden="true" className="h-4 w-4 dark:hidden" />
      <FiSun aria-hidden="true" className="hidden h-4 w-4 dark:block" />
    </button>
  );
};

export default ThemeToggle;
