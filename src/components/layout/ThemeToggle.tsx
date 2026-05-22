import { useTheme } from "../../providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="nav-glass-pill flex size-10 items-center justify-center rounded-full text-lg transition hover:bg-zinc-400/40 dark:text-white dark:hover:bg-zinc-600/50"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
