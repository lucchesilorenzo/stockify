"use client";

import { createContext, useEffect, useState } from "react";

type FontSizeProviderProps = {
  children: React.ReactNode;
};

type TFontSizeContext = {
  fontSize: string;
  handleFontSizeChange: (size: string) => void;
};

export const FontSizeContext = createContext<TFontSizeContext | null>(null);

export default function FontSizeProvider({ children }: FontSizeProviderProps) {
  const [fontSize, setFontSize] = useState("text-md");

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize") || "text-md";
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.className = `${savedFontSize} ${savedTheme}`;

    setFontSize(savedFontSize);
  }, []);

  function handleFontSizeChange(size: string) {
    const currentTheme = localStorage.getItem("theme") || "light";

    setFontSize(size);
    document.documentElement.className = `${size} ${currentTheme}`;

    localStorage.setItem("fontSize", size);
  }

  return (
    <FontSizeContext.Provider value={{ fontSize, handleFontSizeChange }}>
      {children}
    </FontSizeContext.Provider>
  );
}
