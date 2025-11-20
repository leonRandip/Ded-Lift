// ExercisesDB API integration

export interface WorkoutPlanRequest {
  muscle?: string;
  type?: "week" | "muscle";
}

export interface Exercise {
  id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  image?: string;
}

export interface WorkoutPlanResponse {
  exercises: Exercise[];
}

const EXERCISESDB_BASE_URL = "https://exercisedb.p.rapidapi.com";

// Get exercises by muscle group
export async function getExercisesByMuscle(
  muscle: string
): Promise<Exercise[]> {
  try {
    const response = await fetch(
      `/api/exercises/muscle/${encodeURIComponent(muscle)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const status = response.status;

      if (status === 403) {
        throw new Error(
          "API key is invalid or access is forbidden. Please check your ExercisesDB API key."
        );
      } else if (status === 429) {
        throw new Error(
          "Too many requests. Please wait a moment and try again."
        );
      } else if (status === 401) {
        throw new Error(
          "Unauthorized. Please check your API key configuration."
        );
      }

      throw new Error(
        errorData.error ||
          errorData.message ||
          `Failed to fetch exercises: ${status} ${response.statusText}`
      );
    }

    const data = await response.json();
    // ExercisesDB returns an array of exercises
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching exercises by muscle:", error);
    throw error;
  }
}

// Get exercises for a week plan (full body workout)
export async function getWeekWorkoutPlan(): Promise<Exercise[]> {
  try {
    // For a week plan, we'll get exercises from fewer muscle groups to avoid rate limiting
    // Focus on major muscle groups (using RapidAPI ExercisesDB format)
    const muscleGroups = [
      "chest",
      "lats",
      "shoulders",
      "quadriceps",
      "abdominals",
    ];

    const allExercises: Exercise[] = [];

    // Get 2-3 exercises from each muscle group with delay to avoid rate limiting
    for (let i = 0; i < muscleGroups.length; i++) {
      const muscle = muscleGroups[i];
      try {
        // Add delay between requests to avoid rate limiting (429 errors)
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
        }

        const exercises = await getExercisesByMuscle(muscle);
        // Take first 2-3 exercises from each group
        if (exercises && exercises.length > 0) {
          allExercises.push(...exercises.slice(0, 3));
        }
      } catch (error) {
        console.error(`Error fetching ${muscle} exercises:`, error);
        // If it's a rate limit or auth error, stop trying other groups
        if (
          error instanceof Error &&
          (error.message.includes("Too many requests") ||
            error.message.includes("forbidden") ||
            error.message.includes("Unauthorized"))
        ) {
          throw error;
        }
        // Continue with other muscle groups for other errors
      }
    }

    // If we got no exercises, throw an error
    if (allExercises.length === 0) {
      throw new Error(
        "Failed to fetch any exercises. Please check your API key and try again."
      );
    }

    return allExercises;
  } catch (error) {
    console.error("Error generating week workout plan:", error);
    throw error;
  }
}

// Get exercise image URL
// ExercisesDB API doesn't provide images directly, so we'll use a placeholder
// In production, you might want to use a service like ExerciseDB images or store them locally
export function getExerciseImageUrl(
  exerciseName: string,
  exerciseId?: string
): string {
  // Try to use exercise ID if available, otherwise use name
  const identifier =
    exerciseId || exerciseName.toLowerCase().replace(/\s+/g, "-");
  return `/images/exercises/${identifier}.jpg`;
}
