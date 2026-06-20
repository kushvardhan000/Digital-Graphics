import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid h-10 w-10 place-items-center border border-border/60 text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
    >
      <span className="relative block h-4 w-4">
        {mounted && theme === "dark" ? (
          <Sun className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={1.5} />
        )}
      </span>
    </button>
  );
}