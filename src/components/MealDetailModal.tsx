"use client";

import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import { Meal } from "./MealPlanPage";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface MealDetailModalProps {
  meal: Meal;
  onClose: () => void;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export default function MealDetailModal({ 
  meal, 
  onClose, 
  isFavorited: initialFavorited = false,
  onToggleFavorite 
}: MealDetailModalProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const { speak, stop, isLoading, isPlaying } = useTextToSpeech();
  
  const mealTypeLabels: Record<string, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
  };

  // Sync favorite state when meal changes
  useLayoutEffect(() => {
    setIsFavorited(initialFavorited);
  }, [initialFavorited, meal.id]);

  const handleFavoriteToggle = () => {
    const newState = !isFavorited;
    setIsFavorited(newState);
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  const handleReadMeal = async () => {
    // Build meal description text with pauses
    const mealText = [
      `${mealTypeLabels[meal.type]}.`,
      meal.name + ".",
      meal.description ? meal.description + "." : "",
      meal.preparationTime ? `Preparation time: ${meal.preparationTime}.` : "",
      meal.servingSize ? `Serving size: ${meal.servingSize}.` : "",
      `Nutrition information:`,
      `${meal.protein} grams of protein.`,
      `${meal.carbs} grams of carbohydrates.`,
      `${meal.calories} calories.`,
    ]
      .filter(Boolean)
      .join(" ... "); // Add pauses between sections

    await speak(mealText);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--color-10)]/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
        onClick={onClose}
      >
        <div
          className="w-full md:w-full md:max-w-2xl liquid-glass-card rounded-t-3xl md:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          style={{
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Section */}
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover"
            />
            {/* Back Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-all"
            >
              <svg
                className="w-6 h-6 text-[var(--color-10)]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Meal Type Tag */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-[var(--color-5)]/20 text-[var(--color-10)] text-xs font-medium">
                {mealTypeLabels[meal.type]}
              </span>
            </div>

            {/* Meal Name */}
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-10)] mb-4">
              {meal.name}
            </h2>

            {/* Metrics */}
            <div className="flex items-center gap-6 mb-6">
              {meal.preparationTime && (
                <div className="flex items-center gap-2 text-[var(--color-10)]">
                  <svg
                    className="w-5 h-5 text-[var(--color-10)]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm text-[var(--color-10)]">{meal.preparationTime}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[var(--color-10)]">
                <svg
                  className="w-5 h-5 text-[var(--color-10)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                  <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                </svg>
                <span className="text-sm text-[var(--color-10)]">{meal.calories}kcal</span>
              </div>
              {meal.servingSize && (
                <div className="flex items-center gap-2 text-[var(--color-10)]">
                  <svg
                    className="w-5 h-5 text-[var(--color-10)]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <span className="text-sm text-[var(--color-10)]">{meal.servingSize}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {meal.description && (
              <p className="text-[var(--color-10)] mb-6 leading-relaxed">
                {meal.description}
              </p>
            )}

            {/* Nutrition Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-8)]/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--color-10)] mb-1">
                  {meal.protein}g
                </div>
                <div className="text-xs text-[var(--color-10)]">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--color-10)] mb-1">
                  {meal.carbs}g
                </div>
                <div className="text-xs text-[var(--color-10)]">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--color-10)] mb-1">
                  {meal.calories}
                </div>
                <div className="text-xs text-[var(--color-10)]">Calories</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleFavoriteToggle}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isFavorited
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] hover:bg-[var(--color-2)]/30"
                }`}
              >
                {isFavorited ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
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
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span>Favorite</span>
                  </>
                )}
              </button>
              <button
                onClick={isPlaying ? stop : handleReadMeal}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isPlaying
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] hover:bg-[var(--color-2)]/30"
                } disabled:opacity-50`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-5)]"></div>
                    <span>Loading...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <svg
                      className="w-5 h-5"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

