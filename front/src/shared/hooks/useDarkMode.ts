import { useEffect, useState } from "react";

export function useDarkMode() {
  const [enabled, setEnabled] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const newTheme = enabled ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }, [enabled]);

  return [enabled, setEnabled] as const;
}