import { NextRequest, NextResponse } from "next/server";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || "";
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";

export async function POST(request: NextRequest) {
  try {
    if (!SPOONACULAR_API_KEY) {
      return NextResponse.json(
        { error: "Spoonacular API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    console.log("Request body:", JSON.stringify(body, null, 2));

    // Build query parameters for Spoonacular API
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      timeFrame: body.timeFrame || "day",
      targetCalories: body.targetCalories?.toString() || "2000",
      number: body.number?.toString() || "3",
    });

    // Only add diet and exclude if they have values
    if (body.diet && body.diet.trim() !== "") {
      params.append("diet", body.diet);
    }
    if (body.exclude && body.exclude.trim() !== "") {
      params.append("exclude", body.exclude);
    }

    // Add nutrients if provided
    if (body.nutrients) {
      Object.entries(body.nutrients).forEach(([key, value]) => {
        params.append(`nutrients[${key}]`, value.toString());
      });
    }

    const url = `${SPOONACULAR_BASE_URL}/mealplanner/generate?${params.toString()}`;
    console.log("Spoonacular API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spoonacular API error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url,
      });
      
      let errorMessage = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      return NextResponse.json(
        { error: errorMessage, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Successfully received meal plan data from Spoonacular");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in meal-plan API route:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate meal plan: ${errorMessage}` },
      { status: 500 }
    );
  }
}
