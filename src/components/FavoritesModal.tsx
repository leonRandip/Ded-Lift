"use client";

import Image from "next/image";
import { Meal } from "./MealPlanPage";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Meal[];
  onRemoveFavorite: (mealId: string) => void;
  onMealClick: (meal: Meal) => void;
}

export default function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onMealClick,
}: FavoritesModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--color-10)]/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto liquid-glass-card rounded-2xl p-6 md:p-8 shadow-2xl"
          style={{
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-10)]">
              Favorite Meals
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[var(--color-8)]/20 hover:bg-[var(--color-8)]/40 flex items-center justify-center transition-all"
            >
              <svg
                className="w-5 h-5 text-[var(--color-10)]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Favorites List */}
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-[var(--color-8)]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <p className="text-[var(--color-8)] text-lg">No favorite meals yet</p>
              <p className="text-[var(--color-8)] text-sm mt-2">
                Start favoriting meals to see them here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((meal) => (
                <div
                  key={meal.id}
                  className="liquid-glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300"
                  onClick={() => onMealClick(meal)}
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover"
                    />
                    {/* Remove Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(meal.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-600 flex items-center justify-center transition-all"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[var(--color-10)] truncate">
                      {meal.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[var(--color-8)]">
                      <span>{meal.calories}kcal</span>
                      <span>•</span>
                      <span>{meal.protein}g protein</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

