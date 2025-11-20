"use client";

import { useState } from "react";
import WorkoutPlanDialog from "./WorkoutPlanDialog";
import WorkoutPlanDisplay from "./WorkoutPlanDisplay";
import {
  getExercisesByMuscle,
  getWeekWorkoutPlan,
  Exercise,
} from "@/lib/exercisesDB";

export interface WorkoutPreferences {
  name: string;
  age: string;
  weight: string;
  fitnessGoal: string;
  workoutType: "muscle" | "week";
  muscle?: string; // Required if workoutType is "muscle"
}

export interface Workout {
  id: string; // Unique ID for React keys (may include index)
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  image: string;
  exerciseId?: string; // Original exercise ID from RapidAPI (for image fetching)
}

export interface DayWorkout {
  day: string;
  focus: string;
  muscles: string[];
  workouts: Workout[];
}

export default function WorkoutPlanPage() {
  const [userPreferences, setUserPreferences] =
    useState<WorkoutPreferences | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [weekWorkouts, setWeekWorkouts] = useState<DayWorkout[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userClosedDialog, setUserClosedDialog] = useState(false);

  const handleSubmitPreferences = async (preferences: WorkoutPreferences) => {
    setUserPreferences(preferences);
    setIsDialogOpen(false);
    setUserClosedDialog(false); // Reset when submitting
    setIsGenerating(true);
    setCurrentDayIndex(0); // Reset to first day

    try {
      if (preferences.workoutType === "week") {
        const generatedWeekWorkouts = await generateWeekWorkoutPlan();
        setWeekWorkouts(generatedWeekWorkouts);
        setWorkouts([]); // Clear single workouts
      } else {
        const generatedWorkouts = await generateWorkoutPlan(preferences);
        setWorkouts(generatedWorkouts);
        setWeekWorkouts([]); // Clear week workouts
      }
    } catch (error) {
      console.error("Failed to generate workout plan:", error);
      setWorkouts([]);
      setWeekWorkouts([]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    if (!userPreferences) {
      setUserClosedDialog(true);
    }
  };

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  // Show dialog if no workout plan exists
  if (
    !userPreferences ||
    (workouts.length === 0 && weekWorkouts.length === 0)
  ) {
    const shouldShowDialog =
      (!userPreferences && !userClosedDialog) || isDialogOpen;

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <WorkoutPlanDialog
          isOpen={shouldShowDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitPreferences}
          initialData={userPreferences || undefined}
        />
        {isGenerating && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="liquid-glass-card rounded-2xl p-8 text-center">
              {/* Tailwind CSS Loader */}
              <div className="flex justify-center items-center mb-6">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--color-2)]/30 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[var(--color-5)] rounded-full animate-spin"></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-r-[var(--color-7)] rounded-full animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "0.8s",
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-[var(--color-10)] font-medium">
                Generating your workout plan...
              </p>
            </div>
          </div>
        )}
        {!isGenerating && !shouldShowDialog && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-8 py-4 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all shadow-lg text-lg"
            >
              Generate Workout Plan
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <WorkoutPlanDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitPreferences}
        initialData={userPreferences || undefined}
      />
      {userPreferences?.workoutType === "week" && weekWorkouts.length > 0 ? (
        <WorkoutPlanDisplay
          weekWorkouts={weekWorkouts}
          currentDayIndex={currentDayIndex}
          onDayChange={setCurrentDayIndex}
          onEdit={handleEdit}
          isGenerating={isGenerating}
        />
      ) : (
        <WorkoutPlanDisplay
          workouts={workouts}
          onEdit={handleEdit}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
}

// Generate 7-day workout plan with specific muscle groups per day
async function generateWeekWorkoutPlan(): Promise<DayWorkout[]> {
  const weekPlan: DayWorkout[] = [
    {
      day: "Monday",
      focus: "Push",
      muscles: ["chest", "traps", "triceps"],
      workouts: [],
    },
    {
      day: "Tuesday",
      focus: "Pull",
      muscles: ["lats", "biceps"],
      workouts: [],
    },
    {
      day: "Wednesday",
      focus: "Legs & Abs",
      muscles: ["quadriceps", "hamstrings", "glutes"],
      workouts: [],
    },
    {
      day: "Thursday",
      focus: "Push",
      muscles: ["chest", "traps", "triceps"],
      workouts: [],
    },
    {
      day: "Friday",
      focus: "Pull",
      muscles: ["lats", "biceps"],
      workouts: [],
    },
    {
      day: "Saturday",
      focus: "Legs & Abs",
      muscles: ["quadriceps", "hamstrings", "glutes"],
      workouts: [],
    },
    {
      day: "Sunday",
      focus: "Rest",
      muscles: [],
      workouts: [],
    },
  ];

  console.log(
    "Generating week workout plan with days:",
    weekPlan.map((d) => ({ day: d.day, muscles: d.muscles }))
  );

  try {
    // Fetch exercises for each day's muscle groups
    for (let dayIndex = 0; dayIndex < weekPlan.length; dayIndex++) {
      const day = weekPlan[dayIndex];

      if (day.muscles.length === 0) {
        // Rest day - skip
        continue;
      }

      const allExercises: Exercise[] = [];

      // Get exercises for each muscle group in this day
      for (let i = 0; i < day.muscles.length; i++) {
        const muscle = day.muscles[i];
        try {
          // Add delay between requests to avoid rate limiting
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }

          console.log(`Fetching exercises for ${day.day} - ${muscle}`);
          const exercises = await getExercisesByMuscle(muscle);
          console.log(
            `Got ${exercises?.length || 0} exercises for ${muscle} on ${
              day.day
            }`
          );
          // Take 2-3 exercises from each muscle group
          if (exercises && exercises.length > 0) {
            const selectedExercises = exercises.slice(0, 3);
            allExercises.push(...selectedExercises);
            console.log(
              `Added ${selectedExercises.length} exercises from ${muscle} to ${day.day}`
            );
          } else {
            console.warn(`No exercises found for ${muscle} on ${day.day}`);
          }
        } catch (error) {
          console.error(
            `Error fetching ${muscle} exercises for ${day.day}:`,
            error
          );
          // Continue with other muscle groups
        }
      }

      console.log(
        `${day.day}: Generated ${
          allExercises.length
        } total exercises from muscles: ${day.muscles.join(", ")}`
      );

      // Map exercises to Workout format
      day.workouts = allExercises.map((exercise: Exercise, index: number) => {
        const exerciseId = exercise.id || `exercise-${dayIndex}-${index}`;
        const exerciseName = exercise.name || "Exercise";
        const uniqueId = `${exerciseId}-${dayIndex}-${index}`;

        const imageUrl = exercise.id
          ? `/api/exercises/image?exerciseId=${encodeURIComponent(
              exercise.id
            )}&resolution=180`
          : "";

        return {
          id: uniqueId,
          name: exerciseName,
          type: exercise.type || "strength",
          muscle: exercise.muscle || "full body",
          equipment: exercise.equipment || "body weight",
          difficulty: exercise.difficulty || "beginner",
          instructions: exercise.instructions || "No instructions available.",
          image: imageUrl,
          exerciseId: exercise.id,
        };
      });
    }

    console.log(
      "Week plan generation complete:",
      weekPlan.map((d) => ({
        day: d.day,
        focus: d.focus,
        workoutsCount: d.workouts.length,
      }))
    );

    return weekPlan;
  } catch (error) {
    console.error("Error generating week workout plan:", error);
    return weekPlan; // Return structure even if some days failed
  }
}

// Generate workout plan using ExercisesDB API
async function generateWorkoutPlan(
  preferences: WorkoutPreferences
): Promise<Workout[]> {
  try {
    let exercises;

    if (preferences.workoutType === "muscle" && preferences.muscle) {
      // Get exercises for specific muscle
      exercises = await getExercisesByMuscle(preferences.muscle);
    } else {
      // Get week workout plan (full body)
      exercises = await getWeekWorkoutPlan();
    }

    // Map API response to Workout format
    // RapidAPI ExercisesDB returns: id, name, type, muscle, equipment, difficulty, instructions
    // Now that we're using RapidAPI for both exercises and images, IDs will match!
    // Note: Some exercises may have duplicate IDs, so we'll create unique keys by combining ID with index
    const workouts: Workout[] = exercises.map(
      (exercise: Exercise, index: number) => {
        const exerciseId = exercise.id || `exercise-${index}`;
        const exerciseName = exercise.name || "Exercise";

        // Create a unique ID by combining exercise ID with index to avoid duplicate keys
        // This ensures React keys are unique even if RapidAPI returns duplicate exercise IDs
        const uniqueId = `${exerciseId}-${index}`;

        // Generate image URL using RapidAPI image endpoint with the exercise ID
        // RapidAPI ExercisesDB provides IDs that match the image endpoint
        const imageUrl = exercise.id
          ? `/api/exercises/image?exerciseId=${encodeURIComponent(
              exercise.id
            )}&resolution=180`
          : "";

        return {
          id: uniqueId, // Use unique ID for React keys
          name: exerciseName,
          type: exercise.type || "strength",
          muscle: exercise.muscle || "full body",
          equipment: exercise.equipment || "body weight",
          difficulty: exercise.difficulty || "beginner",
          instructions: exercise.instructions || "No instructions available.",
          image: imageUrl, // Will use RapidAPI image endpoint with matching ID
          // Store original exercise ID for image fetching
          exerciseId: exercise.id,
        };
      }
    );

    return workouts;
  } catch (error) {
    console.error("Error generating workout plan:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return [
      {
        id: "error",
        name: "Error loading workout plan",
        type: "strength",
        muscle: "full body",
        equipment: "body weight",
        difficulty: "beginner",
        instructions: `Error: ${errorMessage}. Please check the API configuration or try again.`,
        image: "/images/exercises/default.jpg",
      },
    ];
  }
}
