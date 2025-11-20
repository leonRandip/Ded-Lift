"use client";

import { useState, useRef } from "react";
import { useColorPalette } from "@/contexts/ColorPaletteContext";

type ColorPalette = "green" | "orange" | "blue" | "purple";

export default function ColorPalettePicker() {
  const { palette, theme, setPalette, setTheme } = useColorPalette();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const palettes: { name: string; value: ColorPalette; preview: string }[] = [
    { name: "Green", value: "green", preview: "#80b790" },
    { name: "Orange", value: "orange", preview: "#d2534d" },
    { name: "Blue", value: "blue", preview: "#57b8de" },
    { name: "Purple", value: "purple", preview: "#aa5de2" },
  ];

  const handlePaletteChange = (newPalette: ColorPalette) => {
    setPalette(newPalette);
  };

  return (
    <div className="relative">
      {/* Color Palette Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 md:top-6 right-6 z-50 w-16 h-16 md:w-14 md:h-14 liquid-glass-card rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 text-[var(--color-9)]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      </button>

      {/* Popup Card */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Popup */}
          <div
            ref={popupRef}
            className="fixed top-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-80 max-w-sm liquid-glass-card rounded-2xl p-6 shadow-2xl"
            style={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 255, 255, 0.25)",
            }}
          >
            {/* Light/Dark Mode Toggle - Disabled on mobile */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-[var(--color-10)]">
                    Theme
                  </span>
                  {/* Lock icon - visible on mobile only */}
                  <svg
                    className="w-4 h-4 text-[var(--color-8)] md:hidden"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <span className="text-xs text-[var(--color-8)] md:hidden">
                  Desktop only
                </span>
              </div>
              <div className="flex items-center space-x-4 liquid-glass-card rounded-xl p-2 bg-[var(--color-2)]/30">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    theme === "light"
                      ? "bg-[var(--color-5)] text-white shadow-lg"
                      : "text-[var(--color-8)] hover:text-[var(--color-10)]"
                  } opacity-50 cursor-not-allowed pointer-events-none md:opacity-100 md:cursor-pointer md:pointer-events-auto`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-[var(--color-5)] text-white shadow-lg"
                      : "text-[var(--color-8)] hover:text-[var(--color-10)]"
                  } opacity-50 cursor-not-allowed pointer-events-none md:opacity-100 md:cursor-pointer md:pointer-events-auto`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Color Palettes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[var(--color-10)]">
                  Color Palette
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {palettes.map((pal) => (
                  <button
                    key={pal.value}
                    onClick={() => handlePaletteChange(pal.value)}
                    className={`liquid-glass-card rounded-xl p-4 flex flex-col items-center space-y-2 transition-all duration-300 hover:scale-105 ${
                      palette === pal.value
                        ? "ring-2 ring-[var(--color-5)] ring-offset-2 ring-offset-transparent"
                        : ""
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-lg shadow-lg"
                      style={{ backgroundColor: pal.preview }}
                    />
                    <span className="text-sm font-medium text-[var(--color-10)]">
                      {pal.name}
                    </span>
                    {palette === pal.value && (
                      <svg
                        className="w-5 h-5 text-[var(--color-5)]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
