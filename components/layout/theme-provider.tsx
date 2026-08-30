"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "abyzz-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme): ResolvedTheme {
  const resolved =
    theme === "system"
      ? getSystemTheme()
      : theme;

  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");

  root.style.colorScheme = resolved;

  return resolved;
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    const initialTheme: Theme =
      stored === "light" ||
      stored === "dark" ||
      stored === "system"
        ? stored
        : "system";

    setThemeState(initialTheme);
    setResolvedTheme(applyTheme(initialTheme));
  }, []);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = (): void => {
      setResolvedTheme(applyTheme("system"));
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const setTheme = (nextTheme: Theme): void => {
    window.localStorage.setItem(
      STORAGE_KEY,
      nextTheme
    );

    setThemeState(nextTheme);
    setResolvedTheme(applyTheme(nextTheme));
  };

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}