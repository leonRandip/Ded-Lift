"use client";

import { useState, useRef } from "react";
import { Meal } from "./MealPlanPage";
import MealCard from "./MealCard";
import MealDetailModal from "./MealDetailModal";
import FavoritesModal from "./FavoritesModal";
import TextToSpeechButton from "./TextToSpeechButton";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface MealPlanDisplayProps {
  meals: Meal[];
  onEdit: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
  favorites: Meal[];
  onToggleFavorite: (meal: Meal) => void;
  onRemoveFavorite: (mealId: string) => void;
}

export default function MealPlanDisplay({
  meals,
  onEdit,
  onRegenerate,
  isGenerating,
  favorites,
  onToggleFavorite,
  onRemoveFavorite,
}: MealPlanDisplayProps) {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const mealPlanRef = useRef<HTMLDivElement>(null);

  const mealTypes = ["breakfast", "lunch", "dinner"] as const;
  const mealsByType = mealTypes.map((type) =>
    meals.find((meal) => meal.type === type)
  );

  const handleDownloadPDF = async () => {
    if (!mealPlanRef.current || meals.length === 0) return;

    try {
      setIsGeneratingPDF(true);

      // Create a container for PDF generation (hide buttons, show all content)
      const pdfContainer = document.createElement("div");
      pdfContainer.style.position = "absolute";
      pdfContainer.style.left = "-9999px";
      pdfContainer.style.width = "1200px"; // Fixed width for PDF
      pdfContainer.style.backgroundColor = "white";
      pdfContainer.style.padding = "40px";
      document.body.appendChild(pdfContainer);

      // Clone the meal plan content
      const content = mealPlanRef.current.cloneNode(true) as HTMLElement;

      // Remove buttons and interactive elements from clone
      const buttons = content.querySelectorAll("button");
      buttons.forEach((btn) => btn.remove());

      // Create PDF content structure
      pdfContainer.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="font-size: 32px; margin-bottom: 30px; color: #2d3748;">Your Meal Plan</h1>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
            ${mealsByType
              .filter((meal) => meal)
              .map(
                (meal) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; background: #f7fafc;">
                <div style="margin-bottom: 10px;">
                  <span style="display: inline-block; padding: 6px 12px; border-radius: 8px; background: #c6f6d5; color: #22543d; font-size: 12px; font-weight: 600;">
                    ${meal!.type.charAt(0).toUpperCase() + meal!.type.slice(1)}
                  </span>
                </div>
                <div style="width: 100%; height: 200px; background: #e2e8f0; border-radius: 12px; margin-bottom: 15px; overflow: hidden;">
                  <img src="${meal!.image}" alt="${
                  meal!.name
                }" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
                <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #2d3748;">${
                  meal!.name
                }</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: #4a5568;">
                  <span>${meal!.protein}g protein</span>
                  <span>${meal!.carbs}g carbs</span>
                  <span>${meal!.calories} kcal</span>
                </div>
                ${
                  meal!.description
                    ? `<p style="font-size: 14px; color: #718096; line-height: 1.6; margin-top: 10px;">${
                        meal!.description
                      }</p>`
                    : ""
                }
                ${
                  meal!.preparationTime
                    ? `<p style="font-size: 12px; color: #a0aec0; margin-top: 8px;">⏱ ${
                        meal!.preparationTime
                      }</p>`
                    : ""
                }
                ${
                  meal!.servingSize
                    ? `<p style="font-size: 12px; color: #a0aec0; margin-top: 4px;">🍽 ${
                        meal!.servingSize
                      }</p>`
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;

      // Wait for images to load
      const images = pdfContainer.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve, reject) => {
              if (img.complete) {
                resolve(img);
              } else {
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error("Failed to load image"));
              }
            })
        )
      );

      // Generate canvas
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;
      const xOffset = (pdfWidth - imgScaledWidth) / 2;
      const yOffset = (pdfHeight - imgScaledHeight) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        xOffset,
        yOffset,
        imgScaledWidth,
        imgScaledHeight
      );

      // Clean up
      document.body.removeChild(pdfContainer);

      // Download PDF
      pdf.save("meal-plan.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      {/* Header with Actions */}
      <div className="flex flex-col mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-10)]">
          Your Meal Plan
        </h1>
        <div className="flex flex-wrap gap-3 items-center">
          <TextToSpeechButton variant="button" />
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF || meals.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-5)]"></div>
                <span>Generating...</span>
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
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Save Offline</span>
              </>
            )}
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit
          </button>
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {isGenerating ? "Regenerating..." : "Regenerate"}
          </button>
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all relative"
          >
            <svg
              className="w-5 h-5"
              fill={favorites.length > 0 ? "currentColor" : "none"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            Favorites
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Meal Plan Content - For PDF generation */}
      <div ref={mealPlanRef}>
        {/* Desktop View - Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {mealsByType.map((meal) => {
            if (!meal) return null;
            return (
              <MealCard
                key={meal.id}
                meal={meal}
                onMobileClick={() => setSelectedMeal(meal)}
                isMobile={false}
              />
            );
          })}
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {mealsByType.map((meal) => {
            if (!meal) return null;
            return (
              <MealCard
                key={meal.id}
                meal={meal}
                onMobileClick={() => setSelectedMeal(meal)}
                isMobile={true}
              />
            );
          })}
        </div>
      </div>

      {/* Meal Detail Modal - Works for both Mobile and Desktop */}
      {selectedMeal && (
        <MealDetailModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          isFavorited={favorites.some((f) => f.id === selectedMeal.id)}
          onToggleFavorite={() => onToggleFavorite(selectedMeal)}
        />
      )}

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={onRemoveFavorite}
        onMealClick={(meal) => {
          setSelectedMeal(meal);
          setIsFavoritesOpen(false);
        }}
      />
    </>
  );
}
