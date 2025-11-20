"use client";

import { useState } from "react";
import MealPlanDialog from "./MealPlanDialog";
import MealPlanDisplay from "./MealPlanDisplay";
import { generateMealPlan as generateMealPlanAPI, getRecipeInfo } from "@/lib/spoonacular";

export interface UserPreferences {
  name: string;
  age: string;
  gender: string;
  weight: string;
  fitnessGoal: string;
  dietaryPreferences: string[];
  allergies: string[];
}

export interface Meal {
  id: string;
  type: "breakfast" | "lunch" | "dinner";
  name: string;
  image: string;
  protein: number;
  carbs: number;
  calories: number;
  description?: string;
  preparationTime?: string;
  servingSize?: string;
}

export default function MealPlanPage() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [userClosedDialog, setUserClosedDialog] = useState(false);

  const handleSubmitPreferences = async (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setIsDialogOpen(false);
    setUserClosedDialog(false); // Reset when submitting
    setIsGenerating(true);
    
    // Generate meal plan using chefGPT
    const generatedMeals = await generateMealPlan(preferences);
    setMeals(generatedMeals);
    setIsGenerating(false);
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

  const handleRegenerate = async () => {
    if (!userPreferences) return;
    setIsGenerating(true);
    const generatedMeals = await generateMealPlan(userPreferences);
    setMeals(generatedMeals);
    setIsGenerating(false);
  };

  // Show dialog if no meal plan exists
  if (!userPreferences || meals.length === 0) {
    const shouldShowDialog = (!userPreferences && !userClosedDialog) || isDialogOpen;
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <MealPlanDialog
          isOpen={shouldShowDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitPreferences}
          initialData={userPreferences || undefined}
        />
        {isGenerating && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="liquid-glass-card rounded-2xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-5)] mx-auto mb-4"></div>
              <p className="text-[var(--color-10)] font-medium">Generating your meal plan...</p>
            </div>
          </div>
        )}
        {!isGenerating && !shouldShowDialog && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-8 py-4 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all shadow-lg text-lg"
            >
              Generate Meal Plan
            </button>
          </div>
        )}
      </div>
    );
  }

  const handleToggleFavorite = (meal: Meal) => {
    setFavorites((prev) => {
      const isFavorited = prev.some((f) => f.id === meal.id);
      if (isFavorited) {
        return prev.filter((f) => f.id !== meal.id);
      } else {
        return [...prev, meal];
      }
    });
  };

  const handleRemoveFavorite = (mealId: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== mealId));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <MealPlanDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitPreferences}
        initialData={userPreferences || undefined}
      />
      <MealPlanDisplay
        meals={meals}
        onEdit={handleEdit}
        onRegenerate={handleRegenerate}
        isGenerating={isGenerating}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
}

