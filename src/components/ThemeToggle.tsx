"use client";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark =
      root.dataset.theme === "night" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    root.dataset.theme = dark ? "day" : "night";
    try {
      localStorage.setItem("edition", root.dataset.theme);
    } catch {}
  };
  return (
    <button type="button" className="edition" onClick={toggle}>
      <span className="when-day">Switch to the night edition</span>
      <span className="when-night">Switch to the day edition</span>
    </button>
  );
}
