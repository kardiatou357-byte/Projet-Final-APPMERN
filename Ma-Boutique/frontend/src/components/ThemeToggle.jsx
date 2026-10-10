import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const themeCtx = useTheme();
  const theme = themeCtx?.theme || "light";
  const toggleTheme = themeCtx?.toggleTheme || (() => {});

  return (
    <button
      className="btn btn-sm theme-toggle"
      onClick={toggleTheme}
      title={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
    >
      <i className={`bi ${theme === "light" ? "bi-moon-stars-fill" : "bi-sun-fill"}`}></i>
    </button>
  );
}