"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("themechange", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("themechange", callback); };
}
function getTheme() {
  try { return localStorage.getItem("portfolio-theme") || "system"; } catch { return "system"; }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "system");
  return <div className="theme-control"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><select aria-label="Color theme" value={theme} onChange={e => {
    const value = e.target.value;
    document.documentElement.dataset.theme = value;
    try { localStorage.setItem("portfolio-theme", value); } catch { /* Theme still works without storage. */ }
    window.dispatchEvent(new Event("themechange"));
  }}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div>;
}
