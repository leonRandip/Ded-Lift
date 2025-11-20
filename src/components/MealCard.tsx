"use client";

import Image from "next/image";
import { Meal } from "./MealPlanPage";

interface MealCardProps {
  meal: Meal;
  onMobileClick: () => void;
  isMobile: boolean;
}

export default function MealCard({ meal, onMobileClick, isMobile }: MealCardProps) {
  const mealTypeLabels: Record<string, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
  };

  if (isMobile) {
    // Mobile: Card with tag above image, title below, clickable
    return (
      <div
        onClick={onMobileClick}
        className="liquid-glass-card rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all duration-300"
      >
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-lg bg-[var(--color-5)]/20 text-[var(--color-10)] text-xs font-medium">
            {mealTypeLabels[meal.type]}
          </span>
        </div>
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 liquid-glass-card">
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-lg font-bold text-[var(--color-10)]">
          {meal.name}
        </h3>
      </div>
    );
  }

  // Desktop: Full card with info, clickable to show details
  return (
    <div 
      onClick={onMobileClick}
      className="liquid-glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-lg bg-[var(--color-5)]/20 text-[var(--color-10)] text-xs font-medium">
          {mealTypeLabels[meal.type]}
        </span>
      </div>
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 liquid-glass-card p-2">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold text-[var(--color-10)] mb-4">
        {meal.name}
      </h3>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-[var(--color-8)]">
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>{meal.protein}g</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--color-8)]">
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
          <span>{meal.carbs}g</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--color-8)]">
          <svg
            className="w-4 h-4"
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
          <span>{meal.calories}kcal</span>
        </div>
      </div>
    </div>
  );
}

