import { create } from "zustand";

const localStorageKey = "general-local-storage-store";

export type GeneralLocalStorageStore = {
  theme: "dark" | "light" | "system";
  setTheme: (theme: GeneralLocalStorageStore["theme"]) => void; // Updated type for setTheme
};

const onThemeChange = (theme: GeneralLocalStorageStore["theme"]) => {
  localStorage.setItem(localStorageKey, theme);

  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
};

const useGeneralLocalStorageStore = create<GeneralLocalStorageStore>((set) => ({
  theme:
    (localStorage.getItem(
      localStorageKey,
    ) as GeneralLocalStorageStore["theme"]) || "light",
  setTheme: (theme) => {
    set({ theme });
    onThemeChange(theme); // Ensure `onThemeChange` is called on theme update
  },
}));

// Initialize the theme on app load
(() => {
  const initialTheme =
    (localStorage.getItem(
      localStorageKey,
    ) as GeneralLocalStorageStore["theme"]) || "light";
  onThemeChange(initialTheme);
})();

export default useGeneralLocalStorageStore;
