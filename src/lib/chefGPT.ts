// Using Next.js API routes to proxy requests and avoid CORS issues

export interface MealPlanRequest {
  goal: string;
  duration: number;
  activityLevel: string;
  age: number;
  height?: number;
  weight: number;
  gender: string;
  diet: string;
}

export interface MealPlanResponse {
  meals: Array<{
    name: string;
    type: string;
    calories: number;
    protein: number;
    carbs: number;
    description?: string;
    preparationTime?: string;
    servingSize?: string;
    ingredients?: string[];
  }>;
}

export interface RecipeImageRequest {
  recipe: string;
  ingredients: string[];
}

export interface RecipeImageResponse {
  imageUrl: string;
}

// Map fitness goals to API format
function mapFitnessGoal(goal: string): string {
  const goalMap: Record<string, string> = {
    "Weight Loss": "lose-weight",
    "Muscle Gain": "gain-muscle",
    "Maintain Weight": "maintain-weight",
    "General Health": "general-health",
    "Athletic Performance": "athletic-performance",
  };
  return goalMap[goal] || "general-health";
}

// Map dietary preferences to API format
function mapDiet(dietaryPreferences: string[]): string {
  if (dietaryPreferences.includes("Vegan")) return "vegan";
  if (dietaryPreferences.includes("Vegetarian")) return "vegetarian";
  if (dietaryPreferences.includes("Keto")) return "keto";
  if (dietaryPreferences.includes("Paleo")) return "paleo";
  if (dietaryPreferences.includes("Mediterranean")) return "mediterranean";
  return "non-vegetarian";
}

// Map gender to API format
function mapGender(gender: string): string {
  const genderMap: Record<string, string> = {
    Male: "male",
    Female: "female",
    Other: "other",
    "Prefer not to say": "other",
  };
  return genderMap[gender] || "other";
}

export async function generateMealPlan(preferences: {
  age: string;
  gender: string;
  weight: string;
  fitnessGoal: string;
  dietaryPreferences: string[];
}): Promise<MealPlanResponse> {
  const requestBody: MealPlanRequest = {
    goal: mapFitnessGoal(preferences.fitnessGoal),
    duration: 30, // Default to 30 days
    activityLevel: "moderately-active", // Default activity level
    age: parseInt(preferences.age) || 30,
    weight: parseFloat(preferences.weight) || 70,
    gender: mapGender(preferences.gender),
    diet: mapDiet(preferences.dietaryPreferences),
  };

  try {
    const response = await fetch("/api/meal-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error ||
        errorData.message ||
        `API error: ${response.status} ${response.statusText}`;
      console.error("Meal plan generation failed:", {
        status: response.status,
        error: errorData,
        requestBody,
      });
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
}

export async function generateRecipeImage(
  recipe: string,
  ingredients: string[]
): Promise<string> {
  const requestBody: RecipeImageRequest = {
    recipe,
    ingredients,
  };

  try {
    const response = await fetch("/api/recipe-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `API error: ${response.status} ${response.statusText}`
      );
    }

    const data: RecipeImageResponse = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Error generating recipe image:", error);
    // Return a fallback image if API fails
    return "/images/vegan-food.svg";
  }
}
