// Spoonacular API integration

export interface MealPlanRequest {
  targetCalories?: number;
  timeFrame?: string;
  diet?: string;
  exclude?: string;
  number?: number;
  nutrients?: {
    minCarbs?: number;
    maxCarbs?: number;
    minProtein?: number;
    maxProtein?: number;
    minFat?: number;
    maxFat?: number;
  };
}

export interface SpoonacularMealPlanResponse {
  meals: Array<{
    id: number;
    imageType: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
  }>;
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
}

export interface SpoonacularRecipeInfo {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  nutrition: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}

// Map fitness goals to target calories
function mapFitnessGoalToCalories(goal: string, weight: number, age: number, gender: string): number {
  // Base BMR calculation (simplified)
  let bmr = 0;
  if (gender.toLowerCase() === "male") {
    bmr = 10 * weight + 6.25 * (175) - 5 * age + 5; // Using average height
  } else {
    bmr = 10 * weight + 6.25 * (165) - 5 * age - 161;
  }

  // Activity multiplier (moderately active)
  const tdee = bmr * 1.55;

  // Adjust based on goal
  switch (goal.toLowerCase()) {
    case "weight loss":
    case "lose-weight":
      return Math.round(tdee * 0.85); // 15% deficit
    case "muscle gain":
    case "gain-muscle":
      return Math.round(tdee * 1.15); // 15% surplus
    case "maintain weight":
    case "maintain-weight":
      return Math.round(tdee);
    default:
      return Math.round(tdee);
  }
}

// Map dietary preferences to Spoonacular diet parameter
function mapDiet(dietaryPreferences: string[]): string {
  if (dietaryPreferences.includes("Vegan")) return "vegan";
  if (dietaryPreferences.includes("Vegetarian")) return "vegetarian";
  if (dietaryPreferences.includes("Keto")) return "ketogenic";
  if (dietaryPreferences.includes("Paleo")) return "paleo";
  if (dietaryPreferences.includes("Mediterranean")) return "mediterranean";
  return "";
}

// Map allergies to exclude parameter
function mapAllergies(allergies: string[]): string {
  const allergyMap: Record<string, string> = {
    "Peanut Allergy": "peanuts",
    "Lactose Intolerance": "dairy",
    "Gluten Allergy": "gluten",
    "Shellfish Allergy": "shellfish",
    "Egg Allergy": "eggs",
    "Soy Allergy": "soy",
    "Tree Nut Allergy": "tree-nuts",
    "Fish Allergy": "fish",
    "Sesame Allergy": "sesame",
    "Sulfite Sensitivity": "sulfites",
  };

  return allergies
    .map((allergy) => allergyMap[allergy] || allergy.toLowerCase().replace(/\s+/g, "-"))
    .join(",");
}

export async function generateMealPlan(
  preferences: {
    age: string;
    gender: string;
    weight: string;
    fitnessGoal: string;
    dietaryPreferences: string[];
    allergies: string[];
  }
): Promise<SpoonacularMealPlanResponse> {
  const age = parseInt(preferences.age) || 30;
  const weight = parseFloat(preferences.weight) || 70;
  const targetCalories = mapFitnessGoalToCalories(
    preferences.fitnessGoal,
    weight,
    age,
    preferences.gender
  );

  const requestBody: MealPlanRequest = {
    targetCalories,
    timeFrame: "day",
    diet: mapDiet(preferences.dietaryPreferences),
    exclude: mapAllergies(preferences.allergies),
    number: 3, // Get 3 meals (breakfast, lunch, dinner)
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
      const errorMessage = errorData.error || errorData.message || `API error: ${response.status} ${response.statusText}`;
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

export async function getRecipeInfo(recipeId: number): Promise<SpoonacularRecipeInfo> {
  try {
    const response = await fetch(`/api/recipe-info?id=${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe info:", error);
    throw error;
  }
}

