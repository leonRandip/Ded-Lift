"use client";

import { useState } from "react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface TextToSpeechButtonProps {
  className?: string;
  variant?: "icon" | "button";
}

export default function TextToSpeechButton({
  className = "",
  variant = "button",
}: TextToSpeechButtonProps) {
  const { speak, stop, isLoading, isPlaying, getSelectedText, getPageText } =
    useTextToSpeech();
  const [showMenu, setShowMenu] = useState(false);

  const handleReadSelected = async () => {
    // Stop any currently playing audio first
    stop();
    // Small delay to ensure stop completes
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const selectedText = getSelectedText();
    if (selectedText) {
      await speak(selectedText);
    } else {
      alert("Please select some text first");
    }
    setShowMenu(false);
  };

  const handleReadPage = async () => {
    // Stop any currently playing audio first
    stop();
    // Small delay to ensure stop completes
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const pageText = getPageText();
    if (pageText) {
      await speak(pageText);
    } else {
      alert("No content found to read");
    }
    setShowMenu(false);
  };

  const handleStop = () => {
    stop();
    setShowMenu(false);
  };

  if (variant === "icon") {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`w-10 h-10 rounded-full liquid-glass-card border border-[var(--color-2)]/50 flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-red-500/20 border-red-500/50"
              : "hover:bg-[var(--color-2)]/30"
          }`}
          aria-label="Text to Speech"
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-[var(--color-10)]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
          )}
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-12 z-50 liquid-glass-card rounded-xl p-2 shadow-xl min-w-[200px]">
              {isPlaying ? (
                <button
                  onClick={handleStop}
                  className="w-full px-4 py-2 rounded-lg text-left text-[var(--color-10)] hover:bg-[var(--color-2)]/30 transition-all flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                  </svg>
                  Stop
                </button>
              ) : (
                <>
                  <button
                    onClick={handleReadSelected}
                    disabled={isLoading}
                    className="w-full px-4 py-2 rounded-lg text-left text-[var(--color-10)] hover:bg-[var(--color-2)]/30 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Read Selected
                  </button>
                  <button
                    onClick={handleReadPage}
                    disabled={isLoading}
                    className="w-full px-4 py-2 rounded-lg text-left text-[var(--color-10)] hover:bg-[var(--color-2)]/30 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Read Page
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => {
          if (isPlaying) {
            handleStop();
          } else {
            setShowMenu(!showMenu);
          }
        }}
        disabled={isLoading}
        className={`px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all flex items-center gap-2 disabled:opacity-50 ${
          isPlaying ? "bg-red-500/20 border-red-500/50" : ""
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-5)]"></div>
            <span>Loading...</span>
          </>
        ) : isPlaying ? (
          <>
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
            </svg>
            <span>Stop</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
            <span>Read</span>
          </>
        )}
      </button>

      {showMenu && !isPlaying && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-12 z-50 liquid-glass-card rounded-xl p-2 shadow-xl min-w-[200px]">
            <button
              onClick={handleReadSelected}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg text-left text-[var(--color-10)] hover:bg-[var(--color-2)]/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              Read Selected
            </button>
            <button
              onClick={handleReadPage}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg text-left text-[var(--color-10)] hover:bg-[var(--color-2)]/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Read Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

