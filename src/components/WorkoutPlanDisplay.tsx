"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Workout } from "./WorkoutPlanPage";
import WorkoutCard from "./WorkoutCard";
import TextToSpeechButton from "./TextToSpeechButton";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface WorkoutPlanDisplayProps {
  workouts?: Workout[];
  weekWorkouts?: import("./WorkoutPlanPage").DayWorkout[];
  currentDayIndex?: number;
  onDayChange?: (index: number) => void;
  onEdit: () => void;
  isGenerating: boolean;
}

export default function WorkoutPlanDisplay({
  workouts = [],
  weekWorkouts,
  currentDayIndex = 0,
  onDayChange,
  onEdit,
}: WorkoutPlanDisplayProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const workoutPlanRef = useRef<HTMLDivElement>(null);

  // Determine if we're showing week plan or single workouts
  const isWeekPlan = weekWorkouts && weekWorkouts.length > 0;
  const currentWorkouts = useMemo(() => {
    return isWeekPlan
      ? weekWorkouts[currentDayIndex]?.workouts || []
      : workouts;
  }, [isWeekPlan, weekWorkouts, currentDayIndex, workouts]);

  const currentDay = useMemo(() => {
    return isWeekPlan ? weekWorkouts[currentDayIndex] : null;
  }, [isWeekPlan, weekWorkouts, currentDayIndex]);

  // Debug logging and ensure workouts update when day changes
  useEffect(() => {
    if (isWeekPlan && weekWorkouts) {
      console.log("WorkoutPlanDisplay - Day changed:", {
        currentDayIndex,
        currentDay: currentDay?.day,
        currentDayFocus: currentDay?.focus,
        workoutsCount: currentWorkouts.length,
        workoutNames: currentWorkouts.slice(0, 3).map((w) => w.name),
        allDays: weekWorkouts.map((d) => ({
          day: d.day,
          count: d.workouts.length,
          muscles: d.muscles,
        })),
      });
    }
  }, [currentDayIndex, isWeekPlan, weekWorkouts, currentDay, currentWorkouts]);

  const handlePreviousDay = () => {
    if (onDayChange && currentDayIndex > 0) {
      onDayChange(currentDayIndex - 1);
    }
  };

  const handleNextDay = () => {
    if (
      onDayChange &&
      weekWorkouts &&
      currentDayIndex < weekWorkouts.length - 1
    ) {
      onDayChange(currentDayIndex + 1);
    }
  };

  const handleDownloadPDF = async () => {
    if (!workoutPlanRef.current || currentWorkouts.length === 0) return;

    try {
      setIsGeneratingPDF(true);

      // Create a container for PDF generation
      const pdfContainer = document.createElement("div");
      pdfContainer.style.position = "absolute";
      pdfContainer.style.left = "-9999px";
      pdfContainer.style.width = "1200px";
      pdfContainer.style.backgroundColor = "white";
      pdfContainer.style.padding = "40px";
      document.body.appendChild(pdfContainer);

      // Create PDF content structure
      pdfContainer.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="font-size: 32px; margin-bottom: 30px; color: #2d3748;">Your Workout Plan</h1>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            ${(currentWorkouts || [])
              .map(
                (workout) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; background: #f7fafc;">
                <div style="margin-bottom: 10px;">
                  <span style="display: inline-block; padding: 6px 12px; border-radius: 8px; background: #fed7d7; color: #742a2a; font-size: 12px; font-weight: 600; margin-right: 8px;">
                    ${
                      workout.muscle.charAt(0).toUpperCase() +
                      workout.muscle.slice(1)
                    }
                  </span>
                  <span style="display: inline-block; padding: 6px 12px; border-radius: 8px; background: #bee3f8; color: #2c5282; font-size: 12px; font-weight: 600;">
                    ${
                      workout.difficulty.charAt(0).toUpperCase() +
                      workout.difficulty.slice(1)
                    }
                  </span>
                </div>
                <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%); border-radius: 12px; margin-bottom: 15px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                  ${
                    workout.image && workout.image.startsWith("http")
                      ? `<img src="${workout.image}" alt="${workout.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML='<svg style=\\"width: 80px; height: 80px; color: #718096;\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\"><path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M13 10V3L4 14h7v7l9-11h-7z\\"></path></svg>'" />`
                      : `<svg style="width: 80px; height: 80px; color: #718096;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`
                  }
                </div>
                <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 10px; color: #2d3748;">${
                  workout.name
                }</h3>
                <div style="margin-bottom: 10px; font-size: 14px; color: #4a5568;">
                  <p><strong>Equipment:</strong> ${workout.equipment}</p>
                  <p><strong>Type:</strong> ${workout.type}</p>
                </div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                  <p style="font-size: 14px; color: #718096; line-height: 1.6;"><strong>Instructions:</strong></p>
                  <p style="font-size: 14px; color: #4a5568; line-height: 1.6; margin-top: 8px;">${
                    workout.instructions
                  }</p>
                </div>
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
            new Promise((resolve) => {
              if (img.complete) {
                resolve(img);
              } else {
                img.onload = () => resolve(img);
                img.onerror = () => {
                  // Use placeholder if image fails to load
                  (img as HTMLImageElement).src =
                    "/images/exercises/default.jpg";
                  resolve(img);
                };
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
      pdf.save("workout-plan.pdf");
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
          Your Workout Plan
        </h1>

        {/* Day Navigation for Week Plan */}
        {isWeekPlan && currentDay && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={handlePreviousDay}
              disabled={currentDayIndex === 0}
              className="w-10 h-10 rounded-full liquid-glass-card border border-[var(--color-2)]/50 flex items-center justify-center hover:bg-[var(--color-2)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div className="px-6 py-3 rounded-full liquid-glass-card border border-[var(--color-2)]/50 flex items-center gap-3">
              <span className="text-lg font-bold text-[var(--color-10)]">
                {currentDay.day}
              </span>
              <span className="text-sm text-[var(--color-8)]">
                {currentDay.focus}
              </span>
            </div>
            <button
              onClick={handleNextDay}
              disabled={currentDayIndex === (weekWorkouts?.length || 0) - 1}
              className="w-10 h-10 rounded-full liquid-glass-card border border-[var(--color-2)]/50 flex items-center justify-center hover:bg-[var(--color-2)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-3 items-center">
          <TextToSpeechButton variant="button" />
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF || currentWorkouts.length === 0}
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
        </div>
      </div>

      {/* Workout Plan Content - For PDF generation */}
      <div ref={workoutPlanRef}>
        {currentDay && currentDay.focus === "Rest" ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="liquid-glass-card rounded-2xl p-8 text-center">
              <p className="text-2xl font-bold text-[var(--color-10)] mb-2">
                Rest Day
              </p>
              <p className="text-[var(--color-8)]">
                Take a break and recover. Your body needs rest to grow stronger!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop View - Grid */}
            <div
              key={`desktop-${currentDayIndex}`}
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>

            {/* Mobile View - Cards */}
            <div
              key={`mobile-${currentDayIndex}`}
              className="md:hidden space-y-4"
            >
              {currentWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  isMobile={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
