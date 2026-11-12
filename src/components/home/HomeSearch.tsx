"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CategoryId, HomeSearchContextValue } from "@/types";

const HomeSearchContext = createContext<HomeSearchContextValue | null>(null);

// Upcoming list e smooth scroll. Reduced motion hole instant hobe.
const scrollToEvents = () => {
  const target = document.getElementById("upcoming-events");
  if (!target) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
};

export const HomeSearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [city, setCity] = useState("all");

  const hasFilters =
    query.trim().length > 0 || category !== "all" || city !== "all";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setCity("all");
  };

  // Hero search ar quick cause chips theke call hoy.
  const search = (value: string) => {
    setQuery(value);
    setCategory("all");
    setCity("all");
    scrollToEvents();
  };

  return (
    <HomeSearchContext.Provider
      value={{
        query,
        category,
        city,
        hasFilters,
        setQuery,
        setCategory,
        setCity,
        clearFilters,
        search,
        scrollToEvents,
      }}
    >
      {children}
    </HomeSearchContext.Provider>
  );
};

export const useHomeSearch = () => {
  const context = useContext(HomeSearchContext);

  if (!context) {
    throw new Error("useHomeSearch must be used within HomeSearchProvider");
  }

  return context;
};