// Generate meal plan using Spoonacular API
async function generateMealPlan(preferences: UserPreferences): Promise<Meal[]> {
  try {
    // Call the Spoonacular API
    const response = await generateMealPlanAPI({
      age: preferences.age,
      gender: preferences.gender,
      weight: preferences.weight,
      fitnessGoal: preferences.fitnessGoal,
      dietaryPreferences: preferences.dietaryPreferences,
      allergies: preferences.allergies,
    });

    // Log the response to debug
    console.log("Spoonacular response:", response);
    console.log("Number of meals received:", response.meals?.length || 0);
    
    // Ensure we have at least 4 meals - if API returns fewer, we'll handle it
    const mealsFromAPI = response.meals || [];
    console.log("Meals from API:", mealsFromAPI.length);

    // Map API response to Meal format
    const meals: Meal[] = await Promise.all(
      mealsFromAPI.map(async (spoonacularMeal: any, index: number) => {
        // Fetch detailed recipe information for nutrition and image
        let recipeInfo = null;
        try {
          recipeInfo = await getRecipeInfo(spoonacularMeal.id);
        } catch (error) {
          console.error(`Error fetching recipe info for ${spoonacularMeal.id}:`, error);
        }

        // Extract nutrition data
        const nutrition = recipeInfo?.nutrition?.nutrients || [];
        const proteinNutrient = nutrition.find((n: any) => n.name === "Protein");
        const carbsNutrient = nutrition.find((n: any) => n.name === "Carbohydrates");
        const caloriesNutrient = nutrition.find((n: any) => n.name === "Calories");

        // Map meal type based on index (Spoonacular doesn't provide meal type)
        const mealTypes: Array<"breakfast" | "lunch" | "dinner"> = [
          "breakfast",
          "lunch",
          "dinner",
        ];
        const mealType = mealTypes[index] || "breakfast";

        // Get image URL - Spoonacular provides image URLs in recipe info
        const imageUrl = recipeInfo?.image || "/images/vegan-food.svg";

        return {
          id: `meal-${spoonacularMeal.id}`,
          type: mealType,
          name: spoonacularMeal.title || recipeInfo?.title || "Meal",
          image: imageUrl,
          protein: Math.round(proteinNutrient?.amount || 0),
          carbs: Math.round(carbsNutrient?.amount || 0),
          calories: Math.round(caloriesNutrient?.amount || 0),
          description: recipeInfo?.summary?.replace(/<[^>]*>/g, "").substring(0, 200) || "", // Remove HTML tags and limit length
          preparationTime: `${spoonacularMeal.readyInMinutes || recipeInfo?.readyInMinutes || 0}min`,
          servingSize: `${spoonacularMeal.servings || recipeInfo?.servings || 1} ${(spoonacularMeal.servings || recipeInfo?.servings || 1) === 1 ? "serving" : "servings"}`,
        };
      })
    );

    // Ensure we have exactly 3 meals (breakfast, lunch, dinner)
    const requiredTypes: Array<"breakfast" | "lunch" | "dinner"> = [
      "breakfast",
      "lunch",
      "dinner",
    ];

    const finalMeals: Meal[] = [];
    
    // First, assign all received meals to types
    for (let i = 0; i < meals.length && i < requiredTypes.length; i++) {
      meals[i].type = requiredTypes[i];
      finalMeals.push(meals[i]);
    }

    // If we have more meals than types, assign them to remaining types
    if (meals.length > requiredTypes.length) {
      for (let i = requiredTypes.length; i < meals.length; i++) {
        const typeIndex = i % requiredTypes.length;
        meals[i].type = requiredTypes[typeIndex];
        // Replace the meal at that type index if it exists
        const existingIndex = finalMeals.findIndex(m => m.type === requiredTypes[typeIndex]);
        if (existingIndex >= 0) {
          finalMeals[existingIndex] = meals[i];
        } else {
          finalMeals.push(meals[i]);
        }
      }
    }

    // Fill in any missing meal types with placeholders
    for (let i = 0; i < requiredTypes.length; i++) {
      const existingMeal = finalMeals.find(m => m.type === requiredTypes[i]);
      if (!existingMeal) {
        finalMeals.push({
          id: `meal-${requiredTypes[i]}-${Date.now()}`,
          type: requiredTypes[i],
          name: `${requiredTypes[i].charAt(0).toUpperCase() + requiredTypes[i].slice(1)} Meal`,
          image: "/images/vegan-food.svg",
          protein: 0,
          carbs: 0,
          calories: 0,
        });
      }
    }

    // Sort final meals to ensure correct order
    const sortedMeals = requiredTypes.map(type => 
      finalMeals.find(m => m.type === type)!
    ).filter(Boolean);

    console.log("Final meals count:", sortedMeals.length);
    console.log("Final meals:", sortedMeals.map(m => ({ type: m.type, name: m.name })));

    return sortedMeals;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    // Return fallback meals on error with error message
    return [
      {
        id: "1",
        type: "breakfast",
        name: "Error loading meal plan",
        image: "/images/vegan-food.svg",
        protein: 0,
        carbs: 0,
        calories: 0,
        description: `Error: ${errorMessage}. Please check the API configuration or try again.`,
      },
      {
        id: "2",
        type: "lunch",
        name: "Error loading meal plan",
        image: "/images/vegan-food.svg",
        protein: 0,
        carbs: 0,
        calories: 0,
      },
      {
        id: "3",
        type: "dinner",
        name: "Error loading meal plan",
        image: "/images/vegan-food.svg",
        protein: 0,
        carbs: 0,
        calories: 0,
      },
    ];
  }
}

