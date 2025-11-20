"use client";

import { createContext, useContext, useState, ReactNode, useRef, useLayoutEffect } from "react";

type ColorPalette = "green" | "orange" | "blue" | "purple";
type ThemeMode = "light" | "dark";

interface ColorPaletteContextType {
  palette: ColorPalette;
  theme: ThemeMode;
  setPalette: (palette: ColorPalette) => void;
  setTheme: (theme: ThemeMode) => void;
  colors: string[];
}

const colorPalettes: Record<ColorPalette, string[]> = {
  green: [
    "#dfefdd",
    "#abcab4",
    "#9dc8a3",
    "#9cc7a4",
    "#80b790",
    "#679c79",
    "#4e815b",
    "#355544",
    "#18342b",
    "#11231c",
  ],
  orange: [
    "#f3cd72",
    "#f1b860",
    "#eea458",
    "#de7f52",
    "#d2534d",
    "#c93446",
    "#a72639",
    "#7b1c2e",
    "#48122a",
    "#3e1627",
  ],
  blue: [
    "#d2eff8",
    "#bee9f5",
    "#a8e1f2",
    "#7bcce8",
    "#57b8de",
    "#479dd0",
    "#3b7fc2",
    "#224da2",
    "#0b1376",
    "#090a47",
  ],
  purple: [
    "#f1dafd",
    "#eac8ff",
    "#e0b1fc",
    "#ca89fb",
    "#aa5de2",
    "#8b3bcb",
    "#6826ae",
    "#491686",
    "#250252",
    "#150339",
  ],
};

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(
  undefined
);

export function ColorPaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<ColorPalette>("green");
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const initializedRef = useRef(false);

  const updateBackgroundImage = (currentPalette: ColorPalette, currentTheme: ThemeMode) => {
    if (typeof window === "undefined") return;
    
    const body = document.body;
    const imagePath = `/images/${currentPalette}/${currentPalette}-${currentTheme === "light" ? "Light" : "Dark"}.png`;
    
    // For desktop
    if (window.innerWidth >= 768) {
      body.style.backgroundImage = `url("${imagePath}")`;
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center center";
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundAttachment = "fixed";
    } else {
      // For mobile, use gradient based on palette
      const colors = colorPalettes[currentPalette];
      const gradient = `linear-gradient(180deg, ${colors[0]} 0%, ${colors[4]} 50%, ${colors[9]} 100%)`;
      body.style.backgroundImage = gradient;
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center center";
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundAttachment = "fixed";
    }
  };

  const setPalette = (newPalette: ColorPalette) => {
    setPaletteState(newPalette);
    // Update CSS variables
    if (typeof window !== "undefined") {
      const colors = colorPalettes[newPalette];
      const root = document.documentElement;
      colors.forEach((color, index) => {
        root.style.setProperty(`--color-${index + 1}`, color);
      });
      // Update background image
      updateBackgroundImage(newPalette, theme);
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    // Update background image
    if (typeof window !== "undefined") {
      updateBackgroundImage(palette, newTheme);
    }
  };

  // Initialize on client side only, after mount to avoid hydration errors
  useLayoutEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const colors = colorPalettes[palette];
      const root = document.documentElement;
      colors.forEach((color, index) => {
        root.style.setProperty(`--color-${index + 1}`, color);
      });
      updateBackgroundImage(palette, theme);
      
      // Add resize handler to update background on window resize
      const handleResize = () => {
        updateBackgroundImage(palette, theme);
      };
      window.addEventListener("resize", handleResize);
      
      // Cleanup on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Only run once on mount

  return (
    <ColorPaletteContext.Provider
      value={{
        palette,
        theme,
        setPalette,
        setTheme,
        colors: colorPalettes[palette],
      }}
    >
      {children}
    </ColorPaletteContext.Provider>
  );
}

export function useColorPalette() {
  const context = useContext(ColorPaletteContext);
  if (context === undefined) {
    throw new Error("useColorPalette must be used within a ColorPaletteProvider");
  }
  return context;
}

