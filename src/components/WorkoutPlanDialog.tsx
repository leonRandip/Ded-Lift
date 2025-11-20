"use client";

import { useState } from "react";
import { WorkoutPreferences } from "./WorkoutPlanPage";

interface WorkoutPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (preferences: WorkoutPreferences) => void;
  initialData?: WorkoutPreferences;
}

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Maintain Weight",
  "General Health",
  "Athletic Performance",
];

// RapidAPI ExercisesDB muscle groups
const MUSCLE_GROUPS = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

export default function WorkoutPlanDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: WorkoutPlanDialogProps) {
  const [formData, setFormData] = useState<WorkoutPreferences>({
    name: initialData?.name || "",
    age: initialData?.age || "",
    weight: initialData?.weight || "",
    fitnessGoal: initialData?.fitnessGoal || "",
    workoutType: initialData?.workoutType || "week",
    muscle: initialData?.muscle || "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.age &&
      formData.weight &&
      formData.fitnessGoal &&
      formData.workoutType &&
      (formData.workoutType === "week" || formData.muscle)
    ) {
      onSubmit(formData);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--color-10)]/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="liquid-glass-card rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          style={{
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-10)]">
              Create Your Workout Plan
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)]"
                required
              />
            </div>

            {/* Age and Weight Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)]"
                  required
                  min="1"
                  max="120"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)]"
                  required
                  min="1"
                  step="0.1"
                />
              </div>
            </div>

            {/* Fitness Goal */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Fitness Goal
              </label>
              <select
                value={formData.fitnessGoal}
                onChange={(e) =>
                  setFormData({ ...formData, fitnessGoal: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)] bg-transparent"
                required
              >
                <option value="">Select Fitness Goal</option>
                {FITNESS_GOALS.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            {/* Workout Type - Seamless Toggle */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Workout Type
              </label>
              <div className="relative inline-flex rounded-full bg-[var(--color-2)]/30 p-1 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      workoutType: "week",
                      muscle: "",
                    });
                  }}
                  className={`relative flex-1 px-4 py-3 rounded-full font-medium transition-all duration-300 z-10 ${
                    formData.workoutType === "week"
                      ? "bg-white text-[var(--color-10)] shadow-lg"
                      : "text-[var(--color-8)]"
                  }`}
                >
                  Week Plan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, workoutType: "muscle" });
                  }}
                  className={`relative flex-1 px-4 py-3 rounded-full font-medium transition-all duration-300 z-10 ${
                    formData.workoutType === "muscle"
                      ? "bg-white text-[var(--color-10)] shadow-lg"
                      : "text-[var(--color-8)]"
                  }`}
                >
                  Muscle Group
                </button>
              </div>
            </div>

            {/* Muscle Group Selection (only if workoutType is "muscle") */}
            {formData.workoutType === "muscle" && (
              <div>
                <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                  Select Muscle Group
                </label>
                <select
                  value={formData.muscle || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, muscle: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)] bg-transparent"
                  required
                >
                  <option value="">Select Muscle Group</option>
                  {MUSCLE_GROUPS.map((muscle) => (
                    <option key={muscle} value={muscle}>
                      {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-5)] to-[var(--color-7)] text-white font-medium hover:from-[var(--color-6)] hover:to-[var(--color-8)] transition-all shadow-lg"
              >
                Generate Workout Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
