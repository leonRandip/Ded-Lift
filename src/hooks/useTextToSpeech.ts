"use client";

import { useState, useCallback, useRef } from "react";

interface UseTextToSpeechOptions {
  voiceId?: string;
  modelId?: string;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isStoppedRef = useRef<boolean>(false);

  const speak = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setError("No text to speak");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        isStoppedRef.current = false;

        // Stop any currently playing audio
        if (audioRef.current) {
          isStoppedRef.current = true;
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          if (audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src);
          }
          audioRef.current = null;
        }

        // Call the API route to generate speech
        const response = await fetch("/api/text-to-speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            voiceId: options.voiceId || "21m00Tcm4TlvDq8ikWAM", // Default voice
            modelId: options.modelId || "eleven_turbo_v2_5", // Newer model available on free tier
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to generate speech");
        }

        // Get the audio blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create and play audio
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onplay = () => {
          if (!isStoppedRef.current) {
            setIsPlaying(true);
          }
        };
        audio.onpause = () => {
          setIsPlaying(false);
        };
        audio.onended = () => {
          setIsPlaying(false);
          if (audioRef.current && audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src);
          }
          audioRef.current = null;
          isStoppedRef.current = false;
        };
        audio.onerror = (e) => {
          // Only log error if we didn't intentionally stop it
          if (!isStoppedRef.current) {
            console.error("Audio playback error:", e);
            setError("Error playing audio");
          }
          setIsPlaying(false);
          if (audioRef.current && audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src);
          }
          audioRef.current = null;
          isStoppedRef.current = false;
        };

        audioRef.current = audio;
        await audio.play();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to generate speech");
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    },
    [options.voiceId, options.modelId]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      isStoppedRef.current = true; // Mark as intentionally stopped
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      const src = audioRef.current.src;
      audioRef.current.src = ""; // Clear the source
      audioRef.current.load(); // Reset the audio element
      setIsPlaying(false);
      if (src && src.startsWith("blob:")) {
        URL.revokeObjectURL(src);
      }
      audioRef.current = null;
    }
  }, []);

  const getSelectedText = useCallback(() => {
    const selection = window.getSelection();
    return selection?.toString().trim() || "";
  }, []);

  const getPageText = useCallback(() => {
    // Get all text content from the main content area, excluding buttons and navigation
    const mainContent = document.querySelector("main") || document.body;
    const textElements = mainContent.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li");
    
    const texts: string[] = [];
    const seenTexts = new Set<string>(); // Prevent duplicates
    
    textElements.forEach((el) => {
      // Skip if element is hidden or is a button/input
      if (
        el instanceof HTMLElement &&
        el.offsetParent !== null &&
        !el.closest("button") &&
        !el.closest("input") &&
        !el.closest("nav") &&
        !el.closest("[aria-hidden='true']") &&
        !el.closest("svg") &&
        !el.closest("script") &&
        !el.closest("style")
      ) {
        const text = el.textContent?.trim();
        if (text && text.length > 0 && !seenTexts.has(text)) {
          seenTexts.add(text);
          texts.push(text);
        }
      }
    });

    // Add pauses between sentences for better TTS pacing
    return texts.join(". ... ");
  }, []);

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    error,
    getSelectedText,
    getPageText,
  };
}

